package com.tvein.universe.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = @Index(columnList = "planet_id"))
public class Satellite {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NonNull
    @Column(nullable = false, unique = true)
    @NotBlank(message = "Satellite name cannot be blank")
    private String name;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Satellite radius cannot be negative")
    private Double radius;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Satellite distance cannot be negative")
    private Double distance;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Satellite gravity cannot be negative")
    private Double gravity;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Satellite escape velocity cannot be negative")
    private Double escapeVelocity;
    @NonNull
    @Column(nullable = false)
    @Min(value = 0, message = "Satellite orbital period cannot be negative")
    private Double orbitalPeriod;

    @JoinColumn
    @ManyToOne(optional = false)
    private Planet planet;

}
