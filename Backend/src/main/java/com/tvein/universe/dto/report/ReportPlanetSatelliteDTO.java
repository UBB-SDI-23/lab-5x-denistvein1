package com.tvein.universe.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportPlanetSatelliteDTO {

    private String planetName;
    private String satelliteName;
    private Double maxSatelliteRadius;

}
