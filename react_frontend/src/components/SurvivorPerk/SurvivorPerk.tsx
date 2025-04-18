import {survivor_perk} from "../../types.ts";

interface SurvivorPerkProps {
    perk: survivor_perk
}

function SurvivorPerk({perk}: SurvivorPerkProps) {
    return (
        <>
            <img src={perk.icon} alt={perk.name}/>
        </>
    )
}

export default SurvivorPerk;