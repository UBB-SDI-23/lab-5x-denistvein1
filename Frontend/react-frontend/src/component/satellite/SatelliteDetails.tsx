import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Satellite } from "../../models/Satellite";
import axios from "axios";

export const SatelliteDetails = () => {
    const { satelliteId } = useParams();
    const [satellite, setSatellite] = useState<Satellite>();

    useEffect(() => {
        const fetchSatellite = async () => {
            try{
                const response = await axios.get(`${BACKEND_API_URL}/satellites/${satelliteId}`);
                const satellite = await response.data;
                setSatellite(satellite);   
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchSatellite();
    }, []);

    return (
        <Container sx={{ marginTop: 6 }}>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <h1>Satellite Details</h1>
                    <p>Name: {satellite?.name}</p>
                    <p>Radius: {satellite?.radius}</p>
                    <p>Distance: {satellite?.distance}</p>
                    <p>Description: {satellite?.description}</p>
                    <p>Gravity: {satellite?.gravity}</p>
                    <p>Escape Velocity: {satellite?.escapeVelocity}</p>
                    <p>Orbital Period: {satellite?.orbitalPeriod}</p>
                    <p>Satellite of Planet: {satellite?.planet?.name}</p>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites/${satelliteId}/edit`}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites/${satelliteId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};