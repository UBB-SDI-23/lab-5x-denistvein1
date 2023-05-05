package com.tvein.universe.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatisticsPlanetLifeFormsDTO {

    private Long id;
    private String planetName;
    private Long lifeForms;

}
