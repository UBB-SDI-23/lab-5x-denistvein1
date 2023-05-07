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
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api")
public class SatelliteController {

    private final ISatelliteService satelliteService;

    private final ModelMapper modelMapper;

    @PostMapping("/satellites/{planetId}")
    public ResponseEntity<Satellite> saveSatellite(@Valid @RequestBody Satellite satellite, @PathVariable Long planetId){
        return new ResponseEntity<>(satelliteService.saveSatellite(satellite, planetId), HttpStatus.CREATED);
    }

    @GetMapping("/satellites/{id}")
    public ResponseEntity<Satellite> getSatellite(@PathVariable Long id){
        Satellite satellites = satelliteService.getSatellite(id);
        return new ResponseEntity<>(satellites, HttpStatus.OK);
    }

    @GetMapping("/satellites")
    public ResponseEntity<List<SatelliteDTO>> getSatellites(@RequestParam Integer page, @RequestParam Integer pageSize){
        List<SatelliteDTO> satellites= satelliteService.getSatellites(page, pageSize).stream()
                .map(satellite -> modelMapper.map(satellite, SatelliteDTO.class)).collect(Collectors.toList());
        return new ResponseEntity<>(satellites, HttpStatus.OK);
    }

    @GetMapping("/satellites/size")
    public ResponseEntity<Long> getSize(){
        return new ResponseEntity<>(satelliteService.total(), HttpStatus.OK);
    }

    @PutMapping("/satellites/{id}")
    public ResponseEntity<Satellite> updateSatellite(@Valid @RequestBody Satellite satellite, @PathVariable Long id){
        return new ResponseEntity<>(satelliteService.updateSatellite(satellite, id), HttpStatus.OK);
    }

    @DeleteMapping("/satellites/{id}")
    public ResponseEntity<HttpStatus> deleteSatellite(@PathVariable Long id){
        satelliteService.deleteSatellite(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
