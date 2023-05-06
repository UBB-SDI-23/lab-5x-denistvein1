package com.tvein.universe.service;

import com.tvein.universe.entity.Planet;
import com.tvein.universe.entity.Satellite;
import com.tvein.universe.exception.PlanetNotFoundException;
import com.tvein.universe.exception.SatelliteNotFoundException;
import com.tvein.universe.repository.PlanetRepository;
import com.tvein.universe.repository.SatelliteRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SatelliteService implements ISatelliteService{

    private final SatelliteRepository satelliteRepository;
    private final PlanetRepository planetRepository;

    @Override
    public Satellite saveSatellite(Satellite satellite, Long planetId) {
        Optional<Planet> planetOptional = planetRepository.findById(planetId);
        if(planetOptional.isPresent()){
            satellite.setPlanet(planetOptional.get());
            return satelliteRepository.save(satellite);
        }else{
            throw new PlanetNotFoundException(planetId);
        }
    }

    @Override
    public Satellite getSatellite(Long id) {
        Optional<Satellite> satelliteOptional = satelliteRepository.findById(id);
        if(satelliteOptional.isPresent()){
            return satelliteOptional.get();
        }else{
            throw new SatelliteNotFoundException(id);
        }
    }

    @Override
    public List<Satellite> getSatellites(Integer page, Integer pageSize) {
        return satelliteRepository.findAll(PageRequest.of(page, pageSize, Sort.by("id"))).getContent();
    }

    @Override
    public Satellite updateSatellite(Satellite satellite, Long id) {
        Optional<Satellite> satelliteOptional = satelliteRepository.findById(id);
        if(satelliteOptional.isPresent()){
            Satellite oldSatellite = satelliteOptional.get();
            BeanUtils.copyProperties(satellite, oldSatellite, "id");
            return satelliteRepository.save(oldSatellite);
        }else{
            throw new SatelliteNotFoundException(id);
        }
    }

    @Override
    public void deleteSatellite(Long id) {
        if(satelliteRepository.findById(id).isPresent()){
            satelliteRepository.deleteById(id);
        }else{
            throw new EmptyResultDataAccessException(1);
        }
    }

    @Override
    public long total() {
        return satelliteRepository.count();
    }
}
