import {
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    TextField,
    Pagination,
} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";
import { PlanetDTO } from "../../models/dtos/PlanetDTO";

interface PageState{
    isLoading: boolean,
    data: PlanetDTO[],
    total: number,
    page: number,
    pageSize: number
};

export const AllPlanets = () => {
    const [radius, setRadius] = useState(0);

    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 25
    });

    useEffect(() => {
        const fetchSize = async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const response = await axios.get(`${BACKEND_API_URL}/planets/size?radius=${radius}`);
                const rowCount = await response.data;
                setPageState(old => ({...old, isLoading: false, total: rowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchSize();
    }, [radius]);

    useEffect(() => {
        const fetchPlanets = async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const responsePlanets = await axios.get(`${BACKEND_API_URL}/planets?page=${pageState.page}&pageSize=${pageState.pageSize}&radius=${radius}`);
                const planets = await responsePlanets.data;
                setPageState(old => ({...old, isLoading: false, data: planets}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchPlanets();
    }, [pageState.page, pageState.pageSize, radius]);

    const columns: GridColDef[] = [
        {field: "index", headerName: "#", width: 100},
        {field: "name", headerName: "Name", width: 150},
        {field: "radius", headerName: "Radius", width: 150},
        {field: "temperature", headerName: "Temperature", width: 150},
        {field: "gravity", headerName: "Gravity", width: 150},
        {field: "escapeVelocity", headerName: "Escape Velocity", width: 150},
        {field: "orbitalPeriod", headerName: "Orbital Period", width: 150},
        {field: "satellitesSize", headerName: "No. Satellites", width: 150},
        {field: "operations", headerName: "Operations", width: 150, renderCell: (params) => {
            return (
                <div>
                    <IconButton component={Link} to={`/planets/${params.id}/details`}>
                        <Tooltip title="View planet details" arrow>
                            <ReadMoreIcon color="primary"/>
                        </Tooltip>
                    </IconButton>

                    <IconButton component={Link} to={`/planets/${params.id}/edit`}>
                        <EditIcon/>
                    </IconButton>

                    <IconButton component={Link} to={`/planets/${params.id}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </div>
            );
        }},
    ];

    const rows = pageState.data.map((planet: PlanetDTO, index: number) => (
        {
            index: pageState.page * pageState.pageSize + index + 1,
            ...planet,
        }
    ));

    const handlePageChange = (event: any, value: number) => {
        setPageState(old => ({ ...old, page: value - 1 }));
        setRadius(radius);
    };

    return (
        <Container>
            <h1>All planets</h1>
            {pageState.isLoading && <CircularProgress/>}
            {!pageState.isLoading && pageState.data.length === 0 && <p>No planets found</p>}
            {!pageState.isLoading && (
                <div>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/add`}>
                        <Tooltip title="Add a new planet" arrow>
                            <AddIcon color="primary"/>
                        </Tooltip>
                    </IconButton>
                    <IconButton
                        component={Link}
                        to={`/planets/statistics`}>
                        Statistics
                    </IconButton>
                    <TextField
                        id="radius"
                        label="Filter by: Radius > than"
                        variant="outlined"
                        fullWidth
                        value={radius}
                        autoFocus={true}
                        sx={{ mb: 2 }}
                        onChange={(event) => setRadius(event.target.value === "" ? 0 : parseFloat(event.target.value))}
                    />
                </div>
			)}
            {!pageState.isLoading && pageState.data.length > 0 && (
                <div>
                    <DataGrid 
                        sx={{ width: 1150, height: 600 }}
                        rows={rows}
                        rowCount={pageState.total}
                        loading={pageState.isLoading}
                        pagination
                        page={pageState.page}
                        pageSize={pageState.pageSize}
                        hideFooter={true}
                        paginationMode="server"
                        columns={columns}
                    />
                    <Pagination
                        count={Math.ceil(pageState.total / pageState.pageSize)}
                        page={pageState.page + 1}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </Container>
    );
};