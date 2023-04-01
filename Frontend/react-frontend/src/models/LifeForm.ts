import { PlanetLifeForm } from "./PlanetFileForm";

export interface LifeForm{
    id?: number;
    name: string;
    iq: number;
    lifeSpan: number;
    energyUse: number;
    friendly: string;
    conscious: string;
    planetLifeForm?: PlanetLifeForm[];
}