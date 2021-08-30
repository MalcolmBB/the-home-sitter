import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import HouseName from './HouseName';
import LoadingPaws from './LoadingPaws';
import "./loading.css";

function Loading(props){
    useEffect(() => {

    }, [props.loading])
    return (
        <div className="LoadingDiv MainPageDiv">
            { props.loading === false ? <Redirect to='/Home'/> : null}
            <HouseName classes="HouseName"></HouseName>
            <LoadingPaws className="LoadingPaws"></LoadingPaws>
        </div>
    );
}

export default Loading;
