package com.tvein.universe.service;

import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.exception.LifeFormNotFoundException;
import com.tvein.universe.repository.LifeFormRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
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
    public LifeForm getLifeForm(Long id) {
        Optional<LifeForm> lifeFormOptional = lifeFormRepository.findById(id);
        if(lifeFormOptional.isPresent()){
            return lifeFormOptional.get();
        }else{
            throw new LifeFormNotFoundException(id);
        }
    }

    @Override
    public List<LifeForm> getLifeFormsByIqGreaterThan(int iq) {
        return lifeFormRepository.findByIqGreaterThan(iq);
    }

    @Override
    public List<LifeForm> getLifeForms() {
        return lifeFormRepository.findAll();
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
}