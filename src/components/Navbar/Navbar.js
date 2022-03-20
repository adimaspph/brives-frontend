import React from "react";

import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar(props) {
	return (
		<nav className="navbar">
            <div className="navbar-menu">
                <Link className="navbar-logo" to="/">
                    <img src="/logo-navbar.png" width={60} alt="" />
                </Link>
			
				<Link className="navbar-menu-btn" to="/pengguna">
					<div className="navbar-text">
                        Home
                    </div>    
				</Link>
				<Link className="navbar-menu-btn" to="/dashboard">
                    <div className="navbar-text">
                        Kelas Privat
                    </div>  
				</Link>
			</div>
		</nav>
	);
}

export const MemoizedNavbar = React.memo(Navbar);