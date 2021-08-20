import React, { useState } from 'react'
import DisplayAllPets from '../components/DisplayAllPets';

const Main = () => {
    const [formSubmittedBoolean, setFormSubmittedBoolean] = useState(false);
    // const [stateLikes, setStateLikes] = useState(0);

    return (
        <div>
            <DisplayAllPets
                formSubmittedBoolean={formSubmittedBoolean}
                setFormSubmittedBoolean={setFormSubmittedBoolean} />
        </div>
    )
}

export default Main;
