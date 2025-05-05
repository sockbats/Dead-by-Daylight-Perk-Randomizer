import './KillerPerk.scss'
import {killer_perk} from "../../../types.ts";
import {useState} from "react";

interface KillerPerkProps {
    perk: killer_perk,
    enabled: boolean
}

function KillerPerk({perk, enabled}: KillerPerkProps) {
    const [active, set_active] = useState(enabled);

    function toggle_perk() {
        const stored_perks = JSON.parse(localStorage.getItem("killer_perks") ?? "{}")
        perk.enabled = !active
        stored_perks[perk.name] = !active
        localStorage.setItem("killer_perks", JSON.stringify(stored_perks))
        set_active(!active)
    }

    return (
        <div className={"killer_perk pointer_hover"} onClick={toggle_perk}>
            <img className={(!active ? "inactive" : "")} src={perk.icon} alt={perk.name}/>
            <p>{perk.name}</p>
        </div>
    )
}

export default KillerPerk;