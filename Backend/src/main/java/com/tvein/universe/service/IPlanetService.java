package com.tvein.universe.service;

import com.tvein.universe.dto.BulkAddDto;
import com.tvein.universe.dto.PlanetDTONoSatellites;
import com.tvein.universe.dto.statistics.StatisticsPlanetLifeFormsDTO;
import com.tvein.universe.dto.statistics.StatisticsPlanetSatellitesDTO;
import com.tvein.universe.entity.Planet;

import java.util.List;

public interface IPlanetService {

    Planet savePlanet(Planet planet);

    Planet getPlanet(Long id, Integer satellitesPageNumber, Integer satellitesPageSize, Integer lifeFormsPageNumber, Integer lifeFormsPageSize);

    List<PlanetDTONoSatellites> getPlanetsByRadiusGreaterThan(Integer pageNumber, Integer pageSize, Double radius);

    List<PlanetDTONoSatellites> getPlanets(Integer pageNumber, Integer pageSize);

    List<Planet> getPlanetsMatching(String query);

    Planet updatePlanet(Planet planet, Long id);

    void deletePlanet(Long id);

    List<StatisticsPlanetSatellitesDTO> getPlanetsBySatellites(Integer pageNumber, Integer pageSize);

    List<StatisticsPlanetLifeFormsDTO>  getPlanetsByLifeForms(Integer pageNumber, Integer pageSize);

    void bulkAddSatellites(Long planetId, List<BulkAddDto> listIds);

    long totalSatellites(Long id);

    long totalLifeForms(Long id);

    long total();

    long total(Double radius);
}
