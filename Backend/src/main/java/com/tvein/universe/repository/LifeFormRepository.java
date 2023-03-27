package com.tvein.universe.repository;

import com.tvein.universe.entity.LifeForm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LifeFormRepository extends JpaRepository<LifeForm, Long> {
    List<LifeForm> findByIqGreaterThan(int iq);
}
