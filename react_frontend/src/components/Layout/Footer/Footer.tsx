import './Footer.scss'
import {useEffect, useState} from "react";
import backend from "../../../json_data/backend.json";

function Footer() {
    const wiki_link = "https://deadbydaylight.wiki.gg/"
    const source_code_link = "https://github.com/sockbats/Dead-by-Daylight-Perk-Randomizer"
    const [backend_type, set_backend_type] = useState("")

    useEffect(() => {
        fetch(`http://${backend.host_address}:${backend.host_port}/api/info`, {mode: 'no-cors'})
            .then(response => {
                return response.json();
            }, () => {
                return {backend_type: "None"}
            })
            .then(data => {
                set_backend_type(data.backend_type);
            })
    }, []);

    return (
        <>
            <footer>
                <p>
                    <span>Data sourced from <a href={wiki_link} target={"_blank"}>Dead by Daylight Wiki</a>. </span>
                    <span>Current Backend: {backend_type} </span>
                    <a href={source_code_link} target={"_blank"}>(Source Code)</a>
                </p>
            </footer>
        </>
    )
}

export default Footer;