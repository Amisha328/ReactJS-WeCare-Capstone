import { Navbar, Nav, NavItem } from 'react-bootstrap';

function Navigation() {
    return (
        <>
            <Navbar bg="dark" style={{ "height": "55px" }}>
                <Navbar.Brand href="/" style={{ "marginTop": '10px' }}>
                    <img height="55px" alt="csp1" src={'wecare-logo.png'} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end" style={{ "marginRight": '10px', "marginTop": '10px'}}>
                    <Nav>
                        <NavItem>
                            <p className="text-muted credit">📞<b>Call Us: 080 2233447</b></p>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Navigation;