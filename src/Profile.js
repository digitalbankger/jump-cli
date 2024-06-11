import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebaseConfig'; // Убедитесь, что этот файл находится в src

const Profile = () => {
  const [user, setUser] = useState(null);
  const [character, setCharacter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (user) {
        const userData = await firestore.collection('users').doc(user.uid).get();
        setUser(userData.data());
        setCharacter(userData.data().character);
      }
    };

    fetchUser();
  }, []);

  const selectCharacter = (choice) => {
    setCharacter(choice);
    firestore.collection('users').doc(user.id).update({
      character: choice,
    });
  };

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div>
      {user && (
        <>
          <h1>Welcome, {user.first_name}</h1>
          <p>Points: {user.points}</p>
          {!character && (
            <>
              <h2>Select your character:</h2>
              <button onClick={() => selectCharacter('Beer')}>Beer</button>
              <button onClick={() => selectCharacter('Bull')}>Bull</button>
            </>
          )}
          {character && (
            <>
              <h2>Your character: {character}</h2>
              <img src={`/${character}.png`} alt={character} />
              <button onClick={startGame}>Mine</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
