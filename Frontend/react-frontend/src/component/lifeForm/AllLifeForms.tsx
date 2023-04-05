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
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { LifeForm } from "../../models/LifeForm";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export const AllLifeForms = () => {
    const [loading, setLoading] = useState(false);
    const [lifeForms, setLifeForms] = useState<LifeForm[]>([]);

    useEffect(() => {
        const fetchLifeForms = async () => {
            setLoading(true);
            try{
                const response = await fetch(`${BACKEND_API_URL}/lifeForms`);
                const lifeForms = await response.json();
                setLifeForms(lifeForms);
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
            setLoading(false);
        };
        fetchLifeForms();
    }, []);

    const columns: GridColDef[] = [
        {field: "index", headerName: "#", width: 100},
        {field: "name", headerName: "Name", width: 150},
        {field: "iq", headerName: "Iq", width: 150},
        {field: "energyUse", headerName: "Energy Use", width: 150},
        {field: "friendly", headerName: "Friendly", width: 150},
        {field: "conscious", headerName: "Conscious", width: 150},
        {field: "operations", headerName: "Operations", width: 150, renderCell: (params) => {
            return (
                <>
                    <IconButton component={Link} to={`/lifeForms/${params.id}/details`}>
                        <Tooltip title="View life form details" arrow>
                            <ReadMoreIcon color="primary"/>
                        </Tooltip>
                    </IconButton>

                    <IconButton component={Link} to={`/lifeForms/${params.id}/edit`}>
                        <EditIcon/>
                    </IconButton>

                    <IconButton component={Link} to={`/lifeForms/${params.id}/delete`}>
                        <DeleteForeverIcon sx={{ color: "red" }}/>
                    </IconButton>
                </>
            );
        }},
    ];

    const rows = lifeForms.map((lifeForm: LifeForm, index: number) => ({...lifeForm, index: index + 1}));

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
                <DataGrid 
                    sx={{ width: 1002, height: 600 }}
                    columns={columns}
                    rows={rows}                
                />
            )}
        </Container>
    );
};