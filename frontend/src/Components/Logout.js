import {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {UserContext} from "../App";

export function Logout() {
    const {setLogged, setUser, setAdmin} = useContext(UserContext);
    const navigate = useNavigate();

    setLogged(false);
    setAdmin(false)
    setUser({});
    navigate('/login');
}