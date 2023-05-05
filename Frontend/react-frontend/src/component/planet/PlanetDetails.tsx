import { Card, CardActions, CardContent, IconButton, TableContainer } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import { Planet } from "../../models/Planet";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { PlanetLifeForm } from "../../models/PlanetFileForm";
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
        const fetchPlanet =async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const response = await axios.get(`${BACKEND_API_URL}/planets/${planetId}?satellitesPage=${pageState.satellitesPage}&satellitesPageSize=
                ${pageState.satellitesPageSize}&lifeFormsPage=${pageState.lifeFormsPage}&lifeFormsPageSize=${pageState.lifeFormsPageSize}`);
                const responseSatellitesRowCount = await axios.get(`${BACKEND_API_URL}/planets/${planetId}/size/satellites`);
                const responseLifeFormsRowCount = await axios.get(`${BACKEND_API_URL}/planets/${planetId}/size/lifeForms`);
                const planet = await response.data
                const satellitesRowCount = await responseSatellitesRowCount.data;
                const lifeFormsRowCount = await responseLifeFormsRowCount.data;
                setPageState(old => ({...old, isLoading: false, data: planet, totalSatellites: satellitesRowCount, totalLifeForms: lifeFormsRowCount}));
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
        {field: "index", headerName: "#", width: 200},
        {field: "name", headerName: "Name", width: 200},
    ];

    const satelliteRows = pageState.data?.satellites === undefined ? [] : pageState.data.satellites.map((satellite: Satellite, index: number) => ({
        index: pageState.satellitesPage * pageState.satellitesPageSize + index + 1,
        ...satellite
    }));

    const lifeFormRows = pageState.data?.planetLifeForms === undefined ? [] : pageState.data.planetLifeForms.map((planetLifeForm: PlanetLifeForm, index: number) => ({
        index: pageState.lifeFormsPage * pageState.lifeFormsPageSize + index + 1,
        ...planetLifeForm.lifeForm
    }));

    console.log(lifeFormRows[0]);

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
                    {satelliteRows.length === 0 && <p>No satellites found</p>}
                    {satelliteRows.length > 0 &&
                        <DataGrid 
                            sx={{ width: 400, height: 400}}
                            columns={satelliteColumns}
                            rowCount={pageState.totalSatellites}
                            loading={pageState.isLoading}
                            pagination
                            page={pageState.satellitesPage}
                            pageSize={pageState.satellitesPageSize}
                            paginationMode="server"
                            onPageChange={(newPage) => {
                                setPageState(old => ({ ...old, satellitesPage: newPage }))
                            }}
                            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, satellitesPageSize: newPageSize }))}
                            rows={satelliteRows}          
                        />
                    }
					<p>Life forms: </p>
                    {lifeFormRows.length === 0 && <p>No life forms found</p>}
                    {lifeFormRows.length > 0 && 
                        <DataGrid 
                            sx={{ width: 400, height: 400}}
                            columns={lifeFormColumns}
                            rowCount={pageState.totalLifeForms}
                            loading={pageState.isLoading}
                            pagination
                            page={pageState.lifeFormsPage}
                            pageSize={pageState.lifeFormsPageSize}
                            paginationMode="server"
                            onPageChange={(newPage) => {
                                setPageState(old => ({ ...old, lifeFormsPage: newPage }))
                            }}
                            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, lifeFormsPageSize: newPageSize }))}
                            rows={lifeFormRows}          
                        />
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