import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { StarshipsDto } from './starships.dto';
import { StarshipsModel } from './starships.model';

@Injectable()
export class StarshipsRepository {

    constructor(
        private http: Http
    ) {}

    getStarships(): Observable<StarshipsModel[]> {
        return this.http.get('https://swapi.co/api/starships')
            .map(response => <StarshipsDto>response.json())
            .map(this.dtoToState);
    }

    private dtoToState(dto: StarshipsDto): StarshipsModel[] {
        return dto.results.map(starship => ({
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            cost_in_credits: Number(starship.cost_in_credits),
            length: Number(starship.length),
            max_atmosphering_speed: Number(starship.max_atmosphering_speed),
            crew: Number(starship.crew),
            passengers: Number(starship.passengers),
            cargo_capacity: Number(starship.cargo_capacity),
            consumables: starship.consumables,
            hyperdrive_rating: Number(starship.hyperdrive_rating),
            MGLT: Number(starship.MGLT),
            starship_class: starship.starship_class,
            pilots: starship.pilots,
            films: starship.films
        }));
    }

    // private stateToDto(): StarshipsDto {

    // }
}
