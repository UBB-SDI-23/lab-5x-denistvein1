package com.tvein.universe.controller;

import com.tvein.universe.dto.LifeFormDTO;
import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.service.ILifeFormService;
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
@RequestMapping(path = "/api/lifeForms")
public class LifeFormController {

    private ILifeFormService lifeFormService;

    private ModelMapper modelMapper;

    @PostMapping
    public ResponseEntity<LifeForm> saveLifeForm(@Valid @RequestBody LifeForm lifeForm){
        return new ResponseEntity<>(lifeFormService.saveLifeForm(lifeForm), HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<LifeFormDTO> getLifeForm(@PathVariable Long id){
        LifeForm lifeForm = lifeFormService.getLifeForm(id);
        LifeFormDTO lifeFormDTO = modelMapper.map(lifeForm, LifeFormDTO.class);
        return new ResponseEntity<>(lifeFormDTO, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<LifeForm>> getLifeForms(@RequestParam(required = false) Optional<Integer> iq){
        List<LifeForm> lifeForms;
        if(iq.isPresent()){
            lifeForms = lifeFormService.getLifeFormsByIqGreaterThan(iq.get());
        }else{
            lifeForms = lifeFormService.getLifeForms();
        }
        return new ResponseEntity<>(lifeForms, HttpStatus.OK);
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
