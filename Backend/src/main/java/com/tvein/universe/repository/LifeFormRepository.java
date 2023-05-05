package com.tvein.universe.repository;

import com.tvein.universe.entity.LifeForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LifeFormRepository extends JpaRepository<LifeForm, Long> {
    @Query(value = "SELECT * FROM life_form " +
            "WHERE to_tsvector('english', name) @@ to_tsquery('english', replace(?1, ' ', ':* & ') || ':*') " +
            "OR name LIKE ('%' || ?1 || '%') ORDER BY ts_rank(to_tsvector('english', name), " +
            "to_tsquery('english', replace(?1, ' ', ':* & ') || ':*')) DESC LIMIT 20", nativeQuery = true)
    List<LifeForm> findTop20ByQuery(String query);
}
