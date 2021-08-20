import Main from './views/Main';
import './App.css';
import { Router } from "@reach/router";
import EditPet from './components/EditPet';
import NewPetForm from './components/NewPetForm';
import DisplayPet from './components/DisplayPet';
import React, {useState} from 'react';

function App() {

  const [stateLikes, setStateLikes] = useState(0);

  const updateLikes = () => {
    console.log('hello');
    setStateLikes(stateLikes + 1);
  };

  return (
    <div className="App">
      <Router>
        <Main path="/" />
        <EditPet path=":petID/edit" />
        <NewPetForm path="/new" />
        <DisplayPet 
          stateLikes={stateLikes} 
          updateLikes={updateLikes} 
          path="/pet/:petID" 
        />
      </Router>
    </div>
  );
}

export default App;
