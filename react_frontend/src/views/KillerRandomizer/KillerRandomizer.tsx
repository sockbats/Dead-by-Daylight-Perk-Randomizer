import './KillerRandomizer.scss';
import KillerCard from "../../components/KillerCard/KillerCard.tsx";
import killer_list from '../../../public/killer_list.json';
import killer_perk_list from '../../../public/killer_perk_list.json';

function KillerRandomizer() {
    return (
        <>
            <aside id={"killer_perk_list"}>
                {
                    killer_list.map(killer => <KillerCard killer={killer}
                                perks={[killer_perk_list[0], killer_perk_list[1], killer_perk_list[2]]}/>)
                }
            </aside>
        </>
    )
}

export default KillerRandomizer;