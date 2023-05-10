import React, {useContext, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {UserContext} from "../App";

export function Login() {
    const {setUser, setLogged, setAdmin, setPinballs} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        await axios.post('http://localhost:8080/api/user/login', {
            email: formData.email,
            password: formData.password
        })
            .then((response) => {
                alert(`Welcome back, ${response.data.userInfo.username}!`)

                localStorage.setItem("logged", true);
                setLogged(true);

                localStorage.setItem("user", JSON.stringify(response.data.userInfo));
                setUser(response.data.userInfo);

                localStorage.setItem("admin", response.data.userInfo.admin);
                setAdmin(response.data.userInfo.admin);
                navigate("/");
            })
            .catch((err) => {
                console.log(err)
                alert(`Error ${err.response.data.status}: ${err.response.data.message}`)
            })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <h1>Login</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="emailValue">Email</label>
                </div>
                <div className="col">
                    {/*<input pattern="^[A-Za-z][A-Za-z0-9_]{7,29}$" required="Required"*/}
                    <input required="Required"
                        className="form-control" type="email" name="email" id="emailValue" onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="passwordValue">Password</label>
                </div>
                <div className="col">
                    <input pattern="^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$" required="Required"
                        className="form-control" type="password" name="password" id="passwordValue" onChange={handleChange}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" type="submit">Login</button>
                </div>
            </div>
        </form>
    )
}