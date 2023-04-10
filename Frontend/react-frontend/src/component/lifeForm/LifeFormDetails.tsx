import { Card, CardActions, CardContent, IconButton, Tooltip } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LifeForm } from "../../models/LifeForm";
import { PlanetLifeForm } from "../../models/PlanetFileForm";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface PageState{
    isLoading: boolean,
    total: number,
    data: LifeForm,
    page: number,
    pageSize: number
};

export const LifeFormDetails = () => {
    const { lifeFormId } = useParams();
    const [lifeForm, setLifeForm] = useState<LifeForm>();

    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        total: 0,
        data: {
            name: "",
            iq: 0,
            lifeSpan: 0,
            energyUse: 0,
            friendly: "",
            conscious: "",
            planetLifeForms: []
        },
        page: 0,
        pageSize: 25
    });

	useEffect(() => {
        const fetchLifeForm =async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const response = await axios.get(`${BACKEND_API_URL}/lifeForms/${lifeFormId}?pageNumber=${pageState.page}&pageSize=${pageState.pageSize}`);
                const responseRowCount = await axios.get(`${BACKEND_API_URL}/lifeForms/${lifeFormId}/size`);
                const lifeForm = await response.data;
                const rowCount = await responseRowCount.data;
                setLifeForm(lifeForm);
                setPageState(old => ({...old, isLoading: false, data: lifeForm, total: rowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchLifeForm();
    }, [pageState.page, pageState.pageSize]);

    const columns: GridColDef[] = [
        {field: "index", headerName: "#", width: 200},
        {field: "name", headerName: "Name", width: 200}
    ];

    const rows = lifeForm?.planetLifeForms === undefined ? [] : lifeForm.planetLifeForms.map((planetLifeForm: PlanetLifeForm, index: number) => ({
        index: pageState.page * pageState.pageSize + index + 1,
        ...planetLifeForm.planet
    }));

    return (
        <Container sx={{ marginTop: 6 }}>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <h1>Life form Details</h1>
                    <p>Name: {lifeForm?.name}</p>
                    <p>Iq: {lifeForm?.iq}</p>
                    <p>Lifespan: {lifeForm?.lifeSpan}</p>
                    <p>Energy Use: {lifeForm?.energyUse}</p>
                    <p>Friendly: {lifeForm?.friendly}</p>
                    <p>Conscious: {lifeForm?.conscious}</p>
					<p>Lives on: </p>
                    {rows.length === 0 && <p>No planets found</p>}
                    {rows.length > 0 && 
                        <DataGrid 
                            sx={{ width: 402, height: 402}}
                            columns={columns}
                            rowCount={pageState.total}
                            loading={pageState.isLoading}
                            pagination
                            page={pageState.page}
                            pageSize={pageState.pageSize}
                            paginationMode="server"
                            onPageChange={(newPage) => {
                                setPageState(old => ({ ...old, page: newPage }))
                            }}
                            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                            rows={rows}          
                        />
                    }
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeFormId}/edit`}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeFormId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};