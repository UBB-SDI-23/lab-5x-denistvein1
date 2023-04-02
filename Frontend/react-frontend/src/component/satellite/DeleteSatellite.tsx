import { Button, Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SEVERITY_SUCCESS, SHOW_NOTIFICATION } from "../../constants";

export const DeleteSatellite = () => {
    const { satelliteId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        try{
            await axios.delete(`${BACKEND_API_URL}/satellites/${satelliteId}`);
            PubSub.publish(SHOW_NOTIFICATION, {msg: "Satellite deleted sucessfully!", severity: SEVERITY_SUCCESS});
            navigate("/satellites");
        }catch(e){
            PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
        }
    };

    const handleCancel = (event: {preventDefault: () => void}) => {
        event.preventDefault();
        navigate("/satellites");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/satellites`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    Are you sure you want to delete this planet?
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};