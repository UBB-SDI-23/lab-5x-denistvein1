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
@NamedEntityGraph(name = "Planet.satellites", attributeNodes = @NamedAttributeNode("satellites"))
public class Planet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Planet name cannot be blank")
    private String name;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Planet radius cannot be negative")
    private Double radius;
    @NonNull
    @Column(nullable = false)
    private Double temperature;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Planet gravity cannot be negative")
    private Double gravity;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Planet escape velocity cannot be negative")
    private Double escapeVelocity;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Planet orbital period cannot be negative")
    private Double orbitalPeriod;

    @JsonIgnore
    @OneToMany(mappedBy = "planet", cascade = CascadeType.ALL)
    private List<Satellite> satellites;

    @JsonIgnore
    @OneToMany(mappedBy = "planet", cascade = CascadeType.ALL)
    private List<PlanetLifeForm> planetLifeForms;

}
