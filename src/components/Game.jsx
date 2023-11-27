import { useState, useEffect, useRef } from "react"

function MemoryGameCards({currentScore, bestScore, setCurrentScore, setBestScore}) {
    const [images, setImages] = useState([]);
    const clickedImagesRef = useRef(new Set());
    const [triggerReRender, setTriggerReRender] = useState(false);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("https://hp-api.onrender.com/api/characters/");
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                const allImages = await response.json();
                const filteredImages = allImages.filter(image => image.image);
                const requiredImages = getRandomSubset(filteredImages, 20);
                setImages(requiredImages);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };
        fetchImages();
    }, [triggerReRender]);
    
    useEffect(() => {
        if(currentScore > bestScore) {
            setBestScore(currentScore);
        }
    }, [currentScore, bestScore]);

    const getRandomSubset = (arr, size) => {
        const subset = [];
        const selectedIndices = {};
        while(subset.length < size && subset.length < arr.length) {
            const randomIndex = Math.floor(Math.random() * arr.length);
            if(!selectedIndices[randomIndex]) {
                subset.push(arr[randomIndex]);
                selectedIndices[randomIndex] = true;
            }
        }
        return subset;
    }

    const shuffleImages = () => { //Fisher-Yates algorithm
        const shuffledImages = [...images];
        for (let i = shuffledImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledImages[i], shuffledImages[j]] = [shuffledImages[j], shuffledImages[i]];
        }
        setImages(shuffledImages);
    };

    const handleClick = (name) => {
        shuffleImages();

        if(clickedImagesRef.current.has(name)) {
            setCurrentScore(0);
            clickedImagesRef.current.clear();
        } else {
            clickedImagesRef.current.add(name);
            setCurrentScore(prevScore => prevScore + 1);
        }

        if(currentScore >= bestScore) {
            setBestScore(currentScore > bestScore ? currentScore : bestScore);
        }
    }

    const restartGame = () => {
        setCurrentScore(0);
        setBestScore(0);
        setImages([]);
        clickedImagesRef.current.clear();
        setTriggerReRender(prevState => !prevState);
    }

    const gameWon = currentScore !==0 && currentScore === images.length;

    if (gameWon) {
        return (
            <div className="congratulatePlayer">
                <h2>Congratulations!</h2>
                <button onClick={restartGame}>Play Again</button>
            </div>
        )
    } else {
        return (
            <div className="container">
                {images.map((image) => (
                    <div className="card" key={image.name} onClick={() => handleClick(image.name)}>
                        <img 
                            src={image.image} 
                            alt={image.name}
                            className="card-image" 
                        />
                        <div className="image-name">{image.name}</div>
                    </div>
                ))}
            </div>
        )
    }
}

export default function Game() {
    const [currentScore, setCurrentScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);

    return (
        <>
            <div className="titleAndScore">
                <h1>Hogwarts Memory Magic</h1>
                <table className="score">
                    <tbody>
                        <tr>
                            <th>Current Score</th>
                            <td>{currentScore}</td>
                        </tr>
                        <tr>
                            <th>Best Score</th>
                            <td>{bestScore}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <MemoryGameCards 
                currentScore={currentScore}
                bestScore={bestScore}
                setCurrentScore={setCurrentScore}
                setBestScore={setBestScore}
            />
        </>
    )
}