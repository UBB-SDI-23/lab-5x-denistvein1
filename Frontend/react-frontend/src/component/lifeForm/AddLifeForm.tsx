import { Button, Card, CardContent, IconButton, TextField, Container } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { BACKEND_API_URL } from "../../constants";
import { LifeForm } from "../../models/LifeForm";

export const AddLifeForm = () => {
    const navigate = useNavigate();

    const [lifeForm, setLifeForm] = useState<LifeForm>({
        name: "",
        iq: 0,
        lifeSpan: 0,
        energyUse: 0,
        friendly: "",
        conscious: "",
    });

    const addLifeForm = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        await axios.post(`${BACKEND_API_URL}/lifeForms`, lifeForm);
        navigate("/lifeForms");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <form onSubmit={addLifeForm}>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setLifeForm({...lifeForm, name: event.target.value})}/>
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
                        <Button type="submit">Add life form</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};