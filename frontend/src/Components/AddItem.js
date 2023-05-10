import React, {useState, useContext} from "react";
import {UserContext} from "../App";
import axios from "axios";

export function AddItem() {
    const {admin, user} = useContext(UserContext)
    // const {pList, setList} = useContext(UserContext);
    const [formData, setFormData] = useState({});
    // const [pName, setName] = useState();
    // const [pManu, setManu] = useState();
    // const [pDesc, setDesc] = useState();
    // const [pYear, setYear] = useState();
    // const [pPrice, setPrice] = useState();

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    function addItem() {
        // alert(`Adding ${formData.name} to the database...`);
        // alert(`Manufacturer: ${formData.manu}`);
        // alert(`Description: ${formData.desc}`);
        // alert(`Year: ${formData.year}`);
        // alert(`Price: ${formData.price}`);

        let pinball = {
            name: formData.name,
            manufacturer: formData.manu,
            description: formData.desc,
            year: formData.year,
            price: formData.price
        }

        axios.post('http://localhost:8080/api/pinball/addpinball', pinball)
            .then(() => {
                alert('Pinball added successfully');
            })
            .catch((err) => {
                alert(err.response.data.message);
            })
        // let pinball = {
        //     name: pName,
        //     manufacturer: pManu,
        //     description: pDesc,
        //     year: pYear,
        //     price: pPrice
        // }
        // let pList2 = [...pList, pinball];
        // setList(pList2);
    }

    // let admin = parseInt(sessionStorage.getItem("admin"));
    if (admin === true || user.admin === true) {
        return (
            <div>
                Pinball Name <input type="text" id="name" value={formData.name} onChange={handleInputChange}/> <br/>
                Pinball Manufacturer <input type="text" id="manu" value={formData.manu} onChange={handleInputChange}/> <br/>
                Pinball Description <input type="text" id="desc" value={formData.desc} onChange={handleInputChange}/> <br/>
                Pinball Year <input type="text" id="year" value={formData.year} onChange={handleInputChange}/> <br/>
                Pinball Price <input type="text" id="price" value={formData.price} onChange={handleInputChange}/> <br/>

                <button type="button" onClick={addItem}>Add Pinball</button>
            </div>
        )
    }
    else {
        return (
            <div>
                <h3>
                    You must be logged in...
                </h3>
            </div>
        )
    }

}