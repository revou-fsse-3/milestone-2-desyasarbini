import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';

interface PokemonData {
  name: string;
  // Add more properties based on the structure of the fetched data
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const URL = 'https://pokeapi.co/api/v2/type/';
  const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);

  const fetchPokemonData = async (idOrName: string) => {
    try {
      const response = await fetch(`${URL}${idOrName}/`);
      const data: PokemonData = await response.json();
      setPokemonData(data);
      console.log('Fetched Pokemon Data:', data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
    }
  };

  useEffect(() => {
    // Fetch initial data based on default Pokemon ID or Name
    fetchPokemonData('all');
  }, []);

  const handleCategoryClick = (category: string) => {
    const route = category === 'all' ? '/' : `/pokemon/${category}`;
    navigate(route);
    fetchPokemonData(category);
  };

  const categories = ['all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dark', 'dragon', 'fairy', 'shadow'];

  return (
    <div className={styles.wrapper}>
      <img src={logo} alt="logo-Pokemon-Web" />
      <ul className={styles.navList}>
        {categories.map(category => (
          <li key={category}>
            <button
              onClick={() => handleCategoryClick(category)}
              className={`${styles[category]} btn`}
              id={category}
            >
              {category}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => navigate('/pokemon-search')} className={`${styles.shadow} btn`} id="search">
            search
          </button>
        </li>
      </ul>
      {/* Display fetched Pokemon data */}
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          {/* Add more details based on the structure of the fetched data */}
        </div>
      )}
    </div>
  );
};

export default Navbar;
