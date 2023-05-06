package com.tvein.universe.repository;

import com.tvein.universe.dto.statistics.StatisticsPlanetLifeFormsDTO;
import com.tvein.universe.dto.statistics.StatisticsPlanetSatellitesDTO;
import com.tvein.universe.entity.LifeForm;
import com.tvein.universe.entity.Planet;
import com.tvein.universe.entity.PlanetLifeForm;
import com.tvein.universe.entity.Satellite;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.criteria.*;

import java.util.List;

public class CustomPlanetRepositoryImpl implements CustomPlanetRepository{
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<StatisticsPlanetSatellitesDTO> findAllByOrderBySatellitesDesc() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<StatisticsPlanetSatellitesDTO> criteriaQuery = criteriaBuilder.createQuery(StatisticsPlanetSatellitesDTO.class);
        Root<Planet> root = criteriaQuery.from(Planet.class);
        Join<Planet, Satellite> planetSatelliteJoin = root.join("satellites", JoinType.INNER);

        criteriaQuery.select(criteriaBuilder.construct(
                StatisticsPlanetSatellitesDTO.class,
                root.get("id"),
                root.get("name"),
                criteriaBuilder.count(planetSatelliteJoin)
        ))
                .groupBy(root.get("id"), root.get("name"))
                .orderBy(criteriaBuilder.desc(criteriaBuilder.count(planetSatelliteJoin)));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    @Override
    public List<StatisticsPlanetLifeFormsDTO> findAllByOrderByPlanetLifeFormsDesc() {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<StatisticsPlanetLifeFormsDTO> criteriaQuery = criteriaBuilder.createQuery(StatisticsPlanetLifeFormsDTO.class);
        Root<Planet> root = criteriaQuery.from(Planet.class);
        Join<Planet, PlanetLifeForm> planetPlanetLifeFormJoin = root.join("planetLifeForms", JoinType.INNER);
        Join<PlanetLifeForm, LifeForm> planetLifeFormLifeFormJoin = planetPlanetLifeFormJoin.join("lifeForm", JoinType.INNER);

        criteriaQuery.select(criteriaBuilder.construct(
                StatisticsPlanetLifeFormsDTO.class,
                root.get("id"),
                root.get("name"),
                criteriaBuilder.count(planetLifeFormLifeFormJoin)
        ))
                .groupBy(root.get("id"), root.get("name"))
                .orderBy(criteriaBuilder.desc(criteriaBuilder.count(planetLifeFormLifeFormJoin)));

        return entityManager.createQuery(criteriaQuery).getResultList();
    }
}









































