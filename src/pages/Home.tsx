import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Theme from '../utils/theme';
import connection from '../utils/connection';
import {
  styled,
  useTheme,
  Button,
  Paper,
  Grid,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  Box,
  TextField,
} from '@mui/material';

const HomeCSS = css({
  textAlign: 'center',
  paddingLeft: '10px',
  fontFamily: 'SmartFontUI',
});

const Item = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
}));

const Home: React.FC = () => {
  const wsContext = connection.useWs();

  const [messageInput, setMessageInput] = React.useState('');
  const [count, setCount] = React.useState(0);
  const [testNum, setTestNum] = React.useState(1);

  const darkModeContext = Theme.useDarkMode();

  function handleClick() {
    setCount(count + 1);
  }

  function ButtonAdd(props: { count: number; onClick: VoidFunction }) {
    return <Button onClick={props.onClick}>Clicked {props.count} times</Button>;
  }

  return (
    <div css={HomeCSS}>
      <h1
        style={{
          paddingTop: count + 'px',
        }}
      >
        TestPage
      </h1>
      <p>test home</p>

      <p>
        <ButtonAdd count={count} onClick={handleClick} />
        <Button variant="outlined" onClick={darkModeContext.toggleDarkMode}>
          {' '}
          test{' '}
        </Button>
        <Button variant="contained">test2</Button>
      </p>
      <p>Defaultフォントだお！</p>

      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <Item>
            <List subheader={<></>}>
              <ListItem sx={{ textAlign: 'center' }}>
                <ListItemText>
                  <h4>受信履歴</h4>
                </ListItemText>
              </ListItem>
              <ListSubheader>セッションID: {wsContext.sessionId}</ListSubheader>
              <Box
                sx={{
                  textAlign: 'left',
                }}
              >
                {wsContext.messageHistory
                  .slice()
                  .reverse()
                  .map((jsonData, i) => (
                    <ListItem>
                      <ListItemText>
                        {wsContext.messageHistory.length - i}
                      </ListItemText>
                      <ListItemText>{jsonData.type}</ListItemText>
                      {jsonData.message ? (
                        <ListItemText>{jsonData.message}</ListItemText>
                      ) : null}
                      {jsonData.result ? (
                        <ListItemText>{jsonData.result}</ListItemText>
                      ) : null}
                    </ListItem>
                  ))}
              </Box>
            </List>
          </Item>
        </Grid>
        <Grid item xs={6} md={4}>
          <p>
            <TextField
              error={messageInput == ''}
              helperText={messageInput == '' ? '入力してください' : ''}
              id="outlined-basic"
              label="文字を入力"
              variant="outlined"
              value={messageInput} // ここ重要
              onChange={(event) => {
                const inputValue = event.target.value;
                setMessageInput(inputValue);
              }}
            />
          </p>
          <p>
            <Tooltip title="メッセージをサーバーに送信します">
              <Button
                variant="contained"
                color="secondary"
                disabled={messageInput == ''}
                onClick={() => {
                  wsContext.sendJsonMessage({
                    type: 'sendMessage',
                    targetSessionId: wsContext.sessionId,
                    message: messageInput,
                  });
                }}
              >
                サーバーへ送信
              </Button>
            </Tooltip>

            <Tooltip title="入力欄をリセット">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setMessageInput('');
                }}
              >
                リセット
              </Button>
            </Tooltip>
          </p>
        </Grid>

        <Grid item xs={9}>
          <Item>
            <List subheader={<ListSubheader>ボタン追加</ListSubheader>}>
              {[...Array(testNum)].map((_, i) => (
                <ListItem>
                  <ListItemText>{i}:</ListItemText>
                  <ListItemText>List</ListItemText>
                </ListItem>
              ))}
            </List>
          </Item>
        </Grid>
        <Grid item xs={3}>
          <p>
            <Tooltip title="左の欄に一行追加します">
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setTestNum(testNum + 1);
                }}
              >
                行を追加する
              </Button>
            </Tooltip>
          </p>
          <p>
            <Tooltip title="左の欄を1行消します">
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  if (testNum >= 2) setTestNum(testNum - 1);
                }}
              >
                行を削除する
              </Button>
            </Tooltip>
          </p>
        </Grid>
      </Grid>

      <p>test test</p>
    </div>
  );
};

export default Home;
