import './SurvivorRandomizer.scss';
import SurvivorCard from "../../components/survivor_components/SurvivorCard/SurvivorCard.tsx";
import json_survivor_list from '../../json_data/survivor_list.json';
import json_survivor_perk_list from '../../json_data/survivor_perk_list.json';
import backend from '../../json_data/backend.json'
import {survivor, survivor_perk} from '../../types.ts';

import {useState, useEffect} from "react";

function SurvivorRandomizer() {
    const [survivor_list, set_survivor_list] = useState(new Array<survivor>())
    const [survivor_perk_list, set_survivor_perk_list] = useState(new Array<survivor_perk>())

    useEffect(() => {
        fetch(`http://${backend.host_address}:${backend.host_port}/api/survivors`, {mode: 'no-cors'})
            .then(response => {
                    return response.json();
                }, () => {
                    return json_survivor_list;
                }
            )
            .then(data => {
                set_survivor_list(data);
            })
    }, []);

    useEffect(() => {
        fetch(`http://${backend.host_address}:${backend.host_port}/api/survivor_perks`, {mode: 'no-cors'})
            .then(response => {
                return response.json();
            }, () => {
                return json_survivor_perk_list;
            })
            .then(data => {
                set_survivor_perk_list(data);
            })
    }, []);

    return (
        <>
            <aside id={"survivor_perk_list"}>
                {
                    survivor_list.map(
                        survivor =>
                            <SurvivorCard
                                key={survivor.survivor_id}
                                survivor={survivor}
                                perks={survivor_perk_list.filter(perk => perk.survivor_id === survivor.survivor_id)}
                            />
                    )
                }
            </aside>
        </>
    )
}

export default SurvivorRandomizer;