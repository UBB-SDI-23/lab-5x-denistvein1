package com.tvein.universe.repository;

import com.tvein.universe.entity.Planet;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanetRepository extends JpaRepository<Planet, Long> {
    List<Planet> findByRadiusGreaterThan(double radius, Pageable pageable);
}