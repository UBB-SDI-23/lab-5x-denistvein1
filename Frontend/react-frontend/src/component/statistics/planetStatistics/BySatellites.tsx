import {
	CircularProgress,
	Container,
	IconButton,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../../constants";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { StatisticsPlanetSatellitesDTO } from "../../../models/dtos/statistics/StatisticsPlanetSatellitesDTO";

interface PageState{
    isLoading: boolean,
    data: StatisticsPlanetSatellitesDTO[],
    total: number,
    page: number,
    pageSize: number
};

export const BySatellites = () => {
    const [loading, setLoading] = useState(false);

    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 25
    });

    useEffect(() => {
        const fetchStatistics = async () => {
            setLoading(true);
            try{
                setPageState(old => ({...old, isLoading: true }))
                const response = await axios.get(`${BACKEND_API_URL}/planets/by-satellites?page=${pageState.page}&pageSize=${pageState.pageSize}`);
                const statistics = await response.data;
                const responseRowCount = await axios.get(`${BACKEND_API_URL}/planets/size`);
                const rowCount = await responseRowCount.data;
                setPageState(old => ({...old, isLoading: false, data: statistics, total: rowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
            setLoading(false);
        };
        fetchStatistics();
    }, [pageState.page, pageState.pageSize]);

    const columns: GridColDef[] = [
        {field: "index", headerName: "#", width: 100},
        {field: "planetName", headerName: "Planet", width: 150},
        {field: "satellites", headerName: "No. Satellites", width: 150}
    ];

    const rows = pageState.data.map((statistics: StatisticsPlanetSatellitesDTO, index: number) => (
        {
            index: pageState.page * pageState.pageSize + index + 1,
            ...statistics,
        }
    ));

    return (
        <Container>
            {loading && <CircularProgress/>}
            {!loading && (
                    <IconButton
                    component={Link}
                    to={`/planets/statistics`}>
                    <ArrowBackIcon/>
                </IconButton>
            )}
            {!loading && pageState.data.length === 0 && <p>No statistics available</p>}
            {!loading && pageState.data.length > 0 && (
                <DataGrid 
                    sx={{ width: 400, height: 600 }}
                    rows={rows}
                    rowCount={pageState.total}
                    loading={pageState.isLoading}
                    pagination
                    page={pageState.page}
                    pageSize={pageState.pageSize}
                    paginationMode="server"
                    onPageChange={(newPage) => {
                        setPageState(old => ({ ...old, page: newPage }));
                    }}
                    onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
                    columns={columns}
                />
			)}
        </Container>
    );
};