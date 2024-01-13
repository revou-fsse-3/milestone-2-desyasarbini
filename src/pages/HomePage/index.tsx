import {useState} from 'react'
import { useQuery } from 'react-query'
import { Button, Card, Input, PokemonCard } from '../../components'
import stylespage from '../PokemonPage/PokemonPage.module.css'
import styles from './HomePage.module.css'
// import { getPokemon } from '../../api/getPokemon'
import axios from "axios"

interface Pokemon {
    id: number
    name: string
    type: string
    weight: number
    height: number
}

const HomePage = () => {

    const [pokemonName, setPokemonName] = useState('');
    const [pokemonChosen, setPokemonChosen] = useState(false)
    const [pokemon, setPokemon] = useState({
        id:'',
        name: '',
        species: '',
        img: '',
        types: '',
        hp: '',
        attack: '',
        defense: '',
        weight: '',
        height: ''
    })
    const searchPokemon = () => { 
        axios.get(` https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => setPokemon({
            id: response.data.id,
            name: pokemonName,
            species: response.data.species.name,
            img: response.data.sprites.front_default,
            types: response.data.types[0].type.name,
            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            weight: response.data.weight,
            height: response.data.height
        }))
        setPokemonChosen(true)
    }

    return (
        <div className={styles.container}>
            <Input 
                className="border-solid border-2 border-sky-500 rounded-md w-full"
                type='text' 
                placeholder='search your pokemon' 
                onChange={(event) => {
                setPokemonName(event.target.value)
            }}/>
            <button onClick={searchPokemon}>search Pokemon</button>
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
                        // <Card>
                        //     <Card padding={10}>
                        //         <h1 className='text-center'>{pokemon.name}</h1>
                        //         <img src={pokemon.img} alt="pokemon-image" />
                        //         <h3>Species: {pokemon.species}</h3>
                        //         <h3>Type: {pokemon.types}</h3>
                        //         <h4>HP: {pokemon.hp}</h4>
                        //         <h4>Attack: {pokemon.attack}</h4>
                        //         <h4>Defense: {pokemon.defense}</h4> 
                        //     </Card>    
                        // </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
export default HomePage