export interface SatelliteDTO{
    id?: number;
    name: string;
    description: string;
    radius: number;
    distance: number;
    gravity: number;
    escapeVelocity: number;
    orbitalPeriod: number;
    planetId: number;
}