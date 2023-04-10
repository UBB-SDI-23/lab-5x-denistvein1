import {
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import { Satellite } from "../../models/Satellite";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";

interface PageState{
    isLoading: boolean,
    data: Satellite[],
    total: number,
    page: number,
    pageSize: number
};

export const AllSatellites = () => {
    const [loading, setLoading] = useState(false);
    const [satellites, setSatellites] = useState<Satellite[]>([]);

    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 25
    });

    useEffect(() => {
        const fetchSatellites =async () => {
            setLoading(true);
            try{
                setPageState(old => ({...old, isLoading: true }))
                const responseSatellites = await axios.get(`${BACKEND_API_URL}/satellites?pageNumber=${pageState.page}&pageSize=${pageState.pageSize}`);
                const responseRowCount = await axios.get(`${BACKEND_API_URL}/satellites/size`);
                const satellites = await responseSatellites.data;
                const rowCount = await responseRowCount.data;
                setSatellites(satellites);
                setPageState(old => ({...old, isLoading: false, data: satellites, total: rowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
            setLoading(false);
        };
        fetchSatellites();
    }, [pageState.page, pageState.pageSize]);

    const columns: GridColDef[] = [
        {field: "index", headerName: "#", width: 100},
        {field: "name", headerName: "Name", width: 150},
        {field: "description", headerName: "Description", width: 150},
        {field: "radius", headerName: "Radius", width: 150},
        {field: "distance", headerName: "Distance", width: 150},
        {field: "gravity", headerName: "Gravity", width: 150},
        {field: "escapeVelocity", headerName: "Escape Velocity", width: 150},
        {field: "orbitalPeriod", headerName: "Orbital Period", width: 150},
        {field: "operations", headerName: "Operations", width: 150, renderCell: (params) => {
            return (
                <>
                    <IconButton component={Link} to={`/satellites/${params.id}/details`}>
                        <Tooltip title="View satellite details" arrow>
                            <ReadMoreIcon color="primary"/>
                        </Tooltip>
                    </IconButton>

                    <IconButton component={Link} to={`/satellites/${params.id}/edit`}>
                        <EditIcon/>
                    </IconButton>

                    <IconButton component={Link} to={`/satellites/${params.id}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </>
            );
        }},
    ];

    const rows = satellites.map((satellite: Satellite, index: number) => ({
        index: pageState.page * pageState.pageSize + index + 1,
        ...satellite
    }));

    return (
        <Container>
            <h1>All satellites</h1>
            {loading && <CircularProgress/>}
            {!loading && satellites.length === 0 && <p>No satellites found</p>}
            {!loading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites/add`}>
                    <Tooltip title="Add a new satellite" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && satellites.length > 0 && (
                <DataGrid 
                    sx={{ width: 1152, height: 600 }}
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
            )}
        </Container>
    );
};