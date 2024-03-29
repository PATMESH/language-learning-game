import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-scroll";
import { useNavigate} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBook, faSignOutAlt, faUserCircle, faBars } from "@fortawesome/free-solid-svg-icons";

const CustomNavbar = ({ page }) => {
  const name = localStorage.getItem("name");
  const isAuthenticated = !!name;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  const handleDropdownItemClick = (path, navigate) => {
    setOpen(false);
    if (path === '/') {
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("learn");
    }
    navigate(path);
  };
  

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="custom-navbar">
      <Navbar.Brand onClick={()=>navigate("/")} style={{cursor:'pointer'}}>LangVerse</Navbar.Brand>
      <Navbar.Collapse id="navbar-nav">
        {page === "home" ? (
          <Nav className="ml-auto">
            <Link to="learnmore" spy={true} smooth={true} offset={-70} duration={500}>
              <Nav.Link>About Us</Nav.Link>
            </Link>
            <Link to="contact" spy={true} smooth={true} offset={-70} duration={500}>
              <Nav.Link>Contact</Nav.Link>
            </Link>
            <Link to="login" spy={true} smooth={true} offset={-70} duration={500}>
              <Button
                className="btn-get-started"
                variant="outline-info"
                onClick={handleGetStartedClick}
              >
                Get Started
              </Button>
            </Link>
          </Nav>
        ) : (
          <Nav className="ml-auto">
            {isAuthenticated ? (
              <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={() => setOpen(!open)}>
                  <p>{name}</p><FontAwesomeIcon icon={faUserCircle} className="dropdown-icon"/>&nbsp;<FontAwesomeIcon icon={faBars}/>
                </div>

                <div className={`dropdown-menu ${open ? 'active' : 'inactive'}`}>
                  <ul>
                    <DropdownItem icon={faUser} text={'My Profile'} path="/profile" handleDropdownItemClick={handleDropdownItemClick} />
                    <DropdownItem icon={faBook} text={'Learnings'} path="/mylearnings" handleDropdownItemClick={handleDropdownItemClick} />
                    <DropdownItem icon={faSignOutAlt} text={'Logout'} path="/" handleDropdownItemClick={handleDropdownItemClick} />
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <Link to="login" spy={true} smooth={true} offset={-70} duration={500}>
                  <Button
                    className="btn-get-started"
                    variant="outline-info"
                    onClick={() => navigate("/")}
                  >
                    Home
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

const DropdownItem = ({ icon, text, path, handleDropdownItemClick }) => {
  const navigate = useNavigate();

  return (
    <li className="dropdownItem">
      <div onClick={() => handleDropdownItemClick(path, navigate)}>
        <FontAwesomeIcon icon={icon} style={{ marginRight: '5px' }} />
        {text}
      </div>
    </li>
  );
};


export default CustomNavbar;
