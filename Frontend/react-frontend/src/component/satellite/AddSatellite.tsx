import { Button, Card, CardContent, IconButton, TextField, Container, FormControl, InputLabel, Select, MenuItem, CircularProgress, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useCallback, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SEVERITY_SUCCESS, SHOW_NOTIFICATION } from "../../constants";
import { Satellite } from "../../models/Satellite";
import { Planet } from "../../models/Planet";
import { debounce } from "lodash";

export const AddSatellite = () => {
    const navigate = useNavigate();
    const [planets, setPlanets] = useState<Planet[]>([]);

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

    const fetchPlanets = async (query: string) => {
        try{
            const response = await axios.get(`${BACKEND_API_URL}/planets/autocomplete?query=${query}`);
            const planets = await response.data;
            setPlanets(planets);
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
    };

    const debouncedFetchPlanets = useCallback(debounce(fetchPlanets, 200), []);

    useEffect(() => {
		return () => {
			debouncedFetchPlanets.cancel();
		};
	}, [debouncedFetchPlanets]);

    const handleInputChange = (event: any, value: any, reason: any) => {
		if (reason === "input") {
			debouncedFetchPlanets(value);
		}
	};

    const addSatellite = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/satellites/${satellite.planet.id}`, satellite);
            PubSub.publish(SHOW_NOTIFICATION, {msg: "Satellite added sucessfully!", severity: SEVERITY_SUCCESS});
            navigate("/satellites");
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
    };
    
    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <form onSubmit={addSatellite}>
                        <Autocomplete
                            sx={{ mb: 2}}
                            id="planet_id"
                            options={planets}
                            getOptionLabel={(option) => `${option.name}`}
                            renderInput={(params) => <TextField {...params} label="Planet" variant="outlined" />}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    setSatellite({ ...satellite, planet: value });
                                }
                            }}
                        />
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
        </Container>
    );
};