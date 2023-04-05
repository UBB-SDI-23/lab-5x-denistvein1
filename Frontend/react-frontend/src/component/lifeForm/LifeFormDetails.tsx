import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { LifeForm } from "../../models/LifeForm";
import { PlanetLifeForm } from "../../models/PlanetFileForm";

export const LifeFormDetails = () => {
    const { lifeFormId } = useParams();
    const [lifeForm, setLifeForm] = useState<LifeForm>();

	useEffect(() => {
        const fetchLifeForm =async () => {
            try{
                const response = await fetch(`${BACKEND_API_URL}/lifeForms/${lifeFormId}`);
                const lifeForm = await response.json();
                setLifeForm(lifeForm);
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchLifeForm();
    }, [lifeFormId]);

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <h1>Life form Details</h1>
                    <p>Name: {lifeForm?.name}</p>
                    <p>Iq: {lifeForm?.iq}</p>
                    <p>Lifespan: {lifeForm?.lifeSpan}</p>
                    <p>Energy Use: {lifeForm?.energyUse}</p>
                    <p>Friendly: {lifeForm?.friendly}</p>
                    <p>Conscious: {lifeForm?.conscious}</p>
					<p>Lives on: </p>
                    <ul>
                        {lifeForm?.planetLifeForms?.map((planetLifeForm: PlanetLifeForm) => (
                            <li key={planetLifeForm.planet.id}>{planetLifeForm.planet.name}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardActions>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeFormId}/edit`}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeFormId}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </CardActions>
            </Card>
        </Container>
    );
};