import { useState } from 'react';

import Header from './Header.jsx';
import Main from './Main.jsx';
import '../styles/App.css'


export default function App() {
    const [gameStart, setGameStart] = useState(false);

    function handleClick() {
        setGameStart(true);
    }
    
    if (gameStart === false) {
        return (
            <>
                <h1 id='title'>Hogwarts Memory Magic</h1>
                <button id='startButton' onClick={ handleClick }>Start</button>
            </>
        )
    } else {
        return (
            <>
                <Header />
                <Main />
            </>
        )
    }
    
}