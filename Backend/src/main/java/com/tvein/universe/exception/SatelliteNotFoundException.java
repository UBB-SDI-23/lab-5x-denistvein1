package com.tvein.universe.exception;

public class SatelliteNotFoundException extends RuntimeException{

    public SatelliteNotFoundException(Long id){
        super("The satellite with id '" + id + "' does not exist");
    }
}
