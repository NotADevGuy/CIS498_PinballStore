import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


export function Register() {
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const capitalize = (s) => {
        return s[0].toUpperCase() + s.slice(1);
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post("http://localhost:8080/api/user/register", {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            name: (`${capitalize(formData.fname)} ${capitalize(formData.lname)}`),
            zip: formData.zip,
            admin: false
        })
            .then((response) => {
                alert("Account created successfully!")
                navigate("/login")
            })
            .catch((err) => {
                console.log(`Error: ${err.response.data.status}: ${err.response.data.message}`)
            })
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormData( (prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col">
                    <h1>Register</h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="firstName">First Name</label>
                </div>
                <div className="col">
                    <input required="Required"
                        className="form-control" type="text" id="firstName"
                        name="fname" onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="lastName">Last Name</label>
                </div>
                <div className="col">
                    <input required="Required"
                        className="form-control" type="text" id="lastName"
                        name="lname" onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="email">Email</label>
                </div>
                <div className="col">
                    <input required="Required"
                        className="form-control" type="email" id="email"
                        name="email" onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="userName">User Name</label>
                </div>
                <div className="col">
                    <input pattern="^[A-Za-z][A-Za-z0-9_]{7,29}$" required="Required"
                        className="form-control" type="text" id="userName"
                        name="username" onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="pwd">Password</label>
                </div>
                <div className="col">
                    <input pattern="^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,15}$" required="Required"
                        className="form-control" type="password" id="pwd"
                        name="password" onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <label className="col-form-label" htmlFor="zip">Zip Code</label>
                </div>
                <div className="col">
                    <input pattern="^\d{5}$" required="Required"
                        className="form-control" type="text" id="zip"
                        name="zip" onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" type="submit">Register</button>
                </div>
            </div>
        </form>
    );
}