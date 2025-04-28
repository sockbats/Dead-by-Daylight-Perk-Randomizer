import './Footer.scss'
import {useEffect, useState} from "react";
import {fetch_with_timeout, get_backend_url} from "../../../utils.ts";
import ChangeBackendModal from "../../ChangeBackendModal/ChangeBackendModal.tsx";

function Footer() {
    const wiki_link = "https://deadbydaylight.wiki.gg/"
    const source_code_link = "https://github.com/sockbats/Dead-by-Daylight-Perk-Randomizer"
    const [backend_type, set_backend_type] = useState("Loading...")

    const backend = get_backend_url();
    const backend_url = `http://${backend.host_address}:${backend.host_port}`

    useEffect(() => {
        fetch_with_timeout(`${backend_url}/api/info`)
            .then(response => {
                if (!response.ok) throw Error(response.statusText);
                return response.json();
            })
            .then(data => {
                set_backend_type(data.backend_type);
            }).catch(() => {
                // Fallback if no backend available
                set_backend_type("None");
            }
        )
    }, [backend_url]);

    const [modal_show, set_modal_show] = useState(false);
    const handle_close = () => set_modal_show(false);
    const handle_show = () => set_modal_show(true);

    return (
        <>
            <ChangeBackendModal show={modal_show} handle_close={handle_close}/>
            <footer>
                <p>
                    Data sourced from <a href={wiki_link} target={"_blank"}>Dead by Daylight Wiki</a>.<br/>
                    Current Backend: {backend_type} <span className={"inline_button"} onClick={handle_show}>(Change Backend Address)</span><br/>
                    <a href={source_code_link} target={"_blank"}>(Source Code)</a>
                </p>
            </footer>
        </>
    )
}

export default Footer;