import { useState } from 'react';

import Game from './Game.jsx';
import '../styles/App.css'


export default function App() {
    const [gameStart, setGameStart] = useState(false);

    function handleClick() {
        setGameStart(true);
        const root = document.querySelector("#root");
        root.classList.add("game");
    }

    if (gameStart === false) {
        return (
            <>
                <h1 id='title'>Hogwarts Memory Magic</h1>
                <button type="button" id='startButton' onClick={ handleClick }>Start</button>
            </>
        )
    } else {
        return (
            <>
                <Game />
            </>
        )
    }
    
}