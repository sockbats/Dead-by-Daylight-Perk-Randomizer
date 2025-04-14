import './App.scss'
import {Route, Routes} from "react-router";
import Layout from "../../components/Layout/Layout.tsx";
import Home from "../Home/Home.tsx";
import SurvivorRandomizer from "../SurvivorRandomizer/SurvivorRandomizer.tsx";
import KillerRandomizer from "../KillerRandomizer/KillerRandomizer.tsx";

function App() {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<Layout/>}>
                    <Route index element={<Home/>}/>
                    <Route path={"KillerRandomizer"} element={<KillerRandomizer/>}/>
                    <Route path={"SurvivorRandomizer"} element={<SurvivorRandomizer/>}/>
                </Route>
            </Routes>
        </>
    )
}

export default App
