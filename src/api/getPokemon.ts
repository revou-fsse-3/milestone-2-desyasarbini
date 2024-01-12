import baseApi from "./baseApi";

const API_URL_POKEMON = 'pokemon?offset=20&limit=20'

export interface pokemonList {
    id: number
    type: string
}

export interface Pokemon {
    name: string
    url: pokemonList[]
}

export interface PokemonResult {
    count: number
    next: string
    previous: string
    results: Pokemon[]
}

export const getPokemon = async() => {
    return await baseApi.get<PokemonResult>(API_URL_POKEMON).then((data) => data.data)
}

