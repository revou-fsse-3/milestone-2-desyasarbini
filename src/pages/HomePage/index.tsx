import {useState} from 'react'
import { useQuery } from 'react-query'
import { Button, Card, Input, PokemonCard } from '../../components'
import stylespage from '../PokemonPage/PokemonPage.module.css'
import styles from './HomePage.module.css'
import axios from "axios"

interface PokemonType {
    slot: number;
    type: {
      name: string;
    };
}

interface Pokemon {
    id: number;
    name: string;
    sprites: {
      front_default: string;
    };
    types: PokemonType[];
    height: number;
    weight: number;
}

const HomePage = () => {

    const [pokemonName, setPokemonName] = useState('');
    const [pokemonChosen, setPokemonChosen] = useState(false)
    const [pokemon, setPokemon] = useState({
        id:'',
        name: '',
        img: '',
        types: '',
        weight: '',
        height: '',
    })
    const searchPokemon = () => { 
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then((response) => {
                const typesArray = response.data.types.map((typeObject: { type: { name: string } }) => typeObject.type.name);
    
                setPokemon({
                    id: response.data.id,
                    name: pokemonName,
                    img: response.data.sprites.front_default,
                    types: typesArray.join(', '), // Join the array into a string if needed
                    weight: response.data.weight,
                    height: response.data.height
                });
    
                setPokemonChosen(true);
            })
            .catch((error) => {
                console.error('Error fetching Pokemon:', error);
            });
    };

    return (
        <div className={styles.container}>
            <Input 
                className="border-solid border-2 border-amber-500 rounded-lg w-1/2 p-2"
                type='text' 
                placeholder='search your pokemon' 
                onChange={(event) => {
                setPokemonName(event.target.value)
            }}/>
            <button onClick={searchPokemon} className={styles.buttonSearch}>search Pokemon</button>
            <div className={styles.innerContainer}>
                <div className={styles.display}>
                    {!pokemonChosen ? (<h1>choose your pokemon</h1>) : (
                        <PokemonCard key={pokemon.id}>
                            <p className={stylespage.pokemonIdBack}>#{pokemon.id}</p>
                            <div className={stylespage.pokemonImage}>
                                <img src={pokemon.img} alt={pokemon.name}/>
                            </div>
                            <div className={stylespage.pokemonInfo}>
                                <div className={stylespage.containerId}>
                                    <p className="pokemonId">{pokemon.id}</p>
                                    <h2 className="pokemonName">{pokemon.name}</h2>
                                </div>
                                <div className={stylespage.typePokemon}>
                                    {pokemon.types}
                                </div>
                                <div className={stylespage.statusPokemon}>
                                    <p className={stylespage.stat}>{pokemon.height}m</p>
                                    <p className={stylespage.stat}>{pokemon.weight}kg</p>
                                </div>
                            </div>
                        </PokemonCard>
                    )}
                </div>
            </div>
        </div>
    )
}
export default HomePage