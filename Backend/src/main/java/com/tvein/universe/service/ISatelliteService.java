package com.tvein.universe.service;

import com.tvein.universe.entity.Satellite;

import java.util.List;

public interface ISatelliteService {

    Satellite saveSatellite(Satellite satellite, Long planetId);

    Satellite getSatellite(Long id);

    List<Satellite> getSatellitesByDistanceGreaterThan(double distance);

    List<Satellite> getSatellites();

    Satellite updateSatellite(Satellite satellite, Long id);

    void deleteSatellite(Long id);
}
