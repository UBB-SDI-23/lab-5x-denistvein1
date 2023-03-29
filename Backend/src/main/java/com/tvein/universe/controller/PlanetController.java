package com.tvein.universe.controller;

import com.tvein.universe.dto.report.ReportPlanetLifeFormDTO;
import com.tvein.universe.dto.report.ReportPlanetSatelliteDTO;
import com.tvein.universe.dto.BulkAddDto;
import com.tvein.universe.entity.Planet;
import com.tvein.universe.dto.PlanetDTO;
import com.tvein.universe.entity.PlanetLifeForm;
import com.tvein.universe.service.IPlanetLifeFormService;
import com.tvein.universe.service.IPlanetService;
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
@CrossOrigin(origins = "*")
@RequestMapping(path = "/api/planets")
public class PlanetController {

    private IPlanetService planetService;
    private IPlanetLifeFormService planetLifeFormService;
    private ModelMapper modelMapper;

    @PostMapping("/{planetId}/lifeForms/{lifeFormId}")
    public ResponseEntity<PlanetLifeForm> savePlanetLifeForm(@Valid @RequestBody PlanetLifeForm planetLifeForm, @PathVariable Long planetId, @PathVariable Long lifeFormId){
        return new ResponseEntity<>(planetLifeFormService.savePlanetLifeForm(planetLifeForm, planetId, lifeFormId), HttpStatus.CREATED);
    }

    @PostMapping
    public ResponseEntity<Planet> savePlanet(@Valid @RequestBody Planet planet){
        return new ResponseEntity<>(planetService.savePlanet(planet), HttpStatus.CREATED);
    }

    @PostMapping("/{id}/satellites")
    public ResponseEntity<HttpStatus> bulkAddSatellites(@PathVariable Long id, @RequestBody List<BulkAddDto> listIds){
        planetService.bulkAddSatellites(id, listIds);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanetDTO> getPlanet(@PathVariable Long id){
        Planet planet = planetService.getPlanet(id);
        PlanetDTO planetDTO = modelMapper.map(planet, PlanetDTO.class);
        return new ResponseEntity<>(planetDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Planet>> getPlanets(@RequestParam(required = false) Optional<Double> radius){
        List<Planet> planets;
        if(radius.isPresent()){
            planets = planetService.getPlanetsByRadiusGreaterThan(radius.get());
        }else{
            planets = planetService.getPlanets();
        }
        return new ResponseEntity<>(planets, HttpStatus.OK);
    }

    @GetMapping("/by-biggest-satellites")
    public ResponseEntity<List<ReportPlanetSatelliteDTO>> getReportSatellite(){
        List<ReportPlanetSatelliteDTO> report = planetService.getPlanetsWithBiggestSatellite().stream()
                .map(pair -> new ReportPlanetSatelliteDTO(pair.getFirst().getName(), pair.getSecond().getRadius()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping("/by-avg-lifeForm-iq")
    public ResponseEntity<List<ReportPlanetLifeFormDTO>> getReportLifeForm(){
        List<ReportPlanetLifeFormDTO> report = planetService.getPlanetsByAverageLifeFormIq().stream()
                .map(pair -> new ReportPlanetLifeFormDTO(pair.getFirst().getName(), pair.getSecond()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Planet> updatePlanet(@Valid @RequestBody Planet planet, @PathVariable Long id){
        return new ResponseEntity<>(planetService.updatePlanet(planet, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deletePlanet(@PathVariable Long id){
        planetService.deletePlanet(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
