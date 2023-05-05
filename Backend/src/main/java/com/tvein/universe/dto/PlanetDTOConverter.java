package com.tvein.universe.dto;

import com.tvein.universe.entity.Planet;

public class PlanetDTOConverter {

    public static PlanetDTONoSatellites convertToPlanetDTONoLifeForms(Planet planet, Long noSatellites){
        PlanetDTONoSatellites planetDTONoLifeForms = new PlanetDTONoSatellites();
        planetDTONoLifeForms.setId(planet.getId());
        planetDTONoLifeForms.setName(planet.getName());
        planetDTONoLifeForms.setRadius(planet.getRadius());
        planetDTONoLifeForms.setTemperature(planet.getTemperature());
        planetDTONoLifeForms.setGravity(planet.getGravity());
        planetDTONoLifeForms.setEscapeVelocity(planet.getEscapeVelocity());
        planetDTONoLifeForms.setOrbitalPeriod(planet.getOrbitalPeriod());
        planetDTONoLifeForms.setSatellitesSize(noSatellites);
        return planetDTONoLifeForms;
    }
}
