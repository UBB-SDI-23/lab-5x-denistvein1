import { Button, Card, CardContent, IconButton, TextField, Container, Autocomplete } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useState, useCallback, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SEVERITY_SUCCESS, SHOW_NOTIFICATION } from "../../constants";
import PubSub from "pubsub-js";
import { PlanetLifeFormDTO } from "../../models/dtos/PlanetLifeFormDTO";
import { debounce } from "lodash";
import { Planet } from "../../models/Planet";

export const AttachPlanet = () => {
    const { lifeFormId } = useParams();
    const navigate = useNavigate();
    const [planetId, setPlanetId] = useState<number>(0);
    const [planets, setPlanets] = useState<Planet[]>([]);

    const [planetLifeForm, setPlanetLifeForm] = useState<PlanetLifeFormDTO>({
        survivability: 0,
        adaptability: 0
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
		if (reason === "input" && value) {
			debouncedFetchPlanets(value);
		}
	};

    const addPlanet = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.post(`${BACKEND_API_URL}/planets/${planetId}/lifeForms/${lifeFormId}`, planetLifeForm);
            PubSub.publish(SHOW_NOTIFICATION, {msg: "Life form added sucessfully!", severity: SEVERITY_SUCCESS});
            navigate(`/lifeForms/${lifeFormId}/details`);
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeFormId}/details`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    <form onSubmit={addPlanet}>
                        <Autocomplete
                            sx={{ mb: 2}}
                            id="planetId"
                            options={planets}
                            getOptionLabel={(option) => `${option.name}`}
                            renderInput={(params) => <TextField {...params} label="Planet" variant="outlined" />}
                            filterOptions={(x) => x}
                            onInputChange={handleInputChange}
                            onChange={(event, value) => {
                                if (value) {
                                    setPlanetId(value.id!);
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