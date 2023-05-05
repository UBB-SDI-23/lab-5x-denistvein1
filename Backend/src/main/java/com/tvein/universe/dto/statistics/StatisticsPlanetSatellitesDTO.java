package com.tvein.universe.dto.statistics;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StatisticsPlanetSatellitesDTO {

    private Long id;
    private String planetName;
    private Long satellites;

}
