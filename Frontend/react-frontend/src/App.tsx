import './App.css';
import { AllPlanets } from './component/planet/AllPlanets';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AddPlanet } from './component/planet/AddPlanet';
import { AppMenu } from './component/AppMenu';
import { AppHome } from './component/AppHome';
import { DeletePlanet } from './component/planet/DeletePlanet';
import { PlanetDetails } from './component/planet/PlanetDetails';
import { AllSatellites } from './component/satellite/AllSatellites';
import { AddSatellite } from './component/satellite/AddSatellite';
import { DeleteSatellite } from './component/satellite/DeleteSatellite';
import { SatelliteDetails } from './component/satellite/SatelliteDetails';
import { AllLifeForms } from './component/lifeForm/AllLifeForms';
import { AddLifeForm } from './component/lifeForm/AddLifeForm';
import { DeleteLifeForm } from './component/lifeForm/DeleteLifeForm';
import { LifeFormDetails } from './component/lifeForm/LifeFormDetails';
import { UpdatePlanet } from './component/planet/UpdatePlanet';
import { UpdateSatellite } from './component/satellite/UpdateSatellite';
import { UpdateLifeForm } from './component/lifeForm/UpdateLifeForm';
import { NotificationBar } from './component/NotificationBar';
import { PlanetStatistics } from './component/statistics/planetStatistics/PlanetStatistics';
import { BySatellites } from './component/statistics/planetStatistics/BySatellites';
import { ByLifeForms } from './component/statistics/planetStatistics/ByLifeForms';
import { AttachLifeForm } from './component/planet/AttachLifeForm';
import { AttachPlanet } from './component/lifeForm/AttachPlanet';

function App() {
	return (
		<React.Fragment>
			<Router>
				<AppMenu />
                <NotificationBar/>
				<Routes>
                    <Route path="/" element={<AppHome/>}/>
                    <Route path="/planets" element={<AllPlanets/>}/>
                    <Route path="/satellites" element={<AllSatellites/>}/>
                    <Route path="/lifeForms" element={<AllLifeForms/>}/>
                    <Route path="/planets/add" element={<AddPlanet/>}/>
                    <Route path="/planets/:planetId/addLifeForm" element={<AttachLifeForm/>}/>
                    <Route path="/planets/:planetId/delete" element={<DeletePlanet/>}/>
                    <Route path="/planets/:planetId/details" element={<PlanetDetails/>}/>
                    <Route path="/planets/:planetId/edit" element={<UpdatePlanet/>}/>
                    <Route path='/planets/statistics' element={<PlanetStatistics/>}/>
                    <Route path='/planets/statistics/by-satellites' element={<BySatellites/>}/>
                    <Route path='/planets/statistics/by-lifeForms' element={<ByLifeForms/>}/>
                    <Route path="/satellites/add" element={<AddSatellite/>}/>
                    <Route path="/satellites/:satelliteId/delete" element={<DeleteSatellite/>}/>
                    <Route path="/satellites/:satelliteId/details" element={<SatelliteDetails/>}/>
                    <Route path="/satellites/:satelliteId/edit" element={<UpdateSatellite/>}/>
                    <Route path="/lifeForms/add" element={<AddLifeForm/>}/>
                    <Route path="/lifeForms/:lifeFormId/addPlanet" element={<AttachPlanet/>}/>
                    <Route path="/lifeForms/:lifeFormId/delete" element={<DeleteLifeForm/>}/>
                    <Route path="/lifeForms/:lifeFormId/details" element={<LifeFormDetails/>}/>
                    <Route path="/lifeForms/:lifeFormId/edit" element={<UpdateLifeForm/>}/>
                </Routes>
			</Router>
		</React.Fragment>
	);
};

export default App;