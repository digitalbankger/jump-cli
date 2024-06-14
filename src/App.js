import React, { useState, useEffect } from 'react';

function App() {
  const [question, setQuestion] = useState(null);
  const [character, setCharacter] = useState(null);
  const searchParams = new URLSearchParams(window.location.search);
  const telegram_id = searchParams.get('telegram_id');
  const username = searchParams.get('username');

  useEffect(() => {
    fetch('https://neurobotrade.com/question')
      .then(response => response.json())
      .then(data => setQuestion(data));
  }, []);

  const registerUser = (character) => {
    fetch('https://neurobotrade.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ telegram_id, username, character })
    })
      .then(response => response.json())
      .then(data => {
        alert(`Вы выбрали персонажа: ${character}. Игра начинается!`);
        setCharacter(character);
      })
      .catch(error => {
        console.error('Error during user registration:', error);
        alert('Произошла ошибка при регистрации. Попробуйте снова позже.');
      });
  };

  return (
    <div>
      <h1>Добро пожаловать в Jump Game!</h1>
      {question ? (
        <div>
          <p>{question.question}</p>
          {question.options.map(option => (
            <button key={option} onClick={() => registerUser(option)}>{option}</button>
          ))}
        </div>
      ) : (
        <p>Загрузка...</p>
      )}
      {character && <p>Вы выбрали: {character}</p>}
    </div>
  );
}

export default App;
