import './Footer.scss'

function Footer() {
    const wiki_link = "https://deadbydaylight.wiki.gg/"
    const source_code_link = "https://github.com/sockbats/Dead-by-Daylight-Perk-Randomizer"

    return (
        <>
            <footer>
                <p>
                    Data sourced from <a href={wiki_link} target={"_blank"}>Dead by Daylight Wiki</a>.{" "}
                    <a href={source_code_link} target={"_blank"}>(Source Code)</a>
                </p>
            </footer>
        </>
    )
}

export default Footer;