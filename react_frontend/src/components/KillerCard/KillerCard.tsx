import {killer, killer_perk} from '../../types.ts';
import "./KillerCard.scss";
import {Card} from "react-bootstrap";
import KillerPerk from "../KillerPerk/KillerPerk.tsx";


interface KillerCardProps {
    killer: killer,
    perks: killer_perk[]
}

function KillerCard({killer, perks}: KillerCardProps) {

    return (
        <>
            <Card bg={"dark"} text={"white"}>
                <Card.Body>
                    <Card.Title>{killer.title}</Card.Title>
                    <Card.Subtitle>{killer.name}</Card.Subtitle>
                    <div className={"perks"}>
                        {
                            perks.map(perk =>
                                <KillerPerk
                                    key={perk.perk_id}
                                    perk={perk}
                                    enabled={perk.enabled}
                                    toggleable={true}
                                />)
                        }
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default KillerCard;