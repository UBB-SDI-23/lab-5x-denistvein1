import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Planet } from "../../models/Planet";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ReportPlanetLifeFormDTO } from "../../models/dtos/ReportPlanetLifeFormDTO";
import { ReportPlanetSatelliteDTO } from "../../models/dtos/ReportPlanetSatelliteDTO";

export const AllPlanets = () => {
    const [radius, setRadius] = useState(0);
    const [loading, setLoading] = useState(false);
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [reportPlanetLifeFormDto, setReportPlanetLifeFormDto] = useState<ReportPlanetLifeFormDTO[]>([]);
    const [reportPlanetSatelliteDto, setReportPlanetSatelliteDto] = useState<ReportPlanetSatelliteDTO[]>([]);

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            const responsePlanets = await fetch(`${BACKEND_API_URL}/planets`);
            const responseReportPlanetLifeFormDto = await fetch(`${BACKEND_API_URL}/planets/by-avg-lifeForm-iq`);
            const responseReportPlanetSatelliteDto = await fetch(`${BACKEND_API_URL}/planets/by-biggest-satellite`);
			const planets = await responsePlanets.json();
			const reportPlanetLifeFormDto = await responseReportPlanetLifeFormDto.json();
            const reportPlanetSatelliteDto = await responseReportPlanetSatelliteDto.json();
            setPlanets(planets);
            setReportPlanetLifeFormDto(reportPlanetLifeFormDto);
            setReportPlanetSatelliteDto(reportPlanetSatelliteDto);
            setLoading(false);
        };
        fetchPlanets();
    }, []);

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
                        label="Radius"
                        variant="outlined"
                        fullWidth
                        sx={{ mb: 2 }}
                        onChange={(event) => setRadius(event.target.value === "" ? 0 : parseFloat(event.target.value))}/>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">#</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Radius</TableCell>
                                    <TableCell align="center">Temperature</TableCell>
                                    <TableCell align="center">Gravity</TableCell>
                                    <TableCell align="center">Escape Velocity</TableCell>
                                    <TableCell align="center">Orbital Period</TableCell>
                                    <TableCell align="center">Average Life Form Iq</TableCell>
                                    <TableCell align="center">Biggest Satellite</TableCell>
                                    <TableCell align="center">Operations</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {planets.filter(planet => planet.radius > radius).map((planet: Planet, index: number) => (
                                    <TableRow key={planet.id}>
                                        <TableCell component="th" scope="row" align="center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row" align="center">
                                            <Link to={`/planets/${planet.id}/details`} title="View planet details">
                                                {planet.name}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="center">{planet.radius}</TableCell>
                                        <TableCell align="center">{planet.temperature}</TableCell>
                                        <TableCell align="center">{planet.gravity}</TableCell>
                                        <TableCell align="center">{planet.escapeVelocity}</TableCell>
                                        <TableCell align="center">{planet.orbitalPeriod}</TableCell>
                                        <TableCell align="center">{reportPlanetLifeFormDto.filter(dto => dto.planetName === planet.name).map(filteredDto => (
                                            filteredDto.avgLifeFormIq
                                        ))}</TableCell>
                                        <TableCell align="center">{reportPlanetSatelliteDto.filter(dto => dto.planetName === planet.name).map(filteredDto => (
                                            filteredDto.satelliteName
                                        ))}</TableCell>
                                        <TableCell align="center">
                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planet.id}/details`}>
                                                <Tooltip title="View planet details" arrow>
                                                    <ReadMoreIcon color="primary"/>
                                                </Tooltip>
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planet.id}/edit`}>
                                                <EditIcon/>
                                            </IconButton>

                                            <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planet.id}/delete`}>
                                                <DeleteForeverIcon sx={{ color: "red" }}/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </Container>
    );
};