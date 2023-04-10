package com.tvein.universe.service;

import com.tvein.universe.dto.BulkAddDto;
import com.tvein.universe.entity.Planet;
import com.tvein.universe.entity.Satellite;
import org.springframework.data.util.Pair;

import java.util.List;

public interface IPlanetService {

    Planet savePlanet(Planet planet);

    Planet getPlanet(Long id, int satellitesPageNumber, int satellitesPageSize, int lifeFormsPageNumber, int lifeFormsPageSize);

    List<Planet> getPlanetsByRadiusGreaterThan(int pageNumber, int pageSize, double radius);

    List<Planet> getPlanets(int pageNumber, int pageSIze);

    List<Planet> getPlanetsMatching(String query);

    Planet updatePlanet(Planet planet, Long id);

    void deletePlanet(Long id);

    List<Pair<Planet, Satellite>> getPlanetsWithBiggestSatellite(int pageNumber, int pageSize);

    List<Pair<Planet, Double>>  getPlanetsByAverageLifeFormIq(int pageNumber, int pageSize);

    void bulkAddSatellites(Long planetId, List<BulkAddDto> listIds);

    long total(Long id, String list);

    long total();
}
