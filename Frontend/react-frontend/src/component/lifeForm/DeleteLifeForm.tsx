import { Button, Card, CardActions, CardContent, Container, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom"
import { BACKEND_API_URL } from "../../constants";

export const DeleteLifeForm = () => {
    const { lifeFormId } = useParams();
    const navigate = useNavigate();

    const handleDelete = async (event: { preventDefault: () => void}) => {
        event.preventDefault();
        await axios.delete(`${BACKEND_API_URL}/lifeForms/${lifeFormId}`);
        navigate("/lifeForms");
    };

    const handleCancel = (event: {preventDefault: () => void}) => {
        event.preventDefault();
        navigate("/lifeForms");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms`}>
                        <ArrowBackIcon/>
                    </IconButton>
                    Are you sure you want to delete this life form?
                </CardContent>
                <CardActions>
                    <Button onClick={handleDelete}>Delete it</Button>
                    <Button onClick={handleCancel}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
};