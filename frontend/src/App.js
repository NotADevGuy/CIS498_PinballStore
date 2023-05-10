import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import {NavBar} from "./Components/NavBar";
import {Home} from "./Components/Home";
import {AddItem} from "./Components/AddItem";
import {Login} from "./Components/Login";
// import {Logout} from "./Components/Logout";
import {Register} from "./Components/Register";
import {ShowItemList} from "./Components/ShowItemList";

import React, {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext();

function App() {
    const [pinballs, setPinballs] = useState(() => {
        axios.get("http://localhost:8080/api/pinball/getAllPinballs")
            .then(response => {
                setPinballs(response.data.pinballs);
            })
            .catch((err) => {
                console.log(err.data.message)
            })
    })

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {};
    })

    const [logged, setLogged] = useState(() => {
        const storedLogged = localStorage.getItem('logged');
        return storedLogged ? JSON.parse(storedLogged) : false;
    })

    const [admin, setAdmin] = useState(() => {
        return true
        const storedAdmin = localStorage.getItem('admin');
        return storedAdmin ? JSON.parse(storedAdmin) : false;
    })


    return (
        <UserContext.Provider value={
            {user, setUser, logged, setLogged, admin, setAdmin, pinballs, setPinballs}
        }>
            <div className="App h-100 container-fluid">
                <div className="row h-25 bg-success">
                    <div className="row h-25">
                        <h1>Bailey Pinball Sales</h1>
                    </div>
                    <div className="row h-50">
                        <NavBar/>
                    </div>
                </div>

                <div className="row h-75 bg-secondary">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home/>}/>

                            <Route path="AddItem" element={<AddItem/>}/>
                            <Route path="Login" element={<Login/>}/>
                            <Route path="Register" element={<Register/>}/>
                            <Route path="Pinball" element={<ShowItemList/>}/>

                            <Route path="*" element={<Home/>}/>
                        </Routes>
                    </BrowserRouter>
                </div>
            </div>
        </UserContext.Provider>
    );
}

export default App;
