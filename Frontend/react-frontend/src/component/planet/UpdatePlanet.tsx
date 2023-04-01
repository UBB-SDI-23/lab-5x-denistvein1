import { Button, Card, CardContent, IconButton, TextField, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { BACKEND_API_URL } from "../../constants";
import { Planet } from "../../models/Planet";

export const UpdatePlanet = () => {
    const { planetId } = useParams();
    const navigate = useNavigate();

    const [planet, setPlanet] = useState<Planet>({
        name: "",
        radius: 0,
        temperature: 0,
        gravity: 0,
        escapeVelocity: 0,
        orbitalPeriod: 0,
    });

    useEffect(() => {
        const fetchPlanet =async () => {
            const response = await fetch(`${BACKEND_API_URL}/planets/${planetId}`);
            const planet = await response.json();
            setPlanet(planet);
        };
        fetchPlanet();
    }, []);

    const updatePlanet = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        await axios.put(`${BACKEND_API_URL}/planets/${planetId}`, planet);
        navigate("/planets");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <form onSubmit={updatePlanet}>
                        <TextField
                            id="radius"
                            label="Radius"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, radius: parseFloat(event.target.value)})}/>
                        <TextField
                            id="temperature"
                            label="Temperature"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, temperature: parseFloat(event.target.value)})}/>
                        <TextField
                            id="gravity"
                            label="Gravity"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, gravity: parseFloat(event.target.value)})}/>
                        <TextField
                            id="escapeVelocity"
                            label="Escape Velocity"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, escapeVelocity: parseFloat(event.target.value)})}/>
                        <TextField
                            id="orbitalPeriod"
                            label="Orbital Period"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, orbitalPeriod: parseFloat(event.target.value)})}/>
                        <Button type="submit">Update Planet</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};