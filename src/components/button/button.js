import React from 'react';
import MyIcon from '../Icon/MyIcon';
import {NavLink, Link} from 'react-router-dom';
import "./button.css"

function Button(props){
    if (props.type === "Navigation"){
        return (navButton(props));
    }
    else if (props.type === "Link"){
        // props.linkTo = process.env.PUBLIC_URL + props.linkTo;
        return (linkButton(props));
    }
    else if (props.type === "LinkEmpty"){
        // props.linkTo = process.env.PUBLIC_URL + props.linkTo;
        return (linkButtonEmpty(props));
    }
    else if (props.type === "Submit"){
        return (submitButton(props));
    }
    else if (props.type === "LogoMain"){
        return (logoButton(props));
    }
    else if (props.type === "ActionEmpty"){
        return (actionButtonEmpty(props));
    }
}

function submitButton(props){
    const {value, classes, onClick} = props;
    return (
        <button
            className = {classes}
            onClick={onClick}
        ><span>{value}</span></button>
    );
}

function navButton(props){
    const {value, classes, onClick, linkTo} = props;
    return (
        <NavLink tabIndex="-1" to={linkTo} activeClassName="activePageButton">
            <button
                className = {classes}
                onClick={onClick}>
            <span>- {value} -</span>
            </button>
        </NavLink>
    );
}

function linkButton(props){
    const {value, classes, linkTo, onClick} = props;
    return (
        <button
            className = {classes}
            onClick={onClick}
        >
            <a tabIndex="-1" href={linkTo}><span>- {value} -</span></a>
        </button>
    );
}

function linkButtonEmpty(props){
    const {classes, linkTo, onClick} = props;
    return (
        <button
            className = {classes}
            onClick={onClick}
        >
            <a tabIndex="-1" href={linkTo} target="-blank">
                <MyIcon
                    link={linkTo}
                    style={{
                        width:"var(--iconSize)",
                        height:"var(--iconSize)",
                        padding:0}}
                ></MyIcon>
            </a>

        </button>
    );
}

function actionButtonEmpty(props){
    const {classes, iconName, onClick} = props;
    return (
        <button
            className = {classes}
            onClick={onClick}
        >
                <MyIcon
                    name={iconName}
                    style={{
                        width:"var(--iconSize)",
                        height:"var(--iconSize)",
                        padding:0}}
                ></MyIcon>
        </button>
    );
}

function logoButton(props){
    const {value, classes, linkTo, onClick} = props;
    return (
        <Link tabIndex="-1" to={linkTo}>
            <button
                className = {classes}
                onClick={onClick}
            >
                <svg id="navlogoimg" className="navlogoimg" viewBox="0 0 200 200">
                      <path d="M 30.987 157.221 C 30.903 97.612 79.571 80.608 76.782 56.734 C 98.144 70.857 111.901 62.766 93.771 31.837 C 98.561 29.467 109.575 25.183 116.032 39.746 C 115.93 40.062 127.288 40.309 130.237 43.407 C 133.186 46.505 127.876 63.118 108.764 63.923 C 107.405 72.653 107.034 69.044 105.926 81.192 C 107.157 84.214 112.394 86.886 113.562 94.065 L 109.306 92.119 C 109.674 97.743 112.925 101.737 112.224 103.551 C 111.613 103.111 108.725 101.638 108.941 102.456 C 111.311 108.385 107.87 115.441 107.52 115.785 C 107.17 116.129 116.021 121.405 117.332 119.969 C 118.643 118.533 116.352 116.958 116.238 114.861 C 115.912 113.853 117.028 111.872 117.819 111.578 C 118.733 110.399 118.26 106.285 118.31 105.902 C 118.176 105.594 121.328 100.342 123.413 99.781 C 124.42 99.638 121.034 93.428 121.483 93.701 C 122 93.396 127.378 96.831 127.67 96.984 C 128.902 96.368 128.15 91.065 128.457 91.236 C 139.417 97.013 144.378 99.942 146.187 116.058 C 174.47 125.291 173.53 133.051 176.281 131.753 C 183.497 129.557 181.587 116.907 185.005 110.545 C 190.337 99.392 205.235 114.445 198.451 114.74 C 197.304 114.79 194.391 109.631 192.264 112.162 C 187.515 115.328 192.961 155.737 170.859 158.62 C 169.663 159.139 164.272 157.814 167.199 162.575 C 168.519 164.47 167.693 168.774 163.68 169.405 C 162.828 169.539 152.027 170.192 144.435 169.305 C 143.447 169.133 136.513 167.732 137.708 164.71 C 138.508 162.768 143.011 161.612 147.564 162.499 C 148.011 162.689 141.903 153.959 141.456 154.578 C 136.974 161.028 137.523 167.014 129.673 169.79 C 122.191 171.534 121.793 164.504 124.345 164.953 C 131.971 166.55 138.007 139.203 121.713 131.547 C 117.29 129.512 105.645 126.203 101.424 118.995 C 92.77 160.28 105.51 158.323 106.36 162.72 C 106.857 166.91 104.153 171.734 95.926 168.61 C 90.41 165.7 86.618 160.675 86.988 157.647 C 91.433 143.291 89.234 117.123 61.43 131.984 C 89.862 120.104 85.201 155.244 79.893 161.335 C 84.127 161.257 90.424 161.777 88.551 168.818 C 84.151 170.192 71.789 170.645 64.513 169.318 C 45.918 166.154 46.855 168.418 32.204 165.59 C 19.346 163.108 -2.88 154.604 0.362 127.034 C 1.635 129.19 5.146 133.423 6.607 131.121 C 7.52 128.968 -0.53 119.995 6.378 107.042 C 6.756 109.712 9.503 114.116 9.313 112.031 C 9.123 109.946 9.794 96.407 17.783 89.946 C 17.775 90.491 17.759 95.74 18.504 96.037 C 20.33 96.821 23.724 83.009 22.201 74.687 C 56.315 102.492 -2.284 121.275 30.987 157.221 Z M 120.569 108.64 C 119.967 108.996 120.092 109.812 120.701 110.155 C 121.106 110.316 121.54 110.242 121.756 109.863 C 122.091 109.277 121.695 108.491 121.021 108.494 C 120.902 108.511 120.672 108.579 120.569 108.64 Z M 107.32 42.25 C 106.754 43.513 107.79 44.907 109.185 44.757 C 109.687 44.648 110.119 44.335 110.378 43.897 C 111.084 42.695 110.202 41.19 108.791 41.189 C 108.144 41.258 107.582 41.663 107.32 42.25 Z"/>
                      <path d="M 89.235 31.609 C 92.677 31.357 101.888 56.43 98.062 59.034 C 93.121 62.044 83.644 58.473 78.523 52.379 C 75.871 47.773 85.235 31.172 89.235 31.609 Z">
                      </path>
                </svg>
                <h2 className="logoheader" id="logoheader">
                    <span>{value}</span>
                </h2>
            </button>
        </Link>
    );
}

export default Button;
