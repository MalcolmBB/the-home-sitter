import React, { useState } from 'react';
import Header from '../../header/header.js';
import Footer from '../../footer/footer.js';
import Button from '../../button/button.js';
import {Image} from 'cloudinary-react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Dialog from '@material-ui/core/Dialog';
import './Gallery.css';

// Simplebar initialisation
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function Gallery(props){

    const [activeImage, setActiveImage] = useState(1);
    const [openImage, setOpenImage] = useState(false);

    return (
        <SimpleBar className="MainPageDiv" style={{ height: "100vh" }} forceVisible="y" autoHide={false}>
        <div className="GalleryDiv">
            <Header></Header>
            <div className="GalleryContainer">
                <h1 className="GalleryHeader">Gallery</h1>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry>
                        {props.gallery.map((data, i) => (
                            <Image
                                key={i}
                                cloudName="homesitterza"
                                onClick={() => {
                                    setActiveImage(i);
                                    setOpenImage(true);
                                }}
                                publicId={data.public_id}
                                className="GalleryImage">
                            </Image>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
                <Dialog
                    className="GalleryDialog"
                    maxWidth="xl"
                    open={openImage}
                    onClose={(event) => {
                        setOpenImage(false)
                    }}
                >
                    <div className="GalleryOpenImage">
                        <div className="headerOpenDiv">
                            <Button
                                classes="button bClose bOpenImageClose"
                                type="ActionEmpty"
                                iconName="Close"
                                onClick={(event) => (setOpenImage(false))}
                            ></Button>
                        </div>
                        <div className="contentOpenDiv">
                            <Button
                                classes="buttonOpen bPrevImage"
                                type="ActionEmpty"
                                iconName="PrevImage"
                                onClick={(event) => {
                                    let tempNext = activeImage-1;
                                    if (tempNext < 0){
                                        tempNext = props.gallery.length-1;
                                    }
                                    setActiveImage(tempNext);
                                }}
                            ></Button>
                            <Image
                                cloudName="homesitterza"
                                publicId={props.gallery[activeImage].public_id}
                                className="GalleryImageOpen">
                            </Image>
                            <Button
                                classes="buttonOpen bNextImage"
                                type="ActionEmpty"
                                iconName="NextImage"
                                onClick={(event) => {
                                    let tempNext = activeImage + 1;
                                    if (tempNext > props.gallery.length-1){
                                        tempNext = 0;
                                    }
                                    setActiveImage(tempNext);
                                }}
                            ></Button>
                        </div>
                    </div>
                </Dialog>
            </div>
            <Footer></Footer>
        </div>
        </SimpleBar>
    );
}

export default Gallery;
