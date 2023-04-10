package com.tvein.universe.repository;

import com.tvein.universe.entity.LifeForm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LifeFormRepository extends JpaRepository<LifeForm, Long> {
}
