package com.tvein.universe.dto;

import com.tvein.universe.entity.Planet;
import lombok.Data;

@Data
public class LifeFormPlanetDTO {
    private Planet planet;
    private Integer survivability;
    private Integer adaptability;
}
