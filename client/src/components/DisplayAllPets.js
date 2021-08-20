import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@reach/router";

const DisplayAllPets = (props) => {
    const { formSubmittedBoolean, setFormSubmittedBoolean } = props;
    const [pets, setPets] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/")
            .then(
                (allPets) => {
                    setPets(allPets.data.allPets);
                }
            )
            .catch((err) => console.log(err));
    }, [formSubmittedBoolean]);

    const deletePet = (id) => {
        axios
            .delete(`http://localhost:8000/api/${id}`)
            .then((response) => {
                setFormSubmittedBoolean(!formSubmittedBoolean);
            })
            .catch((err) => console.log(err));
    };
    return (
        <div>
            <h2>Available Pets List</h2>
            <h5><Link to={"/new"}>😼 Add a Pet for Adoption 🐶</Link></h5>
            {pets.length > 0 &&
                pets.map((pet, index) => (
                    <div key={index}>
                        <p>{pet.name}</p>
                        <h5>
                            <Link to={`/${pet._id}/edit`}>Edit Pet Details</Link>
                        </h5>
                        <button><Link to={`/pet/${pet._id}`}>Pet Details</Link></button>
                        <button onClick={() => deletePet(pet._id)}>
                            Adopt This Pet!
                        </button>
                        <hr />
                    </div>
                ))}
        </div>
    );
};

export default DisplayAllPets;