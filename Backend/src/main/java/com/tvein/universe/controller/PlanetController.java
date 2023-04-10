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
    private final IPlanetService planetService;
    private final IPlanetLifeFormService planetLifeFormService;
    private final ModelMapper modelMapper;

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

    @GetMapping("/{id}/size")
    public ResponseEntity<Long> getSize(@PathVariable Long id, @RequestParam String list){
        return new ResponseEntity<>(planetService.total(id, list), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlanetDTO> getPlanet(@PathVariable Long id, @RequestParam(defaultValue = "0") int satellitesPageNumber,
        @RequestParam(defaultValue = "1") int satellitesPageSize, @RequestParam(defaultValue = "0") int lifeFormsPageNumber, @RequestParam(defaultValue = "1") int lifeFormsPageSize){
        Planet planet = planetService.getPlanet(id, satellitesPageNumber, satellitesPageSize, lifeFormsPageNumber, lifeFormsPageSize);
        PlanetDTO planetDTO = modelMapper.map(planet, PlanetDTO.class);
        return new ResponseEntity<>(planetDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Planet>> getPlanets(@RequestParam int pageNumber, @RequestParam int pageSize, @RequestParam(required = false) Optional<Double> radius) {
        List<Planet> planets;
        if (radius.isPresent()) {
            planets = planetService.getPlanetsByRadiusGreaterThan(pageNumber, pageSize, radius.get());
        } else {
            planets = planetService.getPlanets(pageNumber, pageSize);
        }
        return new ResponseEntity<>(planets, HttpStatus.OK);
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<Planet>> getPlanets(@RequestParam String query) {
        return new ResponseEntity<>(planetService.getPlanetsMatching(query), HttpStatus.OK);
    }

    @GetMapping("/by-biggest-satellites")
    public ResponseEntity<List<ReportPlanetSatelliteDTO>> getReportSatellite(@RequestParam int pageNumber, @RequestParam int pageSize){
        List<ReportPlanetSatelliteDTO> report = planetService.getPlanetsWithBiggestSatellite(pageNumber, pageSize).stream()
                .map(pair -> new ReportPlanetSatelliteDTO(pair.getFirst().getName(), pair.getSecond().getName(), pair.getSecond().getRadius()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping("/by-avg-lifeForm-iq")
    public ResponseEntity<List<ReportPlanetLifeFormDTO>> getReportLifeForm(@RequestParam int pageNumber, @RequestParam int pageSize){
        List<ReportPlanetLifeFormDTO> report = planetService.getPlanetsByAverageLifeFormIq(pageNumber, pageSize).stream()
                .map(pair -> new ReportPlanetLifeFormDTO(pair.getFirst().getName(), pair.getSecond()))
                .collect(Collectors.toList());
        return new ResponseEntity<>(report, HttpStatus.OK);
    }

    @GetMapping("/size")
    public ResponseEntity<Long> getSize(){
        return new ResponseEntity<>(planetService.total(), HttpStatus.OK);
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
