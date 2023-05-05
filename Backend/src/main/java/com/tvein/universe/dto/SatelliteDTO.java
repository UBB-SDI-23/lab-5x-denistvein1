package com.tvein.universe.dto;

import lombok.Data;
@Data
public class SatelliteDTO {
    private Long id;
    private String name;
    private String description;
    private Double radius;
    private Double distance;
    private Double gravity;
    private Double escapeVelocity;
    private Double orbitalPeriod;
    private Long planetId;
}
