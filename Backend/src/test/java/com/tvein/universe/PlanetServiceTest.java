package com.tvein.universe;

import com.tvein.universe.entity.*;
import com.tvein.universe.repository.PlanetRepository;
import com.tvein.universe.service.PlanetService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.util.Pair;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class PlanetServiceTest {

    @Mock
    private PlanetRepository planetRepository;

    @InjectMocks
    private PlanetService planetService;

    @Before
    public void setup(){
        when(planetRepository.findByRadiusGreaterThan(5000, PageRequest.of(0, 2))).thenReturn(Arrays.asList(
                new Planet(1L, "Earth", 6400.0, 14.0, 1.0, 11.0, 365.25, new ArrayList<>(), new ArrayList<>()),
                new Planet(2L, "Venus", 6000.0, 464.0, 0.9, 10.0, 225.0, new ArrayList<>(), new ArrayList<>())
        ));

        when(planetRepository.findAll()).thenReturn(Arrays.asList(
                new Planet(1L, "Earth", 6400.0, 14.0, 1.0, 11.0, 365.25, List.of(
                        new Satellite(1L, "Moon", 1740.0, 384400.0, 0.16, 2.38, 27.0, null)
                ), List.of(
                        new PlanetLifeForm(new PlanetLifeFormKey(1L, 1L), null, new LifeForm(1L, "Human", 100, 73, 2000.0, "no", "yes", null), 50, 100),
                        new PlanetLifeForm(new PlanetLifeFormKey(1L, 2L), null, new LifeForm(2L, "Chimpanzee", 25, 30, 800.0, "no", "yes", null), 20, 60)
                )),
                new Planet(2L, "Mars", 3400.0, -60.0, 0.38, 4.25, 687.0, List.of(
                        new Satellite(2L, "Phobos", 11.0, 6000.0, 0.0057, 0.041, 0.3, null)
                ), List.of(
                        new PlanetLifeForm(new PlanetLifeFormKey(2L, 3L), null, new LifeForm(3L, "Dog", 5, 15, 360.0, "yes", "no", null), 40, 80),
                        new PlanetLifeForm(new PlanetLifeFormKey(2L, 4L), null, new LifeForm(4L, "Parrot", 10, 20, 50.0, "yes", "yes", null), 25, 75)
                ))
        ));
    }

    @Test
    public void getPlanetsByRadiusGreaterThanTest(){
        List<Planet> planets = planetService.getPlanetsByRadiusGreaterThan(0, 2, 5000);

        assertEquals("Earth", planets.get(0).getName());
        assertEquals("Venus", planets.get(1).getName());
    }

    @Test
    public void getPlanetsWithBiggestSatelliteTest(){
        List<Pair<Planet, Satellite>> report = planetService.getPlanetsWithBiggestSatellite(0, 2);

        assertEquals("Phobos", report.get(0).getSecond().getName());
        assertEquals("Moon", report.get(1).getSecond().getName());

        verify(planetRepository, times(1)).findAll();
    }

    @Test
    public void getPlanetsByAverageLifeFormIqTest(){
        List<Pair<Planet, Double>> report = planetService.getPlanetsByAverageLifeFormIq(0, 2);

        assertEquals(62.5, report.get(1).getSecond());
        assertEquals(7.5, report.get(0).getSecond());

        verify(planetRepository, times(1)).findAll();
    }
}
