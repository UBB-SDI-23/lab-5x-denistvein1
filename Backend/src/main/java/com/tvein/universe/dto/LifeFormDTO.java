package com.tvein.universe.dto;

import lombok.Data;

import java.util.List;

@Data
public class LifeFormDTO {
    private Long id;
    private String name;
    private Integer iq;
    private Integer lifeSpan;
    private Double energyUse;
    private String friendly;
    private String conscious;
    private List<LifeFormPlanetDTO> planetLifeForms;
}
