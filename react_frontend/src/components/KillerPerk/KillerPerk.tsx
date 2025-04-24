import './KillerPerk.scss'
import {killer_perk} from "../../types.ts";
import {useState} from "react";

interface KillerPerkProps {
    perk: killer_perk,
    enabled: boolean,
    toggleable: boolean
}

function KillerPerk({perk, enabled, toggleable}: KillerPerkProps) {
    const [active, set_active] = useState(enabled);

    function toggle_perk() {
        if (!toggleable) {
            return
        }
        const stored_perks = JSON.parse(localStorage.getItem("killer_perks") ?? "{}")
        perk.enabled = !active
        stored_perks[perk.name] = !active
        localStorage.setItem("killer_perks", JSON.stringify(stored_perks))
        console.log(`Perk: ${perk.name}\nActive: ${!active}\nperk.enabled: ${perk.enabled}\nlocalStorage.enabled: ${stored_perks[perk.name]}`)
        set_active(!active)
    }

    return (
        <div className={"killer_perk" + (!active && toggleable ? " inactive" : "")} onClick={toggle_perk}>
            <img src={perk.icon} alt={perk.name}/>
        </div>
    )
}

export default KillerPerk;