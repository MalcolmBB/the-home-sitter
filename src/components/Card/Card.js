import React from 'react';
import Clamp from 'react-multiline-clamp';
import {Link} from 'react-router-dom';
import './Card.css';

function Card({type, date, name, summary, paragraph, classes = "Card", onClick, linkTo}){
if (type === "TestPage"){
        classes += " TestPage"
        return (
                <div className={classes} onClick={onClick}>
                    <div className="content">
                        <svg
                            className="quote"
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                        >
                          <path d="M13 14.725C13 9.584 16.892 4.206 23 3l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746A5.213 5.213 0 0124 16.021C24 19.203 21.416 21 18.801 21 15.786 21 13 18.695 13 14.725zm-13 0C0 9.584 3.892 4.206 10 3l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746A5.213 5.213 0 0111 16.021C11 19.203 8.416 21 5.801 21 2.786 21 0 18.695 0 14.725z" />
                        </svg>
                        <p>{summary}</p>
                    </div>
                    <div className="details">
                        <h4 className="nameHeader">{name}</h4>
                        <h5 className="dateHeader">{date}</h5>
                    </div>
                </div>
        )
    }
    return (
        <Link tabIndex="-1" to={linkTo}>
            <div className="homeDisplayCard" onClick={onClick}>
                <div className={classes}>
                    <h4>{name}</h4>
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
        </Link>
    )
}


export default Card;
