import {Container, IconButton} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
export const PlanetStatistics = () => {

    return (
        <Container>
            <h1>Planet Statistics</h1>
            <IconButton
                component={Link}
                to={`/planets`}>
                <ArrowBackIcon/>
            </IconButton>
            <IconButton
                component={Link}
                to={`/planets/statistics/by-satellites`}>
                By Satellites
            </IconButton>
            <IconButton
                component={Link}
                to={`/planets/statistics/by-lifeForms`}>
                By Life Forms
            </IconButton>
        </Container>
    );
};