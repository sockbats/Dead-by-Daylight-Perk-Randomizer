import './KillerRandomizer.scss';
import KillerCard from "../../components/KillerCard/KillerCard.tsx";
import json_killer_list from '../../json_data/killer_list.json';
import json_killer_perk_list from '../../json_data/killer_perk_list.json';
import backend from '../../json_data/backend.json'
import {killer, killer_perk} from '../../types.ts';

import {useState, useEffect} from "react";
import KillerPerk from "../../components/KillerPerk/KillerPerk.tsx";
import {Button} from "react-bootstrap";

function KillerRandomizer() {
    const [killer_list, set_killer_list] = useState(new Array<killer>())
    const [killer_perk_list, set_killer_perk_list] = useState(new Array<killer_perk>())
    const random_perk = {
        perk_id: -1,
        name: "Random Perk",
        description: "",
        icon: "https://deadbydaylight.wiki.gg/images/0/06/IconModifier_chaosShuffle.png",
        killer_title: "",
        killer_id: -1
    };
    const empty_perk = {
        perk_id: -1,
        name: "Empty Perk",
        description: "",
        icon: "https://deadbydaylight.wiki.gg/images/0/06/IconModifier_chaosShuffle.png",
        killer_title: "",
        killer_id: -1
    };
    const [random_perk_1, set_random_perk_1] = useState(random_perk);
    const [random_perk_2, set_random_perk_2] = useState(random_perk);
    const [random_perk_3, set_random_perk_3] = useState(random_perk);
    const [random_perk_4, set_random_perk_4] = useState(random_perk);

    function randomize_perks() {
        set_random_perk_1(killer_perk_list[0]);
        set_random_perk_2(killer_perk_list[1]);
        set_random_perk_3(killer_perk_list[2]);
        set_random_perk_4(empty_perk);
    }

    useEffect(() => {
        fetch(`http://${backend.host_address}:${backend.host_port}/api/killers`, {mode: 'no-cors'})
            .then(response => {
                return response.json();
            }, () => {
                return json_killer_list
            })
            .then(data => {
                set_killer_list(data);
            })
    }, []);

    useEffect(() => {
        fetch(`http://${backend.host_address}:${backend.host_port}/api/killer_perks`, {mode: 'no-cors'})
            .then(response => {
                return response.json();
            }, () => {
                return json_killer_perk_list
            })
            .then(data => {
                set_killer_perk_list(data);
            })
    }, []);

    return (
        <>
            <section id={"perk_randomzier"}>
                <h1>Perk Randomizer</h1>
                <div id={"perk_display"}>
                    <KillerPerk perk={random_perk_1}/>
                    <KillerPerk perk={random_perk_2}/>
                    <KillerPerk perk={random_perk_3}/>
                    <KillerPerk perk={random_perk_4}/>
                </div>
                <Button onClick={randomize_perks}>Randomize Perks</Button>
            </section>
            <aside id={"killer_perk_list"}>
                {
                    killer_list.map(
                        killer =>
                            <KillerCard
                                key={killer.killer_id}
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