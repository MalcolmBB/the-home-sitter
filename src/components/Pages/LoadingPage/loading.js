import React, {useEffect} from 'react';
import HouseName from './HouseName';
import LoadingPaws from './LoadingPaws';
import "./loading.css";

function Loading(props){
    useEffect(() => {

    }, [props.loading])
    return (
        <div className="LoadingDiv">
            <HouseName classes="HouseName"></HouseName>
            <LoadingPaws loading={props.loading} className="LoadingPaws"></LoadingPaws>
        </div>
    );
}

export default Loading;
