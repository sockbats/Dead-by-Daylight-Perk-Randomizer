import './KillerRandomizer.scss';
import KillerCard from "../../components/killer_components/KillerCard/KillerCard.tsx";
import json_killer_list from '../../json_data/killer_list.json';
import json_killer_perk_list from '../../json_data/killer_perk_list.json';
import {killer, killer_perk} from '../../types.ts';
import {fetch_with_timeout, get_backend_url} from '../../utils.ts'

import {useState, useEffect} from "react";
import {Button} from "react-bootstrap";
import DisplayKillerPerk from "../../components/killer_components/DisplayKillerPerk/DisplayKillerPerk.tsx";

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

    const [update, set_update] = useState(0)

    function randomize_perks() {
        // const shuffled_perks = killer_perk_list.toSorted(() => 0.5 - Math.random())
        const shuffled_perks = killer_perk_list.filter(perk => perk.enabled)
        let index = shuffled_perks.length;
        while (index > 0) {
            const random_index = Math.floor(Math.random() * index--);
            [shuffled_perks[index], shuffled_perks[random_index]] = [shuffled_perks[random_index], shuffled_perks[index]]
        }

        for (let i = 0; i < 4; i++) {
            shuffled_perks.push(empty_perk)
        }
        set_random_perk_1(random_perk_count >= 1 ? shuffled_perks[0] : empty_perk);
        set_random_perk_2(random_perk_count >= 2 ? shuffled_perks[1] : empty_perk);
        set_random_perk_3(random_perk_count >= 3 ? shuffled_perks[2] : empty_perk);
        set_random_perk_4(random_perk_count >= 4 ? shuffled_perks[3] : empty_perk);
    }

    function setup_perks(perk_list: killer_perk[]) {
        // Setup local storage of selected perks
        if (!localStorage.getItem("killer_perks")) {
            const enabled_perk_list = JSON.parse('{}')
            perk_list.forEach((perk: killer_perk) => {
                enabled_perk_list[perk.name] = true;
            })
            localStorage.setItem("killer_perks", JSON.stringify(enabled_perk_list))
        }
        // Apply stored selected perks to perk list
        const local_storage = JSON.parse(localStorage.getItem("killer_perks") ?? "{}")
        perk_list.forEach((perk: killer_perk) => {
            perk.enabled = local_storage[perk.name]
        })
        set_killer_perk_list(perk_list)
    }

    // Fetch killers
    useEffect(() => {
        fetch_with_timeout(`${backend_url}/api/killers`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                set_killer_list(data);
            }).catch(() => {
                // Fallback if no backend available
                set_killer_list(json_killer_list);
            }
        )
    }, [backend_url]);

    // Fetch killer perks
    useEffect(() => {
        fetch_with_timeout(`${backend_url}/api/killer_perks`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setup_perks(data)
            }).catch(() => {
                // Fallback if no backend available
                setup_perks(json_killer_perk_list)
            }
        )
    }, [backend_url]);

    function enable_perks() {
        const stored_perks = JSON.parse(localStorage.getItem("killer_perks") ?? "{}")
        killer_perk_list.forEach(perk => {
            perk.enabled = true
            stored_perks[perk.name] = true
        })
        localStorage.setItem("killer_perks", JSON.stringify(stored_perks))
        set_update(update + 1)
    }

    function disable_perks() {
        const stored_perks = JSON.parse(localStorage.getItem("killer_perks") ?? "{}")
        killer_perk_list.forEach(perk => {
            perk.enabled = false
            stored_perks[perk.name] = false
        })
        localStorage.setItem("killer_perks", JSON.stringify(stored_perks))
        set_update(update + 1)
    }

    return (
        <>
            <section id={"perk_randomizer"}>
                <h1>Randomizer</h1>
                <div id={"perk_display"}>
                    <div className={"flex_center_row"}>
                        <DisplayKillerPerk perk={random_perk_4}/>
                    </div>
                    <div id={"perk_display_row_2"}>
                        <DisplayKillerPerk perk={random_perk_2}/>
                        <DisplayKillerPerk perk={random_perk_3}/>
                    </div>
                    <div className={"flex_center_row"}>
                        <DisplayKillerPerk perk={random_perk_1}/>
                    </div>
                </div>
                <div id={"randomizer_buttons"} className={"flex_center_column"}>
                    Random Perk Count:
                    <span>
                    <span
                        className={"pointer_hover text-decoration-underline"}
                        onClick={() => set_random_perk_count(random_perk_count - ((random_perk_count > 0) ? 1 : 0))}>
                        [-]
                    </span>
                        {" " + random_perk_count + " "}
                        <span
                            className={"pointer_hover text-decoration-underline"}
                            onClick={() => set_random_perk_count(random_perk_count + ((random_perk_count < 4) ? 1 : 0))}>
                        [+]
                    </span>
                    </span>
                    <Button variant={"outline-light"} onClick={randomize_perks}>Randomize!</Button>
                </div>
            </section>
            <aside id={"killer_perk_list"} key={update}>
                <div id={"perk_toggles"}>
                    <Button variant={"primary"} onClick={enable_perks}>Enable All</Button>
                    <Button variant={"danger"} onClick={disable_perks}>Disable All</Button>
                </div>
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