package com.tvein.universe.repository;

import com.tvein.universe.entity.Planet;
import lombok.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanetRepository extends JpaRepository<Planet, Long> {
    List<Planet> findByRadiusGreaterThan(double radius);

    @EntityGraph(
            value = "Planet.satellites",
            type = EntityGraph.EntityGraphType.LOAD
    )
    @NonNull
    List<Planet> findAll();
}
