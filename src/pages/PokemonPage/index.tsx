import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PokemonCard } from "../../components"
import styles from '../../components/Navbar/Navbar.module.css'
import stylespage from './PokemonPage.module.css'

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

const PokemonPage: React.FC = () => {

  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      const fetchPokemonData = async () => {
        try {
          const result: Pokemon[] = [];
          const URL = 'https://pokeapi.co/api/v2/pokemon/';
  
          for (let i = 1; i <= 50; i++) {
            const response = await axios.get<Pokemon>(`${URL}${i}`);
            result.push(response.data);
          }
  
          setPokemonList(result);
        } catch (error) {
          console.error('Error fetching Pokemon data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchPokemonData();
    }, []);

    useEffect(() => {
        console.log('Fetched Pokemon List:', pokemonList);
        pokemonList.forEach((pokemon) => {
          if ('id' in pokemon) {
            let pokeId = pokemon.id.toString();
                while (pokeId.length < 3) {
                    pokeId = '0' + pokeId;
                }
            console.log(`Pokemon #${pokeId} Types:`, pokemon.types);
          } else {
            console.error('Invalid pokemon object:', pokemon);
          }
        });
    }, [pokemonList]);
      
    return (
        <div className="p-8">
            <div className={stylespage.containerPokemon}>
                {loading ? ( 
                    <p>Loading...</p>
                ) : (
                    pokemonList.map((pokemon) => (
                        <PokemonCard key={pokemon.id}>
                            <p className={stylespage.pokemonIdBack}>#{pokemon.id}</p>
                            <div className={stylespage.pokemonImage}>
                                <img src={pokemon.sprites.front_default} alt={pokemon.name}/>
                            </div>
                            <div className={stylespage.pokemonInfo}>
                                <div className={stylespage.containerId}>
                                    <p className="pokemonId">{pokemon.id}</p>
                                    <h2 className="pokemonName">{pokemon.name}</h2>
                                </div>
                                <div className={stylespage.typePokemon}>
                                    {pokemon.types.map((type) => (
                                        <p key={type.type.name} className={`${styles[type.type.name]} ${styles.type}`}>
                                            {type.type.name}
                                        </p>
                                    ))}
                                </div>
                                <div className={stylespage.statusPokemon}>
                                    <p className={stylespage.stat}>{pokemon.height}m</p>
                                    <p className={stylespage.stat}>{pokemon.weight}kg</p>
                                </div>
                            </div>
                        </PokemonCard>
                    ))
                )}
            </div>
        </div>
    )
}
export default PokemonPage