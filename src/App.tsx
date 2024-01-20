import { messageToJson, wsContext } from './utils/connection';
import useWebSocket from 'react-use-websocket';
import { FC, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
  GlobalStyles,
} from '@mui/material';

import { Theme, DarkModeContext } from './utils/theme';
import Header from './components/headers/Header';
import Home from './pages/Home';
import { wsMessage } from './types/connection';
import systemConf from './configs/systemConf';

const App: FC = () => {
  //////// websocket
  const [sessionId, setSessionId] = useState('');
  const [messageHistory, setMessageHistory] = useState<wsMessage[]>([]);
  const {
    // sendMessage,
    sendJsonMessage,
    lastMessage,
    // lastJsonMessage,
    // readyState,
    // getWebSocket,
  } = useWebSocket(systemConf.wsServer.url, {
    onOpen: () => {
      console.log('start connection!');
    },
    shouldReconnect: (closeEvent) => {
      console.log('reconnecting...');
      return true;
    },
  });

  useEffect(() => {
    // on message
    if (!lastMessage) return;

    const jsonData = messageToJson(lastMessage.data);
    if (messageHistory.length >= 100) {
      // 履歴 100以上は消してく
      setMessageHistory(messageHistory.slice(1).concat(jsonData));
    } else {
      setMessageHistory(messageHistory.concat(jsonData));
    }

    // init したりするよう
    switch (jsonData.type) {
      case 'createSession':
        setSessionId(jsonData.sessionId!);
        break;
      default:
        break;
    }
  }, [lastMessage, setMessageHistory]);

  // useEffect(() => { // on message history
  //     console.log(messageHistory)
  // }, [messageHistory])

  //////// darkmode
  const [darkMode, setDarkMode] = useState(false);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  useEffect(() => {
    // OSのtheme変更時
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true);
    } else if (localStorage.getItem('darkMode') === 'false') {
      setDarkMode(false);
    } else if (prefersDarkMode) {
      // クライアントのtheme
      setDarkMode(true);
    } else {
      setDarkMode(false);
    }
  }, [prefersDarkMode]);

  return (
    <wsContext.Provider
      value={{
        sessionId: sessionId,
        lastMessage: lastMessage,
        messageHistory: messageHistory,
        sendJsonMessage: sendJsonMessage,
      }}
    >
      <DarkModeContext.Provider
        value={useMemo(
          () => ({
            toggleDarkMode: () => {
              setDarkMode((prevDarkMode: boolean) => {
                if (prevDarkMode) {
                  localStorage.setItem('darkMode', 'false');
                  return false;
                } else {
                  localStorage.setItem('darkMode', 'true');
                  return true;
                }
              });
            },
            setDarkMode: (darkMode: Boolean) => {
              setDarkMode(() => {
                if (darkMode) {
                  localStorage.setItem('darkMode', 'true');
                  return true;
                } else {
                  localStorage.setItem('darkMode', 'false');
                  return false;
                }
              });
            },
            state: darkMode,
          }),
          []
        )}
      >
        <ThemeProvider theme={Theme(darkMode)}>
          <CssBaseline />
          <GlobalStyles
            styles={(theme) => ({
              a: {
                color: theme.palette.secondary.light,
                textDecoration: 'none',
                transition: '0.2s',
              },
              'a:hover': {
                color: theme.palette.secondary.dark,
              },
            })}
          />
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </DarkModeContext.Provider>
    </wsContext.Provider>
  );
};

export default App;
