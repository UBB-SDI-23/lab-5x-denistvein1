package com.tvein.universe.service;

import com.tvein.universe.dto.BulkAddDto;
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
import org.springframework.data.util.Pair;
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
    public Planet getPlanet(Long id, int satellitesPageNumber, int satellitesPageSize, int lifeFormsPageNumber, int lifeFormsPageSize) {
        Optional<Planet> planetOptional = planetRepository.findById(id);
        if(planetOptional.isPresent()){
            Planet planet = planetOptional.get();
            List<Satellite> oldSatellites = planet.getSatellites();
            List<PlanetLifeForm> oldPlanetLifeForms = planet.getPlanetLifeForms();
            int sizeSatellites = oldSatellites.size();
            int sizePlanetLifeForms = oldPlanetLifeForms.size();
            List<Satellite> newSatellites = new ArrayList<>();
            List<PlanetLifeForm> newPlanetLifeForms = new ArrayList<>();

            if(sizeSatellites >= satellitesPageNumber * satellitesPageSize){
                if(sizeSatellites > (satellitesPageNumber + 1) * satellitesPageSize - 1){
                    newSatellites = oldSatellites.subList(satellitesPageNumber * satellitesPageSize, (satellitesPageNumber + 1) * satellitesPageSize);
                }else{
                    newSatellites = oldSatellites.subList(satellitesPageNumber * satellitesPageSize, sizeSatellites);
                }
            }
            if(sizePlanetLifeForms >= lifeFormsPageNumber * lifeFormsPageSize){
                if(sizePlanetLifeForms > (lifeFormsPageNumber + 1) * lifeFormsPageSize - 1){
                    newPlanetLifeForms = oldPlanetLifeForms.subList(lifeFormsPageNumber * lifeFormsPageSize, (lifeFormsPageNumber + 1) * lifeFormsPageSize);
                }else{
                    newPlanetLifeForms = oldPlanetLifeForms.subList(lifeFormsPageNumber * lifeFormsPageSize, sizePlanetLifeForms);
                }
            }
            planet.setSatellites(newSatellites);
            planet.setPlanetLifeForms(newPlanetLifeForms);
            return planet;
        }else{
            throw new LifeFormNotFoundException(id);
        }
    }

    @Override
    public List<Planet> getPlanetsByRadiusGreaterThan(int pageNumber, int pageSize, double radius) {
        return planetRepository.findByRadiusGreaterThan(radius, PageRequest.of(pageNumber, pageSize));
    }

    @Override
    public List<Planet> getPlanets(int pageNumber, int pageSIze) {
        return planetRepository.findAll(PageRequest.of(pageNumber, pageSIze)).getContent();
    }

    @Override
    public List<Planet> getPlanetsMatching(String query) {
        return planetRepository.findAll().stream()
                .filter(planet -> planet.getName().matches("^" + query + ".*"))
                .limit(20)
                .collect(Collectors.toList());
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
    public List<Pair<Planet, Satellite>> getPlanetsWithBiggestSatellite(int pageNumber, int pageSize) {
        List<Pair<Planet, Satellite>> result = new ArrayList<>();
        planetRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent()
            .forEach(planet -> planet.getSatellites().stream().max(Comparator.comparingDouble(Satellite::getRadius))
            .ifPresent(satellite -> result.add(Pair.of(planet, satellite))));
        return result;
    }

    @Override
    public List<Pair<Planet, Double>> getPlanetsByAverageLifeFormIq(int pageNumber, int pageSize) {
        return planetRepository.findAll(PageRequest.of(pageNumber, pageSize)).stream()
            .map(planet -> Pair.of(planet, planet.getPlanetLifeForms().stream()
            .mapToInt(planetLifeForm ->planetLifeForm.getLifeForm().getIq()).average().stream().findFirst().orElse(0)))
            .collect(Collectors.toList());
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
    public long total(Long id, String list) {
        Optional<Planet> planetOptional = planetRepository.findById(id);
        if(planetOptional.isPresent()){
            Planet planet = planetOptional.get();
            if(list.equals("satellites")){
                return planet.getSatellites().size();
            }else if(list.equals("lifeForms")){
                return planet.getPlanetLifeForms().size();
            }else{
                throw new RuntimeException("Planet does not a list of: " + list);
            }
        }else{
            throw new PlanetNotFoundException(id);
        }
    }

    @Override
    public long total() {
        return planetRepository.count();
    }
}