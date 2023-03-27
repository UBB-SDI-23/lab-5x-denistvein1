package com.tvein.universe.service;

import com.tvein.universe.entity.BulkAddDto;
import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.entity.Planet;
import com.tvein.universe.entity.Satellite;
import com.tvein.universe.exception.PlanetNotFoundException;
import com.tvein.universe.repository.PlanetRepository;
import com.tvein.universe.repository.SatelliteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
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
    public Planet getPlanet(Long id) {
        Optional<Planet> planetOptional = planetRepository.findById(id);
        if(planetOptional.isPresent()){
            return planetOptional.get();
        }else{
            throw new PlanetNotFoundException(id);
        }
    }

    @Override
    public List<Planet> getPlanetsByRadiusGreaterThan(double radius) {
        return planetRepository.findByRadiusGreaterThan(radius);
    }

    @Override
    public List<Planet> getPlanets() {
        return planetRepository.findAll();
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
    public List<Pair<Planet, Satellite>> getPlanetsWithBiggestSatellite() {
        List<Pair<Planet, Satellite>> result = new ArrayList<>();
        List<Planet> planets = planetRepository.findAll();
        planets.forEach(planet -> planet.getSatellites().stream().max(Comparator.comparingDouble(Satellite::getRadius))
                .ifPresent(satellite -> result.add(Pair.of(planet, satellite))));
        result.sort(Comparator.comparing(p -> p.getSecond().getRadius()));
        return result;
    }

    @Override
    public List<Pair<Planet, Double>> getPlanetsByAverageLifeFormIq() {
        List<Pair<Planet, List<LifeForm>>> result = new ArrayList<>();
        planetRepository.findAll()
                .forEach(planet -> {
                    result.add(Pair.of(planet, new ArrayList<>()));
                    planet.getPlanetLifeForms().forEach(planetLifeForm -> result.get(result.size() - 1).getSecond().add(planetLifeForm.getLifeForm()));
                });

        return result.stream()
                .map(pair -> Pair.of(pair.getFirst(), pair.getSecond().stream().mapToInt(LifeForm::getIq).average()
                .isPresent() ? pair.getSecond().stream().mapToInt(LifeForm::getIq).average().getAsDouble() : 0))
                .sorted(Comparator.comparing(Pair::getSecond))
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
}
