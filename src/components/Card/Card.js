import React from 'react';
import './Card.css';

function Card({type, date, summary, paragraph, classes = "Card", animKey}){
if (type === "Empty"){
        classes += " Empty"
        return (

                <div className={classes}>
                    <h4>{date}</h4>
                        <div>
                            {paragraph.map((par, key) => (
                            <p key={key} style={{whiteSpace:"pre-line",}}>
                                {par}
                            </p>
                            ))}
                        </div>
                </div>
        )
    }
    return (
            <div className={classes}>
                <h4>{date}</h4>
                <div>
                    <p>{summary}</p>
                </div>
            </div>
    )
}


export default Card;
