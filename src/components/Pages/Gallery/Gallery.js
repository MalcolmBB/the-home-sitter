import React, {useState, useEffect}  from 'react';
import Header from '../../header/header.js';
import Footer from '../../footer/footer.js';
import {Image} from 'cloudinary-react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import axios from 'axios';
import './Gallery.css';

// Simplebar initialisation
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

function Gallery(){
    const [gallery, setGallery] = useState(['dd']);

    useEffect(() => {
        console.log("Hello");
        axios.get('https://res.cloudinary.com/homesitterza/image/list/HomeSitter.json').then(res => {
            setGallery(res.data.resources);
        });
    }, [])

    return (
        <SimpleBar style={{ height: "100vh" }} forceVisible="y" autoHide={false}>
        <div className="GalleryDiv">
            <Header></Header>
            <div className="GalleryContainer">
                <h1 className="GalleryHeader">Gallery</h1>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry>
                        {gallery.map((data, i) => (
                            <Image key={i} cloudName="homesitterza" publicId={data.public_id} className="GalleryImage">
                            </Image>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            <Footer></Footer>
        </div>
        </SimpleBar>
    );
}

export default Gallery;
