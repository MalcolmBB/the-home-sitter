import React from 'react';
import Clamp from 'react-multiline-clamp';
import './Card.css';

// {paragraph.map((par, key) => (
// <p key={key} style={{whiteSpace:"pre-line",}}>
//     {par}
// </p>
// ))}

function Card({type, date, name, summary, paragraph, classes = "Card", onClick}){
if (type === "TestPage"){
        classes += " TestPage"
        return (
                <div className={classes} onClick={onClick}>
                    <h4 className="nameHeader">{name}</h4>
                    <h5 className="dateHeader">{date}</h5>
                        <div>
                            <p>{summary}</p>
                        </div>
                </div>
        )
    }
    return (
            <div className="homeDisplayCard">
                <div className={classes}>
                    <h4>{date}</h4>
                    <div>
                        <p>{summary}</p>
                    </div>
                </div>
                <div className="homeDisplayMore">
                    <Clamp lines={5}>
                        <p>{paragraph}</p>
                    </Clamp>
                </div>
            </div>
    )
}


export default Card;
