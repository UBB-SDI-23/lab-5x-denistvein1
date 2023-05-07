package com.tvein.universe.controller;

import com.tvein.universe.dto.LifeFormDTO;
import com.tvein.universe.dto.LifeFormsNoPlanets;
import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.service.ILifeFormService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = {"https://universe-mpp.netlify.app"}, allowCredentials = "true")
@RequestMapping(path = "/api/lifeForms")
public class LifeFormController {

    private final ILifeFormService lifeFormService;

    private final ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<LifeForm> saveLifeForm(@Valid @RequestBody LifeForm lifeForm){
        return new ResponseEntity<>(lifeFormService.saveLifeForm(lifeForm), HttpStatus.CREATED);
    }

    @GetMapping("/autocomplete")
    public ResponseEntity<List<LifeForm>> getPlanets(@RequestParam String query) {
        return new ResponseEntity<>(lifeFormService.getLifeFormsMatching(query), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LifeFormDTO> getLifeForm(@PathVariable Long id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "1") Integer pageSize){
        LifeForm lifeForm = lifeFormService.getLifeForm(id, page, pageSize);
        LifeFormDTO lifeFormDTO = modelMapper.map(lifeForm, LifeFormDTO.class);
        return new ResponseEntity<>(lifeFormDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}/size")
    public ResponseEntity<Long> getSize(@PathVariable Long id){
        return new ResponseEntity<>(lifeFormService.total(id), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<LifeFormsNoPlanets>> getLifeForms(@RequestParam Integer page, @RequestParam Integer pageSize){
        return new ResponseEntity<>(lifeFormService.getLifeForms(page, pageSize), HttpStatus.OK);
    }

    @GetMapping("/size")
    public ResponseEntity<Long> getSize(){
        return new ResponseEntity<>(lifeFormService.total(), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LifeForm> updateLifeForm(@Valid @RequestBody LifeForm lifeForm, @PathVariable Long id){
        return new ResponseEntity<>(lifeFormService.updateLifeForm(lifeForm, id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteLifeForm(@PathVariable Long id){
        lifeFormService.deleteLifeForm(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
