import styles from './PokemonCard.module.css'
import { ReactNode } from "react";

interface Props {
    children: ReactNode
}

const PokemonCard = ({children}: Props) => {
    return (
        <div className={styles.container}> 
            {children}
        </div>
    )
}
export default PokemonCard