import React from 'react';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Theme from '../Theme';
import { styled, useTheme, Button,
    Paper, Grid, Tooltip, Divider,
    List, ListItem, ListSubheader, ListItemText } from '@mui/material';

const HomeCSS = css({
    textAlign: "center",
    paddingLeft: "10px",
    fontFamily: "SmartFontUI"
})

const Item = styled(Paper)(({theme}) => ({
    textAlign: 'center',
}));

const Home:React.FC = () => {
    const [count, setCount] = React.useState(0);
    const [testNum, setTestNum] = React.useState(1);

    const darkModeContext = React.useContext(Theme.DarkModeContext);

    function handleClick() {
        setCount(count + 1);
    }

    function ButtonAdd(props: {count: number, onClick: VoidFunction}) {
        return (
            <Button onClick={props.onClick}>
                Clicked {props.count} times
            </Button>
        );
    }

    return(
        <div css={HomeCSS}>
            <h1 style={{
                paddingTop: count+"px"
            }}>TestPage</h1>
            <p>test home</p>

            <ButtonAdd count={count} onClick={handleClick} />
            <Button variant="outlined" onClick={darkModeContext.toggleDarkMode}> test </Button>
            <Button variant='contained'>test2</Button>
            <br/>
            Defaultフォントだお！
            
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <List
                        subheader={
                            <ListSubheader>ボタン追加</ListSubheader>
                        }>
                            {
                                [...Array(testNum)].map((_, i) => (
                                    <ListItemText>{i}: List</ListItemText>
                                ))
                            }
                        </List>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <p>
                    <Tooltip title="左の欄に一行追加します">
                        <Button variant='contained' color='secondary'
                        onClick={() => {setTestNum(testNum + 1)}}
                        >行を追加する</Button>
                    </Tooltip>
                    </p>
                    <p>
                    <Tooltip title="左の欄を1行消します">
                        <Button variant='contained' color='error' onClick={() => {
                            if (testNum >= 2) setTestNum(testNum - 1)
                        }}>行を削除する</Button>
                    </Tooltip>
                    </p>
                </Grid>
            </Grid>
            <p>test test</p>
        </div>
    )
}

export default Home;