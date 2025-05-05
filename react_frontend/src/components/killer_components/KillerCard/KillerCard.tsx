import {killer, killer_perk} from '../../../types.ts';
import "./KillerCard.scss";
import {Button, Card} from "react-bootstrap";
import KillerPerk from "../KillerPerk/KillerPerk.tsx";
import {useState} from "react";


interface KillerCardProps {
    killer: killer,
    perks: killer_perk[]
}

function KillerCard({killer, perks}: KillerCardProps) {
    const [update, set_update] = useState(0)

    function toggle_perks() {
        let disabled_perks = false
        // If any perks are disabled, button will toggle perks true
        perks.forEach((perk) => {
            if (!perk.enabled) {
                disabled_perks = true;
            }
        })

        const stored_perks = JSON.parse(localStorage.getItem("killer_perks") ?? "{}")
        perks.forEach(perk => {
            perk.enabled = disabled_perks
            stored_perks[perk.name] = disabled_perks
        })
        localStorage.setItem("killer_perks", JSON.stringify(stored_perks))
        set_update(update + 1)
    }

    return (
        <>
            <Card bg={"dark"} text={"white"} key={update}>
                <Card.Header>
                    <div id={"row_1"}>
                        <Card.Title>{killer.title}</Card.Title>
                        <Button
                            className={"float-end"}
                            variant={"dark"}
                            onClick={toggle_perks}>
                            Toggle Perks
                        </Button>
                    </div>
                    <Card.Subtitle>{killer.name}</Card.Subtitle>
                </Card.Header>
                <Card.Body>
                    <div className={"perks"}>
                        {
                            perks.map(perk =>
                                <KillerPerk
                                    key={perk.perk_id}
                                    perk={perk}
                                    enabled={perk.enabled}
                                />)
                        }
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default KillerCard;