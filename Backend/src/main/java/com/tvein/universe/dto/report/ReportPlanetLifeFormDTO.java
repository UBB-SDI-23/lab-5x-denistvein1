package com.tvein.universe.dto.report;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReportPlanetLifeFormDTO {

    private String planetName;
    private Double avgLifeFormIq;

}
