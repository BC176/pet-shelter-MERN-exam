import { navigate } from "@reach/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";

const EditPet = (props) => {
    const { petID } = props;
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [description, setDescription] = useState("");
    // const [skills, setSkills] = useState([]);
    const [skill1, setSkill1] = useState("");
    const [skill2, setSkill2] = useState("");
    const [skill3, setSkill3] = useState("");
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pet/${petID}`)
            .then((queriedPet) => {
                setName(queriedPet.data.pet.name);
                setType(queriedPet.data.pet.type);
                setDescription(queriedPet.data.pet.description);
                // setSkill1(queriedPet.data.pet.skill1);
                // setSkill2(queriedPet.data.pet.skill2);
                // setSkill3(queriedPet.data.pet.skill3);
                if (queriedPet.data.pet.skills[0]) {
                    setSkill1(queriedPet.data.pet.skills[0]);
                }
                if (queriedPet.data.pet.skills[1]) {
                    setSkill2(queriedPet.data.pet.skills[1]);
                }
                if (queriedPet.data.pet.skills[2]) {
                    setSkill3(queriedPet.data.pet.skills[2]);
                }
                
            })
            .catch((err) => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:8000/api/${petID}`, {
                name,
                type,
                description,
                skill1,
                skill2,
                skill3,
            })
            .then((updatedDoc) => navigate("/"))
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
        <div>
            <form onSubmit={handleSubmit}>
                {errors.map((err, index) => <p key={index}>{err + " "}</p>)}
                <div>
                    Name:{""}
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    Type:{""}
                    <input
                        type="text"
                        name="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        id="type">
                    </input>
                </div>
                <div>
                    Description:{""}
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        id="description">
                    </input>
                </div>
                <div>
                    Skill 1:{""}
                    <input
                        type="text"
                        name="skill1"
                        value={skill1}
                        onChange={(e) => setSkill1(e.target.value)}
                        id="skill1">
                    </input>
                </div>
                <div>
                    Skill 2:{""}
                    <input
                        type="text"
                        name="skill2"
                        value={skill2}
                        onChange={(e) => setSkill2(e.target.value)}
                        id="skill2">
                    </input>
                </div>
                <div>
                    Skill 3:{""}
                    <input
                        type="text"
                        name="skill3"
                        value={skill3}
                        onChange={(e) => setSkill3(e.target.value)}
                        id="skill3">
                    </input>
                </div>
                <button>Confirm Edit</button>
                <button><Link to={"/"}>Cancel</Link></button>
            </form>
        </div>
    );
};

export default EditPet;