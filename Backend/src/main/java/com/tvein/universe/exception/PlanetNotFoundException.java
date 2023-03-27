package com.tvein.universe.exception;

public class PlanetNotFoundException extends RuntimeException{

    public PlanetNotFoundException(Long id){
        super("The planet with id '" + id + "' does not exist");
    }
}
