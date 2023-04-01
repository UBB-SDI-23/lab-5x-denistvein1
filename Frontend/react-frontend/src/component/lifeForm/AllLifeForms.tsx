import {
	TableContainer,
	Paper,
	Table,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LifeForm } from "../../models/LifeForm";

export const AllLifeForms = () => {
    const [loading, setLoading] = useState(false);
    const [lifeForms, setLifeForms] = useState<LifeForm[]>([]);

    useEffect(() => {
        const fetchLifeForms = async () => {
            setLoading(true);
            const response = await fetch(`${BACKEND_API_URL}/lifeForms`);
			const lifeForms = await response.json();
            setLifeForms(lifeForms);
            setLoading(false);
        };
        fetchLifeForms();
    }, []);

    return (
        <Container>
            <h1>All Life Forms</h1>
            {loading && <CircularProgress/>}
            {!loading && lifeForms.length === 0 && <p>No Life Forms found</p>}
            {!loading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/add`}>
					<Tooltip title="Add a new life form" arrow>
						<AddIcon color="primary"/>
					</Tooltip>
				</IconButton>
			)}
            {!loading && lifeForms.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">#</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Iq</TableCell>
                                <TableCell align="center">Lifespan</TableCell>
                                <TableCell align="center">Energy Use</TableCell>
                                <TableCell align="center">Friendly</TableCell>
                                <TableCell align="center">Conscious</TableCell>
								<TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {lifeForms.map((lifeForm: LifeForm, index: number) => (
                                <TableRow key={lifeForm.id}>
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="center">
                                        <Link to={`/lifeForms/${lifeForm.id}/details`} title="View life form details">
                                            {lifeForm.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="center">{lifeForm.iq}</TableCell>
                                    <TableCell align="center">{lifeForm.lifeSpan}</TableCell>
                                    <TableCell align="center">{lifeForm.energyUse}</TableCell>
                                    <TableCell align="center">{lifeForm.friendly}</TableCell>
                                    <TableCell align="center">{lifeForm.conscious}</TableCell>
                                    <TableCell align="center">
                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeForm.id}/details`}>
											<Tooltip title="View life form details" arrow>
												<ReadMoreIcon color="primary"/>
											</Tooltip>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeForm.id}/edit`}>
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/${lifeForm.id}/delete`}>
                                            <DeleteForeverIcon sx={{ color: "red" }}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};