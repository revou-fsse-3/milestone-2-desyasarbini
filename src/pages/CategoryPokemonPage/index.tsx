import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonCard } from '../../components';
import axios from 'axios';
import stylespage from '../PokemonPage/PokemonPage.module.css';
import styles from './CategoryPokemonPage.module.css';

interface Pokemon {
  id: number;
  name: string;
  sprites: string;
  types: { name: string }[];
  height: number;
  weight: number;
}

interface CategoryData {
  id: number;
  name: string;
  pokemon: Pokemon[];
}

const CategoryPokemonPage: React.FC = () => {
  const { type } = useParams<{ type?: string }>();
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if type is defined before fetching data
    if (type !== undefined) {
      fetchDataByCategory(type);
    }
  }, [type]);

  const fetchDataByCategory = async (category: string) => {
    try {
      setLoading(true);

      console.log('Fetching data for category:', category);
      const response = await axios.get(`https://pokeapi.co/api/v2/type/${category}`);

      const data: CategoryData = response.data;
      console.log('Fetched data:', data);
      setCategoryData(data);
    } catch (error) {
      console.error('Error fetching category data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{`Showing Pokemon for Category: ${type || ''}`}</h2>
      <div className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : categoryData && Array.isArray(categoryData.pokemon) ? (
          // Render your Pokemon list or any other UI using categoryData
          categoryData.pokemon.map((pokemon) => (
            <PokemonCard key={pokemon.id}>
              <p className={stylespage.pokemonIdBack}>#{pokemon.id}</p>
              <div className={stylespage.pokemonImage}>
                <img src={pokemon.sprites} alt={pokemon.name} />
              </div>
              <div className={stylespage.pokemonInfo}>
                <div className={stylespage.containerId}>
                  <p className="pokemonId">{pokemon.id}</p>
                  <h2 className="pokemonName">{pokemon.name}</h2>
                </div>
                <div className={stylespage.typePokemon}>{categoryData.name}</div>
                <div className={stylespage.statusPokemon}>
                  <p className={stylespage.stat}>{pokemon.height}m</p>
                  <p className={stylespage.stat}>{pokemon.weight}kg</p>
                </div>
              </div>
            </PokemonCard>
          ))
        ) : null}
      </div>
    </div>
  );
};

export default CategoryPokemonPage;
