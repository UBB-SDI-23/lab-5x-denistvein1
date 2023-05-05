package com.tvein.universe.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Planet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank(message = "Planet name cannot be blank")
    private String name;

    @Column
    @Min(value = 0, message = "Planet radius cannot be negative")
    private Double radius;

    @Column
    @Min(value = -273, message = "Planet temperature cannot be below 0 Kelvin")
    private Double temperature;

    @Column
    @Min(value = 0, message = "Planet gravity cannot be negative")
    private Double gravity;

    @Column
    @Min(value = 0, message = "Planet escape velocity cannot be negative")
    private Double escapeVelocity;

    @Column
    @Min(value = 0, message = "Planet orbital period cannot be negative")
    private Double orbitalPeriod;

    @JsonIgnore
    @OneToMany(mappedBy = "planet", cascade = CascadeType.ALL)
    private List<Satellite> satellites;

    @JsonIgnore
    @OneToMany(mappedBy = "planet", cascade = CascadeType.ALL)
    private List<PlanetLifeForm> planetLifeForms;
}
