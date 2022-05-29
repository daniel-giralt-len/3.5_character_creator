import findInDb from "../functions/findInDb";

function RaceDisplay({
    id,
    dbs
}){
    const raceData = findInDb(dbs, 'races', id) || {}

    return (
        <div>
            <h3>
                Race:
            </h3>
            <div>
               {raceData.name}
            </div>
        </div>
    )
}

export default RaceDisplay;
