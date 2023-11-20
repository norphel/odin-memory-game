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
            <div className="container">
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
                <div className="card"></div>
            </div>
        </>
    )
}