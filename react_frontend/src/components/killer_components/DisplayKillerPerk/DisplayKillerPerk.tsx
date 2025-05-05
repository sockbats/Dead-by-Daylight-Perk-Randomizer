import './DisplayKillerPerk.scss'
import {killer_perk} from "../../../types.ts";

interface KillerPerkProps {
    perk: killer_perk
}

function DisplayKillerPerk({perk}: KillerPerkProps) {
    return (
        <div className={"display_killer_perk"}>
            <img src={perk.icon} alt={perk.name}/>
        </div>
    )
}

export default DisplayKillerPerk;