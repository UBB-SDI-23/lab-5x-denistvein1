import { Button, Card, CardContent, IconButton, TextField, Container, FormControl, InputLabel, Select, MenuItem, CircularProgress, SelectChangeEvent } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { BACKEND_API_URL } from "../../constants";
import { Satellite } from "../../models/Satellite";
import { Planet } from "../../models/Planet";

export const AddSatellite = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [planets, setPlanets] = useState<Planet[]>([]);
    const [planetName, setPlanetName] = useState('');

    const [satellite, setSatellite] = useState<Satellite>({
        name: "",
        radius: 0,
        distance: 0,
        gravity: 0,
        escapeVelocity: 0,
        orbitalPeriod: 0,
        planet: {
            name: "",
            radius: 0,
            temperature: 0,
            gravity: 0,
            escapeVelocity: 0,
            orbitalPeriod: 0
        }
    });

    useEffect(() => {
        const fetchPlanets = async () => {
            setLoading(true);
            const response = await fetch(`${BACKEND_API_URL}/planets`);
			const planets = await response.json();
            setPlanets(planets);
            setLoading(false);
        };
        fetchPlanets();
    }, []);

    const addSatellite = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        await axios.post(`${BACKEND_API_URL}/satellites/${satellite.planet.id}`, satellite);
        navigate("/satellites");
    };
    
    return (
        <Container>
            {loading && <CircularProgress/>}
            {!loading && (
                <Card>
                    <CardContent>
                        <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites`}>
                            <ArrowBackIcon/>
                        </IconButton>
                        <form onSubmit={addSatellite}>
                            <FormControl sx={{ mb: 2 }} fullWidth>
                                <InputLabel id="dropdown-label">Planet</InputLabel>
                                    <Select
                                    id="dropdown"
                                    labelId="dropdown-label"
                                    value={planetName}
                                    label="Planet"
                                    onChange={(event) => {
                                        setPlanetName(event.target.value);
                                        setSatellite({...satellite, planet: planets.find(planet => planet.name === event.target.value)!});
                                    }}>
                                    {planets.map((planet: Planet) => (
                                        <MenuItem key={planet.id} value={planet.name}>{planet.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => setSatellite({...satellite, name: event.target.value})}/>
                            <TextField
                                id="radius"
                                label="Radius"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => setSatellite({...satellite, radius: parseFloat(event.target.value)})}/>
                            <TextField
                                id="distance"
                                label="Distance"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => setSatellite({...satellite, distance: parseFloat(event.target.value)})}/>
                            <TextField
                                id="gravity"
                                label="Gravity"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => setSatellite({...satellite, gravity: parseFloat(event.target.value)})}/>
                            <TextField
                                id="escapeVelocity"
                                label="Escape Velocity"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => setSatellite({...satellite, escapeVelocity: parseFloat(event.target.value)})}/>
                            <TextField
                                id="orbitalPeriod"
                                label="Orbital Period"
                                variant="outlined"
                                fullWidth
                                sx={{ mb: 2 }}
                                onChange={(event) => setSatellite({...satellite, orbitalPeriod: parseFloat(event.target.value)})}/>
                            <Button type="submit">Add satellite</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};