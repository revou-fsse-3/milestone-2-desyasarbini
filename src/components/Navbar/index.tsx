
import styles from './Navbar.module.css'
import logo from '../../assets/logo.png'
import PokemonCard from '../PokemonCard'
import Card from '../Card'

const Navbar = () => {
    return (
        <div className={styles.wrapper}>
            <img src={logo} alt="logo-Pokemon-Web"/>
            <ul className={styles.navList}>
                <li><button className={`${styles} btn`} id="version">ALL</button></li>
                <li><button className={`${styles.normal} btn`} id="normal">NORMAL</button></li>
                <li><button className={`${styles.fire} btn`} id="fire">FIRE</button></li>
                <li><button className={`${styles.water} btn`} id="water">WATER</button></li>
                <li><button className={`${styles.grass} btn`} id="grass">GRASS</button></li>
                <li><button className={`${styles.electric} btn`} id="electric">ELECTRIC</button></li>
                <li><button className={`${styles.ice} btn`} id="ice">ICE</button></li>
                <li><button className={`${styles.fighting} btn`} id="fighting">FIGHTING</button></li>
                <li><button className={`${styles.poison} btn`} id="poison">POISON</button></li>
                <li><button className={`${styles.ground} btn`} id="ground">GROUND</button></li>
                <li><button className={`${styles.flying} btn`} id="flying">FLYING</button></li>
                <li><button className={`${styles.psychic} btn`} id="psychic">PSYCHIC</button></li>
                <li><button className={`${styles.bug} btn`} id="bug">BUG</button></li>
                <li><button className={`${styles.rock} btn`} id="rock">ROCK</button></li>
                <li><button className={`${styles.ghost} btn`} id="ghost">GHOST</button></li>
                <li><button className={`${styles.dark} btn`} id="dark">DARK</button></li>
                <li><button className={`${styles.dragon} btn`} id="dragon">DRAGON</button></li>
                <li><button className={`${styles.fairy} btn`} id="fairy">FAIRY</button></li>
                <li><button className={`${styles.shadow} btn`} id="shadow">SHADOW</button></li>
            </ul>
        </div>
    )
}

export default Navbar