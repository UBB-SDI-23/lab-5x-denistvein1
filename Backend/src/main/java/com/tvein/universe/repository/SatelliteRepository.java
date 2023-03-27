package com.tvein.universe.repository;

import com.tvein.universe.entity.Satellite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SatelliteRepository extends JpaRepository<Satellite, Long> {
    List<Satellite> findByDistanceGreaterThan(double distance);

}
