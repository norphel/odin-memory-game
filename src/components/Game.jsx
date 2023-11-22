import { useState, useEffect } from "react"

function MemoryGameCards() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("https://hp-api.onrender.com/api/characters/");
                if (!response.ok) {
                    throw new Error("Failed to fetch images");
                }
                const allImages = await response.json();
                const filteredImages = allImages.filter(image => image.image);
                const requiredImages = getRandomSubset(filteredImages, 10);
                setImages(requiredImages);
            } catch (error) {
                console.error("Error fetching images: ", error);
            }
        };
        fetchImages();
    }, []);
    
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

    const handleClick = () => {
        shuffleImages();
    }

    return (
        <div className="container">
            {images.map((image, index) => (
                <div className="card" key={index} onClick={handleClick}>
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

export default function Game() {
    return (
        <>
            <div className="titleAndScore">
                <h1>Hogwarts Memory Magic</h1>
                <table className="score">
                    <tbody>
                        <tr>
                            <th>Current Score</th>
                            <td>0</td>
                        </tr>
                        <tr>
                            <th>Best Score</th>
                            <td>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <MemoryGameCards />
        </>
    )
}