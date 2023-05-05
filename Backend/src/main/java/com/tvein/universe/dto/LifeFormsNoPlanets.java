package com.tvein.universe.dto;

import lombok.Data;

@Data
public class LifeFormsNoPlanets {
    private Long id;
    private String name;
    private Integer iq;
    private Integer lifeSpan;
    private Double energyUse;
    private String friendly;
    private String conscious;
    private Long planetsSize;
}
