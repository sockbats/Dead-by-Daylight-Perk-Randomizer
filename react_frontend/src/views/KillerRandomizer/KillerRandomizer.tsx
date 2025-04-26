import './KillerRandomizer.scss';
import KillerCard from "../../components/KillerCard/KillerCard.tsx";
import json_killer_list from '../../json_data/killer_list.json';
import json_killer_perk_list from '../../json_data/killer_perk_list.json';
import {killer, killer_perk} from '../../types.ts';
import {get_backend_url} from '../../utils.ts'

import {useState, useEffect} from "react";
import KillerPerk from "../../components/KillerPerk/KillerPerk.tsx";
import {Button} from "react-bootstrap";

function KillerRandomizer() {
    const backend = get_backend_url();
    const backend_url = `http://${backend.host_address}:${backend.host_port}`
    const [killer_list, set_killer_list] = useState(new Array<killer>())
    const [killer_perk_list, set_killer_perk_list] = useState(new Array<killer_perk>())

    const random_perk = {
        perk_id: -1,
        name: "Random Perk",
        description: "",
        icon: "question_mark.png",
        killer_title: "",
        killer_id: -1,
        enabled: true
    };
    const empty_perk = {
        perk_id: -1,
        name: "Empty Perk",
        description: "",
        icon: "blank.png",
        killer_title: "",
        killer_id: -1,
        enabled: true
    };
    const [random_perk_1, set_random_perk_1] = useState(random_perk);
    const [random_perk_2, set_random_perk_2] = useState(random_perk);
    const [random_perk_3, set_random_perk_3] = useState(random_perk);
    const [random_perk_4, set_random_perk_4] = useState(random_perk);
    const [random_perk_count, set_random_perk_count] = useState(4);

    function randomize_perks() {
        const shuffled_perks = killer_perk_list.toSorted(() => 0.5 - Math.random())
        set_random_perk_1(random_perk_count >= 1 ? shuffled_perks[0] : empty_perk);
        set_random_perk_2(random_perk_count >= 2 ? shuffled_perks[1] : empty_perk);
        set_random_perk_3(random_perk_count >= 3 ? shuffled_perks[2] : empty_perk);
        set_random_perk_4(random_perk_count >= 4 ? shuffled_perks[3] : empty_perk);
    }

    // Fetch killers
    useEffect(() => {
        fetch(`${backend_url}/api/killers`, {mode: 'no-cors'})
            .then(response => {
                return response.json();
            }, () => {
                return json_killer_list
            })
            .then(data => {
                set_killer_list(data);
            })
    }, [backend_url]);

    // Fetch killer perks
    useEffect(() => {
        fetch(`${backend_url}/api/killer_perks`, {mode: 'no-cors'})
            .then(response => {
                return response.json();
            }, () => {
                return json_killer_perk_list
            })
            .then(data => {
                // Setup local storage of selected perks
                if (!localStorage.getItem("killer_perks")) {
                    const enabled_perk_list = JSON.parse('{}')
                    data.forEach((perk: killer_perk) => {
                        enabled_perk_list[perk.name] = true;
                    })
                    localStorage.setItem("killer_perks", JSON.stringify(enabled_perk_list))
                }
                // Apply stored selected perks to perk list
                const local_storage = JSON.parse(localStorage.getItem("killer_perks") ?? "{}")
                data.forEach((perk: killer_perk) => {
                    perk.enabled = local_storage[perk.name]
                })
                set_killer_perk_list(data)
            })
    }, [backend_url]);

    return (
        <>
            <section id={"perk_randomzier"}>
                <h1>Perk Randomizer</h1>
                <div id={"perk_display"}>
                    <KillerPerk perk={random_perk_1} enabled={true} toggleable={false}/>
                    <KillerPerk perk={random_perk_2} enabled={true} toggleable={false}/>
                    <KillerPerk perk={random_perk_3} enabled={true} toggleable={false}/>
                    <KillerPerk perk={random_perk_4} enabled={true} toggleable={false}/>
                </div>
                <Button
                    onClick={() => set_random_perk_count(random_perk_count - ((random_perk_count > 0) ? 1 : 0))}>
                    Decrease
                </Button>
                Random perk count: {random_perk_count}
                <Button
                    onClick={() => set_random_perk_count(random_perk_count + ((random_perk_count < 4) ? 1 : 0))}>
                    Increase
                </Button>
                <br/>
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