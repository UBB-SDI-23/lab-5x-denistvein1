import {
	TableContainer,
	Paper,
	Table,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Satellite } from "../../models/Satellite";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const AllSatellites = () => {
    const [loading, setLoading] = useState(false);
    const [satellites, setSatellites] = useState<Satellite[]>([]);

    useEffect(() => {
        const fetchSatellites =async () => {
            setLoading(true);
            const response = await fetch(`${BACKEND_API_URL}/satellites`);
            const satellites = await response.json();
            setSatellites(satellites);
            setLoading(false);
        };
        fetchSatellites();
    }, []);

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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Radius</TableCell>
                                <TableCell align="center">Distance</TableCell>
                                <TableCell align="center">Gravity</TableCell>
                                <TableCell align="center">Escape Velocity</TableCell>
                                <TableCell align="center">Orbital Period</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {satellites.map((satellite: Satellite, index: number) => (
                                <TableRow key={satellite.id}>
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/satellites/${satellite.id}/details`} title="View satellite details">
                                            {satellite.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">{satellite.radius}</TableCell>
                                    <TableCell align="center">{satellite.distance}</TableCell>
                                    <TableCell align="center">{satellite.gravity}</TableCell>
                                    <TableCell align="center">{satellite.escapeVelocity}</TableCell>
                                    <TableCell align="center">{satellite.orbitalPeriod}</TableCell>
                                    <TableCell>
                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites/${satellite.id}/details`}>
                                            <Tooltip title="View satellite details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites/${satellite.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites/${satellite.id}/delete`}>
                                            <DeleteForeverIcon sx={{ color: "red" }}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};