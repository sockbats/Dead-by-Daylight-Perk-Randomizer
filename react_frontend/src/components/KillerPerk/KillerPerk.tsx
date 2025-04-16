import {killer_perk} from "../../types.ts";

interface KillerPerkProps {
    perk: killer_perk
}

function KillerPerk({perk}: KillerPerkProps) {
    return (
        <>
            <img src={perk.icon} alt={perk.name}/>
        </>
    )
}

export default KillerPerk;