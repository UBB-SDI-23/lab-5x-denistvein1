package com.tvein.universe.dto;

import lombok.Data;

import java.util.List;

@Data
public class PlanetDTO {

    private Long id;
    private String name;
    private Double radius;
    private Double temperature;
    private Double gravity;
    private Double escapeVelocity;
    private Double orbitalPeriod;
    private List<SimpleSatelliteDTO> satellites;
    private List<PlanetLifeFormDTO> planetLifeForms;
}
