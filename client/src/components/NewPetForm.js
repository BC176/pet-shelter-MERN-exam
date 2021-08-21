import React, { useState } from 'react'
import axios from 'axios';
import { Link, navigate } from "@reach/router";
// import { navigate } from "@reach/router";

const NewPetForm = (props) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");

    const [errors, setErrors] = useState([]);
    // const { formSubmittedBoolean, setFormSubmittedBoolean } = props;

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newPet = {
            name: name,
            type: type,
            description: description,
            skill1: skill1,
            skill2: skill2,
            skill3: skill3,
        };

        axios.post('http://localhost:8000/api/new', newPet)
            .then(res => {
                // console.log("new", res);
                navigate("/");
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                console.log('here', err);
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors([errorArr]);
            })
    };

    return (
        <>
            <form onSubmit={onSubmitHandler}>
                {errors.map((err, index) => <p key={index}>{err + " "}</p>)}
                <div>
                    <div className="mainTop">
                        <h2>Pet Shelter</h2>
                        <h5><Link className="linkHome" to={"/"}>Home</Link></h5>
                    </div>
                <h4>Know a pet needing a home? (at least 3 characters per field):</h4>
                    <div className="newFormMiddle">
                    <div>
                        <p>
                            <label>Name:</label><br />
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                        </p>
                        <p>
                            <label>Type:</label><br />
                            <input type="text" onChange={(e) => setType(e.target.value)} value={type} />
                        </p>
                        <p>
                            <label>Description:</label><br />
                            <input type="text" onChange={(e) => setDescription(e.target.value)} value={description} />
                        </p>
                        <input type="submit" className="formSubmit" />
                    </div>
                    <div>
                        <p>Skills (optional, list up to 3)</p>
                        <p>
                            <label>Skill 1:</label><br />
                            <input type="text" onChange={(e) => setSkill1(e.target.value)} value={skill1} />
                        </p>
                        <p>
                            <label>Skill 2:</label><br />
                            <input type="text" onChange={(e) => setSkill2(e.target.value)} value={skill2} />
                        </p>
                        <p>
                            <label>Skill 3:</label><br />
                            <input type="text" onChange={(e) => setSkill3(e.target.value)} value={skill3} />
                        </p>
                    </div>
                    </div>
                </div>
            </form>
        </>
    )
}
export default NewPetForm;

