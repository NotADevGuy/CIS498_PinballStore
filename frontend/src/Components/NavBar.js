import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";
export function NavBar() {
    const {
        logged, admin, user,
        setLogged, setAdmin, setUser
    } = useContext(UserContext);

    const handleLogout = () => {
        localStorage.clear()
        setLogged(false);
        setUser({});
        setAdmin(false);
    }

    return(
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a href="/Home" className="navbar-brand">Pinball Store</a>
                    {logged===true && <p>Hello, {user.name}</p>}
                    {/*<p>Hello, {user.name}</p>*/}
                    {/*<p>Login = {logged} Admin = {admin}</p>*/}
                </div>

                <ul className="nav">
                    <li><a href="/Pinball" className="nav-link">Pinball Machines</a></li>

                    <li>
                        {(admin===true || user.admin === true)?(
                            <a href="/AddItem" className="nav-link">Add Pinball</a>
                        ):""}
                    </li>

                </ul>

                {(logged===false)?(
                    <ul className="nav navbar-right">

                        <li>
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li>
                            <a className="nav-link" href="/register">Register</a>
                        </li>
                    </ul>
                ):(
                    <ul className="nav navbar-right">
                        <li>
                            <a onClick={handleLogout} className="nav-link">
                                Logout
                            </a>
                        </li>
                    </ul>
                )}

            </div>
        </nav>
    );
}