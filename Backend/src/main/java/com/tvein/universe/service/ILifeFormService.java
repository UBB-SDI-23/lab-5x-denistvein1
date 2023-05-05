package com.tvein.universe.service;

import com.tvein.universe.dto.LifeFormsNoPlanets;
import com.tvein.universe.entity.LifeForm;

import java.util.List;

public interface ILifeFormService {

    LifeForm saveLifeForm(LifeForm lifeForm);

    LifeForm getLifeForm(Long id, Integer page, Integer pageSize);

    List<LifeFormsNoPlanets> getLifeForms(Integer page, Integer pageSize);

    LifeForm updateLifeForm(LifeForm lifeForm, Long id);

    void deleteLifeForm(Long id);

    long total(Long id);

    long total();
}
