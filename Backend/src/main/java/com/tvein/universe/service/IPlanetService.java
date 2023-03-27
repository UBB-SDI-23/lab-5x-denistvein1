package com.tvein.universe.service;

import com.tvein.universe.dto.BulkAddDto;
import com.tvein.universe.entity.Planet;
import com.tvein.universe.entity.Satellite;
import org.springframework.data.util.Pair;

import java.util.List;

public interface IPlanetService {

    Planet savePlanet(Planet planet);

    Planet getPlanet(Long id);

    List<Planet> getPlanetsByRadiusGreaterThan(double radius);

    List<Planet> getPlanets();

    Planet updatePlanet(Planet planet, Long id);

    void deletePlanet(Long id);

    List<Pair<Planet, Satellite>> getPlanetsWithBiggestSatellite();

    List<Pair<Planet, Double>>  getPlanetsByAverageLifeFormIq();

    void bulkAddSatellites(Long planetId, List<BulkAddDto> listIds);
}
