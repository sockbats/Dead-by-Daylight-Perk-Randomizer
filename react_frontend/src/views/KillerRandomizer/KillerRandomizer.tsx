import './KillerRandomizer.scss';
import KillerCard from "../../components/KillerCard/KillerCard.tsx";
import json_killer_list from '../../json_data/killer_list.json';
import json_killer_perk_list from '../../json_data/killer_perk_list.json';
import backend from '../../json_data/backend.json'
import {killer, killer_perk} from '../../types.ts';

import {useState, useEffect} from "react";

function KillerRandomizer() {
    const [killer_list, set_killer_list] = useState(new Array<killer>())
    const [killer_perk_list, set_killer_perk_list] = useState(new Array<killer_perk>())

    useEffect(() => {
        fetch(`http://${backend.host_address}:${backend.host_port}/api/killers`)
            .then(response => {
                if (!response.ok) {
                    return json_killer_list;
                }
                return response.json();
            })
            .then(data => {
                set_killer_list(data);
            })
    }, []);

    useEffect(() => {
        fetch(`http://${backend.host_address}:${backend.host_port}/api/killer_perks`)
            .then(response => {
                if (!response.ok) {
                    return json_killer_perk_list;
                }
                return response.json();
            })
            .then(data => {
                console.log(data)
                set_killer_perk_list(data);
            })
    }, []);

    return (
        <>
            <aside id={"killer_perk_list"}>
                {
                    killer_list.map(
                        killer =>
                            <KillerCard
                                killer={killer}
                                perks={killer_perk_list.filter(perk => perk.killer_id === killer.killer_id)}
                            />
                    )
                }
            </aside>
        </>
    )
}

export default KillerRandomizer;