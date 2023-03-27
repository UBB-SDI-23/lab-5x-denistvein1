package com.tvein.universe.service;

import com.tvein.universe.entity.LifeForm;

import java.util.List;

public interface ILifeFormService {

    LifeForm saveLifeForm(LifeForm lifeForm);

    LifeForm getLifeForm(Long id);

    List<LifeForm> getLifeFormsByIqGreaterThan(int iq);

    List<LifeForm> getLifeForms();

    LifeForm updateLifeForm(LifeForm lifeForm, Long id);

    void deleteLifeForm(Long id);
}
