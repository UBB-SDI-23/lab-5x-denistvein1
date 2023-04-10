package com.tvein.universe.service;

import com.tvein.universe.entity.LifeForm;

import java.util.List;

public interface ILifeFormService {

    LifeForm saveLifeForm(LifeForm lifeForm);

    LifeForm getLifeForm(Long id, int pageNumber, int pageSize);

    List<LifeForm> getLifeForms(int pageNumber, int pageSize);

    LifeForm updateLifeForm(LifeForm lifeForm, Long id);

    void deleteLifeForm(Long id);

    long total(Long id);

    long total();
}
