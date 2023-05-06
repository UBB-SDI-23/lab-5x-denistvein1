package com.tvein.universe.controller;

import com.tvein.universe.dto.BulkAddDto;
import com.tvein.universe.dto.PlanetDTONoSatellites;
import com.tvein.universe.dto.statistics.StatisticsPlanetLifeFormsDTO;
import com.tvein.universe.dto.statistics.StatisticsPlanetSatellitesDTO;
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

    @GetMapping("/{id}")
    public ResponseEntity<PlanetDTO> getPlanet(@PathVariable Long id, @RequestParam(defaultValue = "0") Integer satellitesPage,
        @RequestParam(defaultValue = "1") Integer satellitesPageSize, @RequestParam(defaultValue = "0") Integer lifeFormsPage, @RequestParam(defaultValue = "1") Integer lifeFormsPageSize){
        Planet planet = planetService.getPlanet(id, satellitesPage, satellitesPageSize, lifeFormsPage, lifeFormsPageSize);
        PlanetDTO planetDTO = modelMapper.map(planet, PlanetDTO.class);
        return new ResponseEntity<>(planetDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}/size/satellites")
    public ResponseEntity<Long> getSatellitesSize(@PathVariable Long id){
        return new ResponseEntity<>(planetService.totalSatellites(id), HttpStatus.OK);
    }

    @GetMapping("/{id}/size/lifeForms")
    public ResponseEntity<Long> getLifeFormsSize(@PathVariable Long id){
        return new ResponseEntity<>(planetService.totalLifeForms(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<PlanetDTONoSatellites>> getPlanets(@RequestParam Integer page, @RequestParam Integer pageSize, @RequestParam(required = false) Optional<Double> radius) {
        if (radius.isPresent()) {
            return new ResponseEntity<>(planetService.getPlanetsByRadiusGreaterThan(page, pageSize, radius.get()), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(planetService.getPlanets(page, pageSize), HttpStatus.OK);
        }
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<Planet>> getPlanets(@RequestParam String query) {
        return new ResponseEntity<>(planetService.getPlanetsMatching(query), HttpStatus.OK);
    }

    @GetMapping("/size")
    public ResponseEntity<Long> getSize(@RequestParam(required = false) Optional<Double> radius){
        if(radius.isPresent()){
            return new ResponseEntity<>(planetService.total(radius.get()), HttpStatus.OK);
        }else{
            return new ResponseEntity<>(planetService.total(), HttpStatus.OK);
        }
    }

    @GetMapping("/by-satellites")
    public ResponseEntity<List<StatisticsPlanetSatellitesDTO>> getStatisticsSatellites(@RequestParam Integer page, @RequestParam Integer pageSize){
        return new ResponseEntity<>(planetService.getPlanetsBySatellites(page, pageSize), HttpStatus.OK);
    }

    @GetMapping("/by-satellites/size")
    public ResponseEntity<Integer> getStatisticsSatellitesSize(){
        return new ResponseEntity<>(planetService.getPlanetsBySatellitesSize(), HttpStatus.OK);
    }

    @GetMapping("/by-life-forms")
    public ResponseEntity<List<StatisticsPlanetLifeFormsDTO>> getStatisticsLifeForms(@RequestParam Integer page, @RequestParam Integer pageSize){
        return new ResponseEntity<>(planetService.getPlanetsByLifeForms(page, pageSize), HttpStatus.OK);
    }

    @GetMapping("/by-life-forms/size")
    public ResponseEntity<Integer> getStatisticsLifeFormsSize(){
        return new ResponseEntity<>(planetService.getPlanetsByLifeFormsSize(), HttpStatus.OK);
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
