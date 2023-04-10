import { Planet } from "./Planet";

export interface Satellite{
    id?: number;
    name: string;
    description: string;
    radius: number;
    distance: number;
    gravity: number;
    escapeVelocity: number;
    orbitalPeriod: number;
    planet: Planet;
}