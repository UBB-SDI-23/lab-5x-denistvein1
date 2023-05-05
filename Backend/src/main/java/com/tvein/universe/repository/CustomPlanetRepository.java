package com.tvein.universe.repository;

import com.tvein.universe.dto.statistics.StatisticsPlanetLifeFormsDTO;
import com.tvein.universe.dto.statistics.StatisticsPlanetSatellitesDTO;

import java.util.List;

public interface CustomPlanetRepository {

    List<StatisticsPlanetSatellitesDTO> findAllByOrderBySatellitesDesc();

    List<StatisticsPlanetLifeFormsDTO> findAllByOrderByPlanetLifeFormsDesc();

}
