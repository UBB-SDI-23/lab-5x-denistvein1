package com.tvein.universe.dto;

import com.tvein.universe.entity.LifeForm;

public class LifeFormDTOConverter {
    public static LifeFormsNoPlanets convertToLifeFormDTONoPlanets(LifeForm lifeForm, Long noPlanets){
        LifeFormsNoPlanets lifeFormsNoPlanets = new LifeFormsNoPlanets();
        lifeFormsNoPlanets.setId(lifeForm.getId());
        lifeFormsNoPlanets.setName(lifeForm.getName());
        lifeFormsNoPlanets.setIq(lifeForm.getIq());
        lifeFormsNoPlanets.setLifeSpan(lifeForm.getLifeSpan());
        lifeFormsNoPlanets.setEnergyUse(lifeForm.getEnergyUse());
        lifeFormsNoPlanets.setFriendly(lifeForm.getFriendly());
        lifeFormsNoPlanets.setConscious(lifeForm.getConscious());
        lifeFormsNoPlanets.setPlanetsSize(noPlanets);
        return lifeFormsNoPlanets;
    }
}
