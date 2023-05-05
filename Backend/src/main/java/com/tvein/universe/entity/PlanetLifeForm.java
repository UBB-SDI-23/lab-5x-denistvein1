package com.tvein.universe.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.validator.constraints.Range;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(columnList = "planet_id"))
public class PlanetLifeForm {
    @EmbeddedId
    private PlanetLifeFormKey id;

    @ManyToOne(optional = false)
    @MapsId("planetId")
    @JoinColumn
    private Planet planet;

    @ManyToOne(optional = false)
    @MapsId("lifeFormId")
    @JoinColumn
    private LifeForm lifeForm;

    @Column
    @Range(min = 0, max = 100, message = "Survivability must be between 0 and 100")
    private Integer survivability;

    @Column
    @Range(min=0, max = 100, message = "Adaptability must be between 0 and 100")
    private Integer adaptability;
}
