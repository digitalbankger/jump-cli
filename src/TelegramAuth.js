import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebaseConfig';

const TelegramAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.TelegramLoginWidget = {
      dataOnauth: function(user) {
        auth.signInWithCustomToken(user.id)
          .then(() => {
            firestore.collection('users').doc(user.id).set({
              id: user.id,
              username: user.username,
              first_name: user.first_name,
              last_name: user.last_name,
              points: 0,
              character: '',
            });
            navigate('/profile');
          });
      }
    };
  }, [navigate]);

  return (
    <div>
      <script
        async
        src={`https://telegram.org/js/telegram-widget.js?14`}
        data-telegram-login="@jumptothemoonBot"
        data-size="large"
        data-radius="0"
        data-auth-url="https://neurobotrade.com/auth"
        data-request-access="write"
      ></script>
    </div>
  );
};

export default TelegramAuth;

