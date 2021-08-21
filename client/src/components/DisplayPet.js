import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { Link } from "@reach/router";

const DisplayPet = (props) => {
    const { petID, updateLikes, stateLikes } = props;
    const [petInfo, setPetInfo] = useState("");
    // const { formSubmittedBoolean, setFormSubmittedBoolean } = props;
    const {removeFromDom} = ""
    // const [ stateLikes, setStateLikes] = useState ("")

    // const updateLikes = () => {
    //     console.log('hello');
    //     setStateLikes(stateLikes + 1);
    //   };

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/pet/${petID}`)
            .then((queriedPet) => {
                console.log(queriedPet.data.pet);
                setPetInfo(queriedPet.data.pet);
            })
            .catch((err) => console.log(err.response));
    }, []);

    const deletePet = (id) => {
        axios
            .delete(`http://localhost:8000/api/${id}`)
            .then(response => {
                // setFormSubmittedBoolean(!formSubmittedBoolean);
                console.log("you deleted a pet");
                removeFromDom(id);
            })
            .catch((err) => console.log(err));
    };

    // const [disableButton, setDisableButton] = useState(false);
    // // if (stateLikes) {
    // //     setDisableButton;
    // // }
    // const disabled = {disableButton};
    let btnRef = useRef();

    return (
        <>
            {petInfo ? (
                <div>
                    <div className="mainTop">
                        <h2>Pet Shelter</h2>
                        <h5><Link className="linkHome" to={`/`}>Home</Link></h5>
                    </div>
                    <div className="mainTop">
                        <p>Details About: {petInfo.name}</p>
                        <Link link to={'/'}><button onClick={() => deletePet(petInfo._id)}>Adopt This Pet!</button></Link>
                    </div>
                    <div className="displayPetMiddle">
                        <p>Pet Type: {petInfo.type}</p>
                        <p>Description: {petInfo.description}</p>
                        <div className="quirksAndPerks">
                            <h4>Quirks and Perks:</h4>
                            {petInfo.skills && petInfo.skills.map((skill, index) => 
                            <div className="listReturn" key={index}>{skill+(' ')}</div>
                            )}
                        </div>
                        {/* <h5><Link to={`/`}>Return Home</Link></h5> */}
                        {/* <button disabled={disableButton} onClick={() => updateLikes, setDisableButton(true)}>Likes: {stateLikes}</button> */}
                        {/* <button onClick={updateLikes} disabled={disableButton} onClick={() => setDisableButton(true)} >Likes: {stateLikes}</button> */}
                        <button ref={btnRef} onClick={(() => {
                            // disabled=(disableButton)
                            if (btnRef.current) {
                                btnRef.current.setAttribute("disabled", "disabled");
                                updateLikes(stateLikes);
                            } 
                            // else {
                            //     // disabled={stateLikes}
                            //     updateLikes(stateLikes);
                            // } disableButton=!disableButton
                        })}>Likes: {stateLikes}</button>
                    </div>
                </div>
            ) : (
                <Link to={"/"}>Return home</Link>
            )}
        </>
    );
};

export default DisplayPet;