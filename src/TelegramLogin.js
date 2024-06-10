import React, { useEffect } from 'react';

const TelegramLogin = ({ onAuth }) => {
  useEffect(() => {
    window.TelegramLoginWidget = {
      dataOnauth: user => onAuth(user)
    };

    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?7';
    script.async = true;
    script.setAttribute('data-telegram-login', 'YOUR_BOT_USERNAME');
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'false');
    script.setAttribute('data-radius', '10');
    script.setAttribute('data-auth-url', 'http://localhost:5000/auth/telegram');
    script.setAttribute('data-request-access', 'write');
    document.getElementById('telegram-login').appendChild(script);
  }, [onAuth]);

  return <div id="telegram-login"></div>;
};

export default TelegramLogin;
