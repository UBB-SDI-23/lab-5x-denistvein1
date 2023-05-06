import { Card, CardActions, CardContent, IconButton, Tooltip, Pagination } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import { Planet } from "../../models/Planet";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PlanetLifeForm } from "../../models/PlanetFileForm";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Satellite } from "../../models/Satellite";

interface PageState{
    isLoading: boolean,
    totalSatellites: number,
    totalLifeForms: number,
    data: Planet,
    satellitesPage: number,
    satellitesPageSize: number,
    lifeFormsPage: number,
    lifeFormsPageSize: number
};

export const PlanetDetails = () => {
    const { planetId } = useParams();

    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        totalSatellites: 0,
        totalLifeForms: 0,
        data: {
            name: "",
            radius: 0,
            temperature: 0,
            gravity: 0,
            escapeVelocity: 0,
            orbitalPeriod: 0,
            satellites: [],
            planetLifeForms: []
        },
        satellitesPage: 0,
        satellitesPageSize: 25,
        lifeFormsPage: 0,
        lifeFormsPageSize: 25
    });

    useEffect(() => {
        const fetchSize = async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const responseSatellitesRowCount = await axios.get(`${BACKEND_API_URL}/planets/${planetId}/size/satellites`);
                const responseLifeFormsRowCount = await axios.get(`${BACKEND_API_URL}/planets/${planetId}/size/lifeForms`);
                const satellitesRowCount = await responseSatellitesRowCount.data;
                const lifeFormsRowCount = await responseLifeFormsRowCount.data;
                setPageState(old => ({...old, isLoading: false, totalSatellites: satellitesRowCount, totalLifeForms: lifeFormsRowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchSize();
    }, []);

    useEffect(() => {
        const fetchPlanet =async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const response = await axios.get(`${BACKEND_API_URL}/planets/${planetId}?satellitesPage=${pageState.satellitesPage}&satellitesPageSize=
                ${pageState.satellitesPageSize}&lifeFormsPage=${pageState.lifeFormsPage}&lifeFormsPageSize=${pageState.lifeFormsPageSize}`);
                const planet = await response.data
                setPageState(old => ({...old, isLoading: false, data: planet}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchPlanet();
    }, [pageState.satellitesPage, pageState.satellitesPageSize, pageState.lifeFormsPage, pageState.lifeFormsPageSize]);

    const satelliteColumns: GridColDef[] = [
        {field: "index", headerName: "#", width: 200},
        {field: "name", headerName: "Name", width: 200}
    ];

    const lifeFormColumns: GridColDef[] = [
        {field: "index", headerName: "#", width: 100},
        {field: "name", headerName: "Name", width: 150},
        {field: "survivability", headerName: "Survivability", width: 150},
        {field: "adaptability", headerName: "Adaptability", width: 150},
    ];

    const satelliteRows = pageState.data?.satellites === undefined ? [] : pageState.data.satellites.map((satellite: Satellite, index: number) => ({
        index: pageState.satellitesPage * pageState.satellitesPageSize + index + 1,
        ...satellite
    }));

    const lifeFormRows = pageState.data?.planetLifeForms === undefined ? [] : pageState.data.planetLifeForms.map((planetLifeForm: PlanetLifeForm, index: number) => ({
        index: pageState.lifeFormsPage * pageState.lifeFormsPageSize + index + 1,
        survivability: planetLifeForm.survivability,
        adaptability: planetLifeForm.adaptability,
        ...planetLifeForm.lifeForm
    }));

    const handleSatellitesPageChange = (event: any, value: number) => {
        setPageState(old => ({ ...old, satellitesPage: value - 1 }));
    };

    const handleLifeFormsPageChange = (event: any, value: number) => {
        setPageState(old => ({ ...old, lifeFormsPage: value - 1 }));
    };

    return (
        <Container sx={{ marginTop: 6 }}>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <h1>Planet Details</h1>
                    <p>Name: {pageState.data?.name}</p>
                    <p>Radius: {pageState.data?.radius}</p>
                    <p>Temperature: {pageState.data?.temperature}</p>
                    <p>Gravity: {pageState.data?.gravity}</p>
                    <p>Escape Velocity: {pageState.data?.escapeVelocity}</p>
                    <p>Orbital Period: {pageState.data?.orbitalPeriod}</p>
					<p>Satellites: </p>
                    {!pageState.isLoading && satelliteRows.length === 0 && <p>No satellites found</p>}
                    {satelliteRows.length > 0 &&
                        <div>
                            <DataGrid 
                                sx={{ width: 400, height: 400}}
                                columns={satelliteColumns}
                                rowCount={pageState.totalSatellites}
                                loading={pageState.isLoading}
                                pagination
                                hideFooter={true}
                                page={pageState.satellitesPage}
                                pageSize={pageState.satellitesPageSize}
                                paginationMode="server"
                                rows={satelliteRows}          
                            />                     
                            <Pagination
                                count={Math.ceil(pageState.totalSatellites / pageState.satellitesPageSize)}
                                page={pageState.satellitesPage + 1}
                                onChange={handleSatellitesPageChange}
                            />
                        </div>
                    }
					<p>Life forms: </p>
                    <IconButton
                        component={Link}
                        to={`/planets/${planetId}/addLifeForm`}>
                            <Tooltip title="Attach a life form" arrow>
                                <AddIcon color="primary"/>
                            </Tooltip>
                    </IconButton>
                    {lifeFormRows.length > 0 && 
                        <div>
                            <DataGrid 
                                sx={{ width: 400, height: 400}}
                                columns={lifeFormColumns}
                                rowCount={pageState.totalLifeForms}
                                loading={pageState.isLoading}
                                pagination
                                page={pageState.lifeFormsPage}
                                pageSize={pageState.lifeFormsPageSize}
                                paginationMode="server"
                                hideFooter={true}
                                rows={lifeFormRows}          
                            />
                            <Pagination
                                count={Math.ceil(pageState.totalLifeForms / pageState.lifeFormsPageSize)}
                                page={pageState.lifeFormsPage + 1}
                                onChange={handleLifeFormsPageChange}
                            />
                        </div>

                    }
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planetId}/edit`}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planetId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};