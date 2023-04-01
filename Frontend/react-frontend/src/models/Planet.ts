import { PlanetLifeForm } from "./PlanetFileForm";
import { Satellite } from "./Satellite";

export interface Planet{
    id?: number;
    name: string;
    radius: number;
    temperature: number;
    gravity: number;
    escapeVelocity: number;
    orbitalPeriod: number;
    satellites?: Satellite[];
    planetLifeForms?: PlanetLifeForm[];
}