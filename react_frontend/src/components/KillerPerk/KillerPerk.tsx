import './KillerPerk.scss'
import {killer_perk} from "../../types.ts";
import {useState} from "react";

interface KillerPerkProps {
    perk: killer_perk
}

function KillerPerk({perk}: KillerPerkProps) {
    const [inactive, set_inactive] = useState(false);
    function toggle_perk() {
        set_inactive(!inactive);
    }

    return (
        <div className={"killer_perk" + (inactive ? " inactive" : "")} onClick={toggle_perk}>
            <img src={perk.icon} alt={perk.name}/>
        </div>
    )
}

export default KillerPerk;