package com.tvein.universe.controller;

import com.tvein.universe.entity.Satellite;
import com.tvein.universe.dto.SatelliteDTO;
import com.tvein.universe.service.ISatelliteService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@RequestMapping(path = "/api/satellites")
public class SatelliteController {

    private ISatelliteService satelliteService;

    private ModelMapper modelMapper;

    @PostMapping("/{planetId}")
    public ResponseEntity<Satellite> saveSatellite(@Valid @RequestBody Satellite satellite, @PathVariable Long planetId){
        return new ResponseEntity<>(satelliteService.saveSatellite(satellite, planetId), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Satellite> getSatellite(@PathVariable Long id){
        Satellite satellites = satelliteService.getSatellite(id);
        return new ResponseEntity<>(satellites, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<SatelliteDTO>> getSatellites(@RequestParam(required = false) Optional<Double> distance){
        List<SatelliteDTO> satellites;
        if(distance.isPresent()){
            satellites = satelliteService.getSatellitesByDistanceGreaterThan(distance.get()).stream()
                    .map(satellite -> modelMapper.map(satellite, SatelliteDTO.class)).collect(Collectors.toList());
        }else{
            satellites = satelliteService.getSatellites().stream()
                    .map(satellite -> modelMapper.map(satellite, SatelliteDTO.class)).collect(Collectors.toList());
        }
        return new ResponseEntity<>(satellites, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Satellite> updateSatellite(@Valid @RequestBody Satellite satellite, @PathVariable Long id){
        return new ResponseEntity<>(satelliteService.updateSatellite(satellite, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteSatellite(@PathVariable Long id){
        satelliteService.deleteSatellite(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
