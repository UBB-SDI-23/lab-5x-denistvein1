import { Button, Card, CardContent, IconButton, TextField, Container, FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, Link, useParams, useFetchers } from "react-router-dom"
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SEVERITY_SUCCESS, SHOW_NOTIFICATION } from "../../constants";
import { Satellite } from "../../models/Satellite";
import { Planet } from "../../models/Planet";

export const UpdateSatellite = () => {
    const { satelliteId } = useParams();
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
            try{
                const response = await fetch(`${BACKEND_API_URL}/planets`);
                const planets = await response.json();
                setPlanets(planets);
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
            setLoading(false);
        };
        fetchPlanets();
    }, []);

    useEffect(() => {
        const fetchSatellite = async () => {
            try{
                const response = await fetch(`${BACKEND_API_URL}/satellites/${satelliteId}`);
                const satellite = await response.json();
                setSatellite(satellite);
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchSatellite();
    }, []);

    const updateSatellite = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.put(`${BACKEND_API_URL}/satellites/${satelliteId}`, satellite);
            PubSub.publish(SHOW_NOTIFICATION, {msg: "Satellite updated sucessfully!", severity: SEVERITY_SUCCESS});
            navigate("/satellites");
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
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
                        <form onSubmit={updateSatellite}>
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
                            <Button type="submit">Update Satellite</Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </Container>
    );
};