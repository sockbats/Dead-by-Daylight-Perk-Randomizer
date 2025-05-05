import {survivor, survivor_perk} from '../../../types.ts';
import "./SurvivorCard.scss";
import {Card} from "react-bootstrap";
import SurvivorPerk from "../SurvivorPerk/SurvivorPerk.tsx";


interface SurvivorCardProps {
    survivor: survivor,
    perks: survivor_perk[]
}

function SurvivorCard({survivor, perks}: SurvivorCardProps) {

    return (
        <>
            <Card bg={"dark"} text={"white"}>
                <Card.Body>
                    <Card.Title>{survivor.name}</Card.Title>
                    <div className={"perks"}>
                        {perks.map(perk => <SurvivorPerk key={perk.perk_id} perk={perk}/>)}
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default SurvivorCard;