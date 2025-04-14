import "./Header.scss";
import {Nav, Navbar} from "react-bootstrap";

function Header() {

    return (
        <>
            <header>
                <Navbar>
                    <Navbar.Brand>Dead by Daylight Perk Randomizer</Navbar.Brand>
                    <Nav>
                        <Nav.Link href={"/"}>Home</Nav.Link>
                        <Nav.Link href={"/KillerRandomizer"}>Killer</Nav.Link>
                        <Nav.Link href={"/SurvivorRandomizer"}>Survivor</Nav.Link>
                    </Nav>
                </Navbar>
            </header>
        </>
    )
}

export default Header;