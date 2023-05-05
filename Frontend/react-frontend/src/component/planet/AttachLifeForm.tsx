import { Button, Card, CardContent, IconButton, TextField, Container, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState, useCallback, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SEVERITY_SUCCESS, SHOW_NOTIFICATION } from "../../constants";
import PubSub from "pubsub-js";
import { PlanetLifeFormDTO } from "../../models/dtos/PlanetLifeFormDTO";
import { LifeForm } from "../../models/LifeForm";
import { debounce } from "lodash";

export const AttachLifeForm = () => {
    const { planetId } = useParams();
    const navigate = useNavigate();
    const [lifeFormId, setLifeFormId] = useState<number>(0);
    const [lifeForms, setLifeForms] = useState<LifeForm[]>([]);

    const [planetLifeForm, setPlanetLifeForm] = useState<PlanetLifeFormDTO>({
        survivability: 0,
        adaptability: 0
    });

    const fetchLifeForms = async (query: string) => {
        try{
            const response = await axios.get(`${BACKEND_API_URL}/lifeForms/autocomplete?query=${query}`);
            const lifeForms = await response.data;
            setLifeForms(lifeForms);
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
    };

    const debouncedFetchLifeForms = useCallback(debounce(fetchLifeForms, 200), []);

    useEffect(() => {
		return () => {
			debouncedFetchLifeForms.cancel();
		};
	}, [debouncedFetchLifeForms]);

    const handleInputChange = (event: any, value: any, reason: any) => {
		if (reason === "input" && value) {
			debouncedFetchLifeForms(value);
		}
	};

    const addLifeForm = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/planets/${planetId}/lifeForms/${lifeFormId}`, planetLifeForm);
            PubSub.publish(SHOW_NOTIFICATION, {msg: "Life form added sucessfully!", severity: SEVERITY_SUCCESS});
            navigate(`/planets/${planetId}/details`);
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/planets/${planetId}/details`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <form onSubmit={addLifeForm}>
                        <Autocomplete
                            sx={{ mb: 2}}
                            id="lifeFormId"
                            options={lifeForms}
                            getOptionLabel={(option) => `${option.name}`}
                            renderInput={(params) => <TextField {...params} label="Life form" variant="outlined" />}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    setLifeFormId(value.id!);
                                }
                            }}
                        />
                        <TextField
                            id="survivability"
                            label="Survivability"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanetLifeForm({...planetLifeForm, survivability: parseInt(event.target.value)})}/>
                        <TextField
                            id="adaptability"
                            label="Adaptability"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            onChange={(event) => setPlanetLifeForm({...planetLifeForm, adaptability: parseInt(event.target.value)})}/>
                        <Button type="submit">Attach planet</Button>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};