package com.tvein.universe.service;

import com.tvein.universe.entity.PlanetLifeForm;


public interface IPlanetLifeFormService {

    PlanetLifeForm savePlanetLifeForm(PlanetLifeForm planetLifeForm, Long planetId, Long lifeFormId);

}
