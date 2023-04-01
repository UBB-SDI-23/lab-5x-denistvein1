import { LifeForm } from "./LifeForm";
import { Planet } from "./Planet";

export interface PlanetLifeForm{
    id?: number;
    planet: Planet;
    lifeForm: LifeForm;
    survivability: number;
    adaptability: number;
};