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

    // const deletePet = (id) => {
    //     axios
    //         .delete(`http://localhost:8000/api/${id}`)
    //         .then((response) => {
    //             setFormSubmittedBoolean(!formSubmittedBoolean);
    //         })
    //         .catch((err) => console.log(err));
    // };

    const sortedPets = pets;

    sortedPets.sort((a, b) => (a.type > b.type) ? 1: -1);

    return (
        <div>
            <div className="mainTop">
                <h2>Pet Shelter</h2>
                <h5><Link className="linkHome" to={"/new"}>😼 Add a Pet for Adoption 🐶</Link></h5>
            </div>
            <h5>These pets are looking for a good home:</h5>
            <div classname="sortedList">
            <table className="tableDisplayAll">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
            {sortedPets.length > 0 &&
                sortedPets.map((pet, index) => (
                    <tr key={index}>
                        <td>{pet.name}</td>
                        <td>{pet.type}</td>
                        <td><Link to={`/pet/${pet._id}`}>Pet Details | </Link>
                        <Link to={`/${pet._id}/edit`}>Edit Pet Details</Link></td>
                        {/* <button onClick={() => deletePet(pet._id)}>
                            Adopt This Pet!
                        </button> */}
                        <hr />
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>
    );
};

export default DisplayAllPets;