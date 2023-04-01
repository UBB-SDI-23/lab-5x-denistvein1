import { Button, Card, CardContent, IconButton, TextField, Container, Snackbar, Alert } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { BACKEND_API_URL } from "../../constants";
import { Planet } from "../../models/Planet"

export const AddPlanet = () => {
    // const navigate = useNavigate();

    const [notification, setNotification] = useState({
        open: false,
        message: "",
        severity: "success"
    });

    const [planet, setPlanet] = useState<Planet>({
        name: "",
        radius: 0,
        temperature: 0,
        gravity: 0,
        escapeVelocity: 0,
        orbitalPeriod: 0,
    });

    const addPlanet = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        await axios.post(`${BACKEND_API_URL}/planets`, planet);
        setNotification({
            open: true,
            message: "Planet added successfully!",
            severity: "success"
        });
        // navigate("/planets");
    };

    return (
        <Container>
            <Snackbar
                open={notification.open}
                autoHideDuration={3000}
                onClose={() => setNotification({...notification, open: false})}>
                <Alert
                    elevation={6}
                    variant="filled"
                    onClose={() => setNotification({...notification, open: false})}
                    severity="success">
                    {notification.message}
                </Alert>
            </Snackbar>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <form onSubmit={addPlanet}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, name: event.target.value})}/>
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
                            label="Escape velocity"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, escapeVelocity: parseFloat(event.target.value)})}/>
                        <TextField
                            id="orbitalPeriod"
                            label="Orbital period"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanet({...planet, orbitalPeriod: parseFloat(event.target.value)})}/>
                        <Button type="submit">Add planet</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};