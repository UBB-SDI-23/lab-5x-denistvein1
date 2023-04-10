package com.tvein.universe.repository;

import com.tvein.universe.entity.Satellite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SatelliteRepository extends JpaRepository<Satellite, Long> {
}
