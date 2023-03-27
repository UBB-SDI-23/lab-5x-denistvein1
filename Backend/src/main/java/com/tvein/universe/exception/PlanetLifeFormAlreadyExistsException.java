package com.tvein.universe.exception;

public class PlanetLifeFormAlreadyExistsException extends RuntimeException{

    public PlanetLifeFormAlreadyExistsException(Long planetId, Long lifeFormId){
        super("The planet life form with id '(" + planetId + ", " + lifeFormId + ")' already exists");
    }

}
