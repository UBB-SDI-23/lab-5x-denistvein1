import {
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import { Planet } from "../../models/Planet";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ReportPlanetLifeFormDTO } from "../../models/dtos/ReportPlanetLifeFormDTO";
import { ReportPlanetSatelliteDTO } from "../../models/dtos/ReportPlanetSatelliteDTO";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from "axios";

interface PageState{
    isLoading: boolean,
    data: Planet[],
    total: number,
    page: number,
    pageSize: number
};

export const AllPlanets = () => {
    const [radius, setRadius] = useState(0);
    const [loading, setLoading] = useState(false);
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [reportPlanetLifeFormDto, setReportPlanetLifeFormDto] = useState<ReportPlanetLifeFormDTO[]>([]);
    const [reportPlanetSatelliteDto, setReportPlanetSatelliteDto] = useState<ReportPlanetSatelliteDTO[]>([]);

    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 25
    });

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            try{
                setPageState(old => ({...old, isLoading: true }))
                const responsePlanets = await axios.get(`${BACKEND_API_URL}/planets?pageNumber=${pageState.page}&pageSize=${pageState.pageSize}`);
                const responseReportPlanetLifeFormDto = await axios.get(`${BACKEND_API_URL}/planets/by-avg-lifeForm-iq?pageNumber=${pageState.page}&pageSize=${pageState.pageSize}`);
                const responseReportPlanetSatelliteDto = await axios.get(`${BACKEND_API_URL}/planets/by-biggest-satellites?pageNumber=${pageState.page}&pageSize=${pageState.pageSize}`);
                const responseRowCount = await axios.get(`${BACKEND_API_URL}/planets/size`);
                const planets = await responsePlanets.data;
                const reportPlanetLifeFormDto = await responseReportPlanetLifeFormDto.data;
                const reportPlanetSatelliteDto = await responseReportPlanetSatelliteDto.data;
                const rowCount = await responseRowCount.data;
                setPlanets(planets);
                setReportPlanetLifeFormDto(reportPlanetLifeFormDto);
                setReportPlanetSatelliteDto(reportPlanetSatelliteDto);
                setPageState(old => ({...old, isLoading: false, data: planets, total: rowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
            setLoading(false);
        };
        fetchPlanets();
    }, [pageState.page, pageState.pageSize]);

    const columns: GridColDef[] = [
        {field: "index", headerName: "#", width: 100},
        {field: "name", headerName: "Name", width: 150},
        {field: "radius", headerName: "Radius", width: 150},
        {field: "temperature", headerName: "Temperature", width: 150},
        {field: "gravity", headerName: "Gravity", width: 150},
        {field: "escapeVelocity", headerName: "Escape Velocity", width: 150},
        {field: "orbitalPeriod", headerName: "Orbital Period", width: 150},
        {field: "avgLifeFormIq", headerName: "Average Life Form Iq", width: 150},
        {field: "biggestSatellite", headerName: "Biggest Satellite", width: 150},
        {field: "operations", headerName: "Operations", width: 150, renderCell: (params) => {
            return (
                <>
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
                </>
            );
        }},
    ];

    const rows = pageState.data.filter(planet => planet.radius >= radius).map((planet: Planet, index: number) => (
        {
            index: pageState.page * pageState.pageSize + index + 1,
            ...planet,
            avgLifeFormIq: reportPlanetLifeFormDto.filter(dto => dto.planetName === planet.name).map(filteredDto => filteredDto.avgLifeFormIq.toFixed(2)),
            biggestSatellite: reportPlanetSatelliteDto.filter(dto => dto.planetName === planet.name).map(filteredDto => (filteredDto.satelliteName))
        }
    ));

    return (
        <Container>
            <h1>All planets</h1>
            {loading && <CircularProgress/>}
            {!loading && planets.length === 0 && <p>No planets found</p>}
            {!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/planets/add`}>
					<Tooltip title="Add a new planet" arrow>
						<AddIcon color="primary"/>
					</Tooltip>
				</IconButton>
			)}
            {!loading && planets.length > 0 && (
                <div>
                <TextField
                    id="radius"
                    label="Radius > than"
                    variant="outlined"
                    fullWidth
                    sx={{ mb: 2 }}
                    onChange={(event) => setRadius(event.target.value === "" ? -1 : parseFloat(event.target.value))}/>
                <DataGrid 
                    sx={{ width: 1152, height: 600 }}
                    rows={rows}
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
                      columns={columns}
                />
                </div>
            )}
        </Container>
    );
};