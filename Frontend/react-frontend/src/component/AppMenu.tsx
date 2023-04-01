import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<IconButton
						component={Link}
						to="/"
						size="large"
						edge="start"
						color="inherit"
						aria-label="school"
						sx={{ mr: 2 }}>
						<SchoolIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Universe
					</Typography>
					<Button
						variant={path.startsWith("/planets") ? "outlined" : "text"}
						to="/planets"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon/>}>
						Planets
					</Button>
					<Button 
						variant={path.startsWith("/satellites") ? "outlined" : "text"}
						to="/satellites"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon/>}>
						Satellites
					</Button>
					<Button
						variant={path.startsWith("/lifeForms") ? "outlined" : "text"}
						to="/lifeForms"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon/>}>
						Life forms
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};
