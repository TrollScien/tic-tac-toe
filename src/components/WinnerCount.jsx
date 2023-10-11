import { TURNS } from "../constants";

export function WinnerCount({ winnersCount }){
    
    return (
        <section className="">
            <h2 className="winner-count-title">Victorias</h2>
            <div className="winner-count">
                <p>{TURNS.X}: {winnersCount["❌"]}</p>
                <p>{TURNS.O}: {winnersCount["⚪"]}</p>
            </div>
        </section>
    )
}