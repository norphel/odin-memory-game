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
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, size);
    }

    return (
        <div className="container">
            {images.map((image, index) => (
                <div className="card" key={index}>
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