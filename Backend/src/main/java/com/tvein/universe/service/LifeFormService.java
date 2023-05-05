package com.tvein.universe.service;

import com.tvein.universe.Pagination;
import com.tvein.universe.dto.LifeFormDTOConverter;
import com.tvein.universe.dto.LifeFormsNoPlanets;
import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.entity.PlanetLifeForm;
import com.tvein.universe.exception.LifeFormNotFoundException;
import com.tvein.universe.repository.LifeFormRepository;
import com.tvein.universe.repository.PlanetRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class LifeFormService implements ILifeFormService{

    private final LifeFormRepository lifeFormRepository;

    private final PlanetRepository planetRepository;

    @Override
    public LifeForm saveLifeForm(LifeForm lifeForm) {
        return lifeFormRepository.save(lifeForm);
    }

    @Override
    public LifeForm getLifeForm(Long id, Integer page, Integer pageSize) {
        Optional<LifeForm> lifeFormOptional = lifeFormRepository.findById(id);
        if(lifeFormOptional.isPresent()){
            LifeForm lifeForm = lifeFormOptional.get();
            List<PlanetLifeForm> oldPlanetLifeForms = lifeForm.getPlanetLifeForms();
            lifeForm.setPlanetLifeForms(Pagination.paginate(oldPlanetLifeForms, page, pageSize));
            return lifeForm;
        }else{
            throw new LifeFormNotFoundException(id);
        }
    }

    @Override
    public List<LifeFormsNoPlanets> getLifeForms(Integer page, Integer pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize, Sort.by("id"));

        return this.lifeFormRepository.findAll(pageable).getContent().stream().map(
                lifeForm -> LifeFormDTOConverter.convertToLifeFormDTONoPlanets(lifeForm,
                        planetRepository.countByPlanetLifeFormsLifeFormId(lifeForm.getId()))
        ).collect(Collectors.toList());
    }

    @Override
    public List<LifeForm> getLifeFormsMatching(String query) {
        return lifeFormRepository.findTop20ByQuery(query);
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