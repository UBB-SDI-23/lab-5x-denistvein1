package com.tvein.universe.repository;

import com.tvein.universe.entity.Planet;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlanetRepository extends JpaRepository<Planet, Long>, CustomPlanetRepository {
    List<Planet> findByRadiusGreaterThan(Double radius, Pageable pageable);
    Long countByRadiusGreaterThan(Double radius);

    Long countByPlanetLifeFormsLifeFormId(Long id);

    @Query(value = "SELECT * FROM planet " +
            "WHERE to_tsvector('english', name) @@ to_tsquery('english', replace(?1, ' ', ':* & ') || ':*') " +
            "OR name LIKE ('%' || ?1 || '%') ORDER BY ts_rank(to_tsvector('english', name), " +
            "to_tsquery('english', replace(?1, ' ', ':* & ') || ':*')) LIMIT 10", nativeQuery = true)
    List<Planet> findTop20ByQuery(String query);
}