package com.tvein.universe.exception;

public class PlanetLifeFormNotFoundException extends RuntimeException{

    public PlanetLifeFormNotFoundException(Long planetId, Long lifeFormId){
        super("The planet life form with id '(" + planetId + ", " + lifeFormId + ")' does not exist");
    }
}
