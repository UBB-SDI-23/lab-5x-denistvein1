package com.tvein.universe.service;

import com.tvein.universe.Pagination;
import com.tvein.universe.dto.BulkAddDto;
import com.tvein.universe.dto.PlanetDTOConverter;
import com.tvein.universe.dto.PlanetDTONoSatellites;
import com.tvein.universe.dto.statistics.StatisticsPlanetLifeFormsDTO;
import com.tvein.universe.dto.statistics.StatisticsPlanetSatellitesDTO;
import com.tvein.universe.entity.Planet;
import com.tvein.universe.entity.PlanetLifeForm;
import com.tvein.universe.entity.Satellite;
import com.tvein.universe.exception.LifeFormNotFoundException;
import com.tvein.universe.exception.PlanetNotFoundException;
import com.tvein.universe.repository.PlanetRepository;
import com.tvein.universe.repository.SatelliteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PlanetService implements IPlanetService{

    private final PlanetRepository planetRepository;

    private final SatelliteRepository satelliteRepository;

    @Override
    public Planet savePlanet(Planet planet) {
        return planetRepository.save(planet);
    }

    @Override
    public Planet getPlanet(Long id, Integer satellitesPage, Integer satellitesPageSize, Integer lifeFormsPage, Integer lifeFormsPageSize) {
        Optional<Planet> planetOptional = planetRepository.findById(id);
        if(planetOptional.isPresent()){
            Planet planet = planetOptional.get();
            List<Satellite> oldSatellites = planet.getSatellites();
            List<PlanetLifeForm> oldPlanetLifeForms = planet.getPlanetLifeForms();
            planet.setSatellites(Pagination.paginate(oldSatellites, satellitesPage, satellitesPageSize));
            planet.setPlanetLifeForms(Pagination.paginate(oldPlanetLifeForms, lifeFormsPage, lifeFormsPageSize));
            return planet;
        }else{
            throw new LifeFormNotFoundException(id);
        }
    }

    @Override
    public List<PlanetDTONoSatellites> getPlanetsByRadiusGreaterThan(Integer page, Integer pageSize, Double radius) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id"));

        return planetRepository.findByRadiusGreaterThan(radius, pageable).stream().map(
                planet -> PlanetDTOConverter.convertToPlanetDTONoLifeForms(planet,
                        satelliteRepository.countByPlanetId(planet.getId()))
        ).collect(Collectors.toList());
    }

    @Override
    public List<PlanetDTONoSatellites> getPlanets(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id"));

        return planetRepository.findAll(pageable).getContent().stream().map(
                planet -> PlanetDTOConverter.convertToPlanetDTONoLifeForms(planet,
                        satelliteRepository.countByPlanetId(planet.getId()))
        ).collect(Collectors.toList());
    }

    @Override
    public List<Planet> getPlanetsMatching(String query) {
        return planetRepository.findTop20ByQuery(query);
    }

    @Override
    public Planet updatePlanet(Planet planet, Long id) {
        Optional<Planet> planetOptional = planetRepository.findById(id);
        if(planetOptional.isPresent()){
            Planet oldPlanet = planetOptional.get();
            BeanUtils.copyProperties(planet, oldPlanet, "id", "satellites");
            return planetRepository.save(oldPlanet);
        }else{
            throw new PlanetNotFoundException(id);
        }
    }

    @Override
    public void deletePlanet(Long id) {
        if(planetRepository.findById(id).isPresent()){
            planetRepository.deleteById(id);
        }else{
            throw new EmptyResultDataAccessException(1);
        }
    }

    @Override
    public List<StatisticsPlanetSatellitesDTO> getPlanetsBySatellites(Integer page, Integer pageSize) {
        return Pagination.paginate(planetRepository.findAllByOrderBySatellitesDesc(), page, pageSize);
    }

    @Override
    public Integer getPlanetsBySatellitesSize() {
        return planetRepository.findAllByOrderBySatellitesDesc().size();
    }

    @Override
    public List<StatisticsPlanetLifeFormsDTO> getPlanetsByLifeForms(Integer page, Integer pageSize) {
        return Pagination.paginate(planetRepository.findAllByOrderByPlanetLifeFormsDesc(), page, pageSize);
    }

    @Override
    public Integer getPlanetsByLifeFormsSize() {
        return planetRepository.findAllByOrderByPlanetLifeFormsDesc().size();
    }

    @Override
    public void bulkAddSatellites(Long planetId, List<BulkAddDto> listIds) {
        Optional<Planet> planetOptional = planetRepository.findById(planetId);
        if(planetOptional.isPresent()){
            Planet planet = planetOptional.get();
            for (BulkAddDto bulkDto : listIds){
                Optional<Satellite> satelliteOptional = satelliteRepository.findById(bulkDto.getIdSatellite());
                if(satelliteOptional.isPresent()) {
                    Satellite satellite = satelliteOptional.get();
                    satellite.setPlanet(planet);
                    satelliteRepository.save(satellite);
                }
            }
        }else{
            throw new PlanetNotFoundException(planetId);
        }
    }

    @Override
    public long totalSatellites(Long id) {
        Optional<Planet> planetOptional = planetRepository.findById(id);
        if(planetOptional.isPresent()){
            Planet planet = planetOptional.get();
            return planet.getSatellites().size();
        }else{
            throw new PlanetNotFoundException(id);
        }
    }

    @Override
    public long totalLifeForms(Long id) {
        Optional<Planet> planetOptional = planetRepository.findById(id);
        if(planetOptional.isPresent()){
            Planet planet = planetOptional.get();
            return planet.getPlanetLifeForms().size();
        }else{
            throw new PlanetNotFoundException(id);
        }
    }

    @Override
    public long total() {
        return planetRepository.count();
    }

    @Override
    public long total(Double radius) {
        return planetRepository.countByRadiusGreaterThan(radius);
    }
}