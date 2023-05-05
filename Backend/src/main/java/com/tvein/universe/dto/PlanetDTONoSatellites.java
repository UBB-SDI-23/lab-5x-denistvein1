package com.tvein.universe.dto;

import lombok.Data;

@Data
public class PlanetDTONoSatellites {
    private Long id;
    private String name;
    private Double radius;
    private Double temperature;
    private Double gravity;
    private Double escapeVelocity;
    private Double orbitalPeriod;
    private Long satellitesSize;
}
