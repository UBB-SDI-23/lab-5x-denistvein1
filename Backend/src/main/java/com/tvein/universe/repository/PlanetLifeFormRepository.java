package com.tvein.universe.repository;

import com.tvein.universe.entity.PlanetLifeForm;
import com.tvein.universe.entity.PlanetLifeFormKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface PlanetLifeFormRepository extends JpaRepository<PlanetLifeForm, PlanetLifeFormKey> {

    Optional<PlanetLifeForm> findByIdPlanetIdAndLifeFormId(Long planetId, Long lifeFormId);

}
