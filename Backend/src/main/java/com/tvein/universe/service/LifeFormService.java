package com.tvein.universe.service;

import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.entity.PlanetLifeForm;
import com.tvein.universe.exception.LifeFormNotFoundException;
import com.tvein.universe.repository.LifeFormRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class LifeFormService implements ILifeFormService{

    private final LifeFormRepository lifeFormRepository;

    @Override
    public LifeForm saveLifeForm(LifeForm lifeForm) {
        return lifeFormRepository.save(lifeForm);
    }

    @Override
    public LifeForm getLifeForm(Long id, int pageNumber, int pageSize) {
        Optional<LifeForm> lifeFormOptional = lifeFormRepository.findById(id);
        if(lifeFormOptional.isPresent()){
            LifeForm lifeForm = lifeFormOptional.get();
            List<PlanetLifeForm> oldPlanetLifeForms = lifeForm.getPlanetLifeForms();
            int size = oldPlanetLifeForms.size();
            List<PlanetLifeForm> newPlanetLifeForms = new ArrayList<>();

            if(size >= pageNumber * pageSize){
                if(size > (pageNumber + 1) * pageSize - 1){
                    newPlanetLifeForms = oldPlanetLifeForms.subList(pageNumber * pageSize, (pageNumber + 1) * pageSize);
                }else{
                    newPlanetLifeForms = oldPlanetLifeForms.subList(pageNumber * pageSize, size);
                }
            }
            lifeForm.setPlanetLifeForms(newPlanetLifeForms);
            return lifeForm;
        }else{
            throw new LifeFormNotFoundException(id);
        }
    }

    @Override
    public List<LifeForm> getLifeForms(int pageNumber, int pageSize) {
        return lifeFormRepository.findAll(PageRequest.of(pageNumber, pageSize)).getContent();
    }

    @Override
    public LifeForm updateLifeForm(LifeForm lifeForm, Long id) {
        Optional<LifeForm> lifeFormOptional = lifeFormRepository.findById(id);
        if(lifeFormOptional.isPresent()){
            LifeForm oldLifeForm = lifeFormOptional.get();
            BeanUtils.copyProperties(lifeForm, oldLifeForm, "id");
            return lifeFormRepository.save(oldLifeForm);
        }else{
            throw new LifeFormNotFoundException(id);
        }
    }

    @Override
    public void deleteLifeForm(Long id) {
        if(lifeFormRepository.findById(id).isPresent()){
            lifeFormRepository.deleteById(id);
        }else{
            throw new EmptyResultDataAccessException(1);
        }
    }

    @Override
    public long total(Long id) {
        Optional<LifeForm> lifeFormOptional = lifeFormRepository.findById(id);
        if(lifeFormOptional.isPresent()){
            return lifeFormOptional.get().getPlanetLifeForms().size();
        }else{
            throw new LifeFormNotFoundException(id);
        }
    }

    @Override
    public long total() {
        return lifeFormRepository.count();
    }
}