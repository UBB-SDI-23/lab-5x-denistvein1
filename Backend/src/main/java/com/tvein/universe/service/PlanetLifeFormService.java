package com.tvein.universe.service;

import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.entity.Planet;
import com.tvein.universe.entity.PlanetLifeForm;
import com.tvein.universe.entity.PlanetLifeFormKey;
import com.tvein.universe.exception.LifeFormNotFoundException;
import com.tvein.universe.exception.PlanetLifeFormAlreadyExistsException;
import com.tvein.universe.exception.PlanetNotFoundException;
import com.tvein.universe.repository.LifeFormRepository;
import com.tvein.universe.repository.PlanetLifeFormRepository;
import com.tvein.universe.repository.PlanetRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class PlanetLifeFormService implements IPlanetLifeFormService{

    private PlanetLifeFormRepository planetLifeFormRepository;
    private PlanetRepository planetRepository;
    private LifeFormRepository lifeFormRepository;

    @Override
    public PlanetLifeForm savePlanetLifeForm(PlanetLifeForm planetLifeForm, Long planetId, Long lifeFormId) {
        if(planetLifeFormRepository.findByIdPlanetIdAndLifeFormId(planetId, lifeFormId).isPresent()){
            throw new PlanetLifeFormAlreadyExistsException(planetId, lifeFormId);
        }
        Optional<Planet> planetOptional = planetRepository.findById(planetId);
        Optional<LifeForm> lifeFormOptional = lifeFormRepository.findById(lifeFormId);
        if(planetOptional.isEmpty()){
            throw new PlanetNotFoundException(planetId);
        }else if(lifeFormOptional.isEmpty()){
            throw new LifeFormNotFoundException(lifeFormId);
        }else{
            planetLifeForm.setPlanet(planetOptional.get());
            planetLifeForm.setLifeForm(lifeFormOptional.get());
            planetLifeForm.setId(new PlanetLifeFormKey(planetId, lifeFormId));
            return planetLifeFormRepository.save(planetLifeForm);
        }
    }
}
