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
public class LifeForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    @NotBlank(message = "LifeForm name cannot be blank")
    private String name;

    @Column
    @Min(value = 0, message = "LifeForm iq cannot be negative")
    private Integer iq;

    @Column
    @Min(value = 0, message = "LifeForm life span cannot be negative")
    private Integer lifeSpan;

    @Column
    @Min(value = 0, message = "LifeForm energy use cannot be negative")
    private Double energyUse;

    @Column
    @NotBlank(message = "LifeForm friendly cannot be blank")
    private String friendly;

    @Column
    @NotBlank(message = "LifeForm conscious cannot be blank")
    private String conscious;

    @JsonIgnore
    @OneToMany(mappedBy = "lifeForm", cascade = CascadeType.ALL)
    private List<PlanetLifeForm> planetLifeForms;
}
