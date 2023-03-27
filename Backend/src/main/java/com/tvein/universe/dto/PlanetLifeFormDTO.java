package com.tvein.universe.dto;

import com.tvein.universe.entity.LifeForm;
import lombok.Data;

@Data
public class PlanetLifeFormDTO {
    private LifeForm lifeForm;
    private Integer survivability;
    private Integer adaptability;
}
