import {
	CircularProgress,
	Container,
	IconButton,
	Tooltip,
    Pagination
} from "@mui/material";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BACKEND_API_URL, ERROR_MESSAGE, SEVERITY_ERROR, SHOW_NOTIFICATION } from "../../constants";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { LifeFormDTO } from "../../models/dtos/LifeFormDTO";

interface PageState{
    isLoading: boolean,
    data: LifeFormDTO[],
    total: number,
    page: number,
    pageSize: number
};

export const AllLifeForms = () => {
    const [pageState, setPageState] = useState<PageState>({
        isLoading: false,
        data: [],
        total: 0,
        page: 0,
        pageSize: 25
    });

    useEffect(() => {
        const fetchLifeForms = async () => {
            try{
                setPageState(old => ({...old, isLoading: true }))
                const responseLifeForms = await axios.get(`${BACKEND_API_URL}/lifeForms?page=${pageState.page}&pageSize=${pageState.pageSize}`);
                const responseRowCount = await axios.get(`${BACKEND_API_URL}/lifeForms/size`);
                const lifeForms = await responseLifeForms.data;
                const rowCount = await responseRowCount.data;
                setPageState(old => ({...old, isLoading: false, data: lifeForms, total: rowCount}));
            }catch(e){
                PubSub.publish(SHOW_NOTIFICATION, {msg: ERROR_MESSAGE, severity: SEVERITY_ERROR});
            }
        };
        fetchLifeForms();
    }, [pageState.page, pageState.pageSize]);

    const columns: GridColDef[] = [
        {field: "index", headerName: "#", width: 100},
        {field: "name", headerName: "Name", width: 150},
        {field: "iq", headerName: "Iq", width: 150},
        {field: "energyUse", headerName: "Energy Use", width: 150},
        {field: "friendly", headerName: "Friendly", width: 150},
        {field: "conscious", headerName: "Conscious", width: 150},
        {field: "planetsSize", headerName: "No. Planets", width: 150},
        {field: "operations", headerName: "Operations", width: 150, renderCell: (params) => {
            return (
                <div>
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
                </div>
            );
        }},
    ];

    const rows = pageState.data.map((lifeForm: LifeFormDTO, index: number) => ({
        index: pageState.page * pageState.pageSize + index + 1,
        ...lifeForm
    }));

    const handlePageChange = (event: any, value: number) => {
        setPageState(old => ({ ...old, page: value - 1 }));
    };

    return (
        <Container>
            <h1>All Life Forms</h1>
            {pageState.isLoading && <CircularProgress/>}
            {!pageState.isLoading && pageState.data.length === 0 && <p>No Life Forms found</p>}
            {!pageState.isLoading && (
				<IconButton component={Link} sx={{ mr: 3 }} to={`/lifeForms/add`}>
					<Tooltip title="Add a new life form" arrow>
						<AddIcon color="primary"/>
					</Tooltip>
				</IconButton>
			)}
            {!pageState.isLoading && pageState.data.length > 0 && (
                <div>
                    <DataGrid 
                        sx={{ width: 1000, height: 600 }}
                        columns={columns}
                        rowCount={pageState.total}
                        loading={pageState.isLoading}
                        pagination
                        page={pageState.page}
                        pageSize={pageState.pageSize}
                        hideFooter={true}
                        paginationMode="server"
                        rows={rows}                
                    />
                    <Pagination
                        count={Math.ceil(pageState.total / pageState.pageSize)}
                        page={pageState.page + 1}
                        onChange={handlePageChange}
                    />
                </div>
            )}
        </Container>
    );
};