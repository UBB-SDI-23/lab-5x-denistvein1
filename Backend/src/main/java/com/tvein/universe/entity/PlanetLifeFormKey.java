package com.tvein.universe.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PlanetLifeFormKey implements Serializable {

    @Column
    private Long planetId;

    @Column
    private Long lifeFormId;

}
