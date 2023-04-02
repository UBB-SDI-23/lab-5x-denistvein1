import { Button, Card, CardContent, IconButton, TextField, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SEVERITY_SUCCESS, SHOW_NOTIFICATION } from "../../constants";
import { LifeForm } from "../../models/LifeForm";

export const UpdateLifeForm = () => {
    const { lifeFormId } = useParams();
    const navigate = useNavigate();

    const [lifeForm, setLifeForm] = useState<LifeForm>({
        name: "",
        iq: 0,
        lifeSpan: 0,
        energyUse: 0,
        friendly: "",
        conscious: "",
    });

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
    }, []);

    const updateLifeForm = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.put(`${BACKEND_API_URL}/lifeForms/${lifeFormId}`, lifeForm);
            PubSub.publish(SHOW_NOTIFICATION, {msg: "Life form updated sucessfully!", severity: SEVERITY_SUCCESS});
            navigate("/lifeForms");
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <form onSubmit={updateLifeForm}>
                        <TextField
                            id="iq"
                            label="Iq"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setLifeForm({...lifeForm, iq: parseInt(event.target.value)})}/>
                        <TextField
                            id="lifeSpan"
                            label="Lifespan"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setLifeForm({...lifeForm, lifeSpan: parseInt(event.target.value)})}/>
                        <TextField
                            id="energyUse"
                            label="Energy Use"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setLifeForm({...lifeForm, energyUse: parseFloat(event.target.value)})}/>
                        <TextField
                            id="friendly"
                            label="Friendly"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setLifeForm({...lifeForm, friendly: event.target.value})}/>
                        <TextField
                            id="conscious"
                            label="Conscious"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setLifeForm({...lifeForm, conscious: event.target.value})}/>
                        <Button type="submit">Update Life form</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};