export default function Game() {
    return (
        <>
            <div className="titleAndScore">
                <h1>Hogwarts Memory Magic</h1>
                <table className="score">
                    <tr>
                        <th>Current Score</th>
                        <td>0</td>
                    </tr>
                    <tr>
                        <th>Best Score</th>
                        <td>0</td>
                    </tr>
                </table>
            </div>
            <div className="container">

            </div>
        </>
    )
}