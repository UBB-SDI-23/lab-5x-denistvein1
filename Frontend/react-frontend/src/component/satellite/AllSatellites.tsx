import {
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    Pagination
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
    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 25
    });

    useEffect(() => {
        const fetchSatellites =async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const responseSatellites = await axios.get(`${BACKEND_API_URL}/satellites?page=${pageState.page}&pageSize=${pageState.pageSize}`);
                const responseRowCount = await axios.get(`${BACKEND_API_URL}/satellites/size`);
                const satellites = await responseSatellites.data;
                const rowCount = await responseRowCount.data;
                setPageState(old => ({...old, isLoading: false, data: satellites, total: rowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
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
                <div>
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
                </div>
            );
        }},
    ];

    const rows = pageState.data.map((satellite: Satellite, index: number) => ({
        index: pageState.page * pageState.pageSize + index + 1,
        ...satellite
    }));

    const handlePageChange = (event: any, value: number) => {
        setPageState(old => ({ ...old, page: value - 1 }));
    };

    return (
        <Container>
            <h1>All satellites</h1>
            {pageState.isLoading && <CircularProgress/>}
            {!pageState.isLoading && pageState.data.length === 0 && <p>No satellites found</p>}
            {!pageState.isLoading && (
                <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites/add`}>
                    <Tooltip title="Add a new satellite" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!pageState.isLoading && pageState.data.length > 0 && (
                <div>
                    <DataGrid 
                        sx={{ width: 1300, height: 600 }}
                        columns={columns}
                        rowCount={pageState.total}
                        loading={pageState.isLoading}
                        pagination
                        page={pageState.page}
                        pageSize={pageState.pageSize}
                        hideFooter={true}
                        paginationMode="server"
                        rows={rows}                
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