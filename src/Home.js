import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthProvider';
import { firestore, auth } from './firebase';

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (currentUser) {
      const userRef = firestore.collection('users').doc(currentUser.uid);
      userRef.get().then(doc => {
        if (doc.exists) {
          setScore(doc.data().score);
        }
      });
    }
  }, [currentUser]);

  return (
    <div>
      <h1>Welcome to Doodle Jump</h1>
      {currentUser ? (
        <div>
          <p>Logged in as: {currentUser.username}</p>
          <p>High Score: {score}</p>
          <button onClick={() => auth.signOut()}>Sign Out</button>
          <Link to="/game">
            <button>Play Game</button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <button>Log In</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
