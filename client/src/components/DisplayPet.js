import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "@reach/router";

const DisplayPet = (props) => {
    const { petID, updateLikes, stateLikes } = props;
    const [petInfo, setPetInfo] = useState("");
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

    const [disableButton, setDisableButton] = useState(false);

    return (
        <>
            {petInfo ? (
                <div>
                    <h1>Here are your hopeful pets details!</h1>
                    <p>Name: {petInfo.name}</p>
                    <p>Type/Breed: {petInfo.type}</p>
                    <p>Quirks and Perks: {petInfo.description}</p>
                    <h4>Skills:</h4>
                    {petInfo.skills && petInfo.skills.map((skill, index) => 
                    <p key={index}>{skill}</p>)}
                    <h5><Link to={`/`}>Return Home</Link></h5>
                    {/* <button disabled={disableButton} onClick={() => updateLikes, setDisableButton(true)}>Likes: {stateLikes}</button> */}
                    <button onClick={updateLikes} disabled={disableButton} onClick={() => setDisableButton(true)} >Likes: {stateLikes}</button>
                </div>
            ) : (
                <h1>Loading Pet</h1>
            )}
        </>
    );
};

export default DisplayPet;