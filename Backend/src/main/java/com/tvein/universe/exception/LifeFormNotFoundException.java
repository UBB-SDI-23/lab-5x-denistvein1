package com.tvein.universe.exception;

public class LifeFormNotFoundException extends RuntimeException{

    public LifeFormNotFoundException(Long id){
        super("The life form with id '" + id + "' does not exist");
    }
}
