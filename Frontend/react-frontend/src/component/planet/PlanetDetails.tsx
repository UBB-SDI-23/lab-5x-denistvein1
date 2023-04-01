import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import { Planet } from "../../models/Planet";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export const PlanetDetails = () => {
    const { planetId } = useParams();
    const [planet, setPlanet] = useState<Planet>();

	useEffect(() => {
        const fetchPlanet =async () => {
            const response = await fetch(`${BACKEND_API_URL}/planets/${planetId}`);
            const planet = await response.json();
            setPlanet(planet);
        };
        fetchPlanet();
    }, [planetId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <h1>Planet Details</h1>
                    <p>Name: {planet?.name}</p>
                    <p>Radius: {planet?.radius}</p>
                    <p>Temperature: {planet?.temperature}</p>
                    <p>Gravity: {planet?.gravity}</p>
                    <p>Escape Velocity: {planet?.escapeVelocity}</p>
                    <p>Orbital Period: {planet?.orbitalPeriod}</p>
					<p>Satellites: </p>
                    <ul>
                        {planet?.satellites?.map((satellite) => (
                            <li key={satellite.id}>{satellite.name}</li>
                        ))}
                    </ul>
					<p>Life forms: </p>
                    <ul>
                        {planet?.planetLifeForms?.map((planetLifeForm) => (
                            <li key={planetLifeForm.id}>{planetLifeForm.lifeForm.name}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planetId}/edit`}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planetId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};