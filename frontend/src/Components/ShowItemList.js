import React, {useState, useContext} from "react";
import {UserContext} from "../App";
import axios from "axios";


export function ShowItemList() {
    const {pinballs, setPinballs, user} = useContext(UserContext);
    const [index, setIndex] = useState(-1);

    const [formData, setFormData] = useState({
        name: "",
        manufacturer: "",
        description: "",
        year: "",
        price: ""
    })

    const setCurrentPinball = (e) => {
        setIndex(e.target.value)
        let pinball = pinballs[e.target.value];

        formData.name = pinball.name;
        formData.manufacturer = pinball.manufacturer;
        formData.description = pinball.description;
        formData.year = pinball.year;
        formData.price = pinball.price;
    }

    const savePinball = () => {
        let pinball = pinballs[index]
        let oldPinball = {
            name: pinball.name,
            manufacturer: pinball.manufacturer,
            description: pinball.description,
            year: pinball.year,
            price: pinball.price
        }

        // alert(`Old name: ${pinball.name} New name: ${formData.name}`)
        pinball.name = formData.name;
        pinball.manufacturer = formData.manufacturer;
        pinball.description = formData.description;
        pinball.year = formData.year;
        pinball.price = formData.price;

        // setCurrPinball(pinball);
        axios.post('http://localhost:8080/api/pinball/update', {
            oldPinball: oldPinball,
            newPinball: pinball
        })
            .then((response) => {
                alert(`Pinball updated successfully!`)
                const pinballs2 = [...pinballs];
                pinballs2[index] = pinball;
                setPinballs(pinballs2);
            })
            .catch((err) => {
                console.log(err)
                alert(`Error ${err.response.data.status}: ${err.response.data.message}`)
            })

        // Old code
        // --------------------------------
        // let pinball = pinballs[pID];
        //
        // pinball.name = pName;
        // pinball.manufacturer = pManu;
        // pinball.description = pDesc;
        // pinball.year = pYear;
        // pinball.price = pPrice;
        //
        // setPinball(pinball);
        //
        // let pList2 = [...pinballs];
        //
        // pList2[pID] = pinball;
        // setPinball(pinball);
        // setPinballs(pList2);
        //
    }
    const delPinball = () => {
        if (pinballs.length === 1) {
            alert("Lets keep some pinballs in the database!")
        }
        else {
            let pinball = pinballs[index]
            axios.post('http://localhost:8080/api/pinball/delete', {pinball})
                .then((response) => {
                    alert(`Pinball deleted successfully!`)
                    // window.reload.reload();
                    const pinballs2 = pinballs.filter((item, i) => i !== index);
                    setPinballs(pinballs2);
                    setCurrentPinball(index - 1);
                })
                .catch((err) => {
                    console.log(err)
                    alert(`Error ${err.response.data.status}: ${err.response.data.message}`)
                })
        }


        // Old code
        // --------------------------------
        // const pList2 = pinballs.filter((item, index) => index !== pID);
        // setPinballs(pList2);
        //
        // if (pID === pinballs.length - 1) {
        //     setID(pID + 1);
        // }
        // else {
        //     setID(0);
        // }
        //
        // let pinball = pList2[pID];
        //
        // setName(pinball.name);
        // setManu(pinball.manufacturer);
        // setDesc(pinball.description);
        // setYear(pinball.year);
        // setPrice(pinball.price);
        //
        // setPinball(pinball);
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData( (prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    return(
        <div className="row h-100">
            <div className="col-6">
                <ul>
                    {pinballs && pinballs.map((pinball, index) => {
                        return <li key={index} value={index}
                                   onClick={setCurrentPinball}>
                            {pinball.name}
                        </li>
                    })}
                </ul>
            </div>
            <div className="col-6">
                Pinball Name <input
                    type="text" name="name"
                    onChange={handleInputChange}
                    value={formData.name || ""}
                /> <br/>

                Pinball Manufacturer <input
                    type="text" name="manufacturer"
                    onChange={handleInputChange}
                    value={formData.manufacturer || ""}
                /> <br/>

                Pinball Description <input
                    type="text" name="description"
                    onChange={handleInputChange}
                    value={formData.description || ""}
                /> <br/>

                Pinball Year <input
                    type="text" name="year"
                    onChange={handleInputChange}
                    value={formData.year || ""}
                /> <br/>

                Pinball Price <input
                    type="text" name="price"
                    onChange={handleInputChange}
                    value={formData.price || ""}
                /> <br/>

                {/*Pinball Name <input id="pName" onChange={(e) => {setName(e.target.value)}} value={pName || ""}/> <br/>*/}
                {/*Pinball Manufacturer <input type="text" id="pManu" onChange={(e) => {setManu(e.target.value)}} value={pManu || ""}/> <br/>*/}
                {/*Pinball Description <input type="text" id="pDesc" onChange={(e) => {setDesc(e.target.value)}} value={pDesc || ""}/> <br/>*/}
                {/*Pinball Year <input type="text" id="pYear" onChange={(e) => {setYear(e.target.value)}} value={pYear || ""}/> <br/>*/}
                {/*Pinball Price <input type="text" id="pPrice" onChange={(e) => {setPrice(e.target.value)}} value={pPrice || ""}/> <br/>*/}


                <button type="button" onClick={savePinball}>SAVE</button>
                {(user.admin === true) &&
                    <button type="button" onClick={delPinball}>DELETE</button>
                }

            </div>
        </div>
    );
}