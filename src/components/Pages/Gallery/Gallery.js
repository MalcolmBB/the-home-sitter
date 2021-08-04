import React, {useState, useEffect}  from 'react';
import Header from '../../header/header.js';
import Footer from '../../footer/footer.js';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import {Image} from 'cloudinary-react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import axios from 'axios';
import './Gallery.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function Gallery(){
    const [gallery, setGallery] = useState(['dd']);

    useEffect(() => {
        axios.get('https://res.cloudinary.com/homesitterza/image/list/HomeSitter.json').then(res => {
            setGallery(res.data.resources);
            console.log(res.data.resources);
        });
    }, [])

    return (
        <div className="GalleryDiv">
            <Header></Header>
            <div className="GalleryContainer">
                <h1 className="GalleryHeader">Gallery</h1>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
                >
                    <Masonry>
                        {gallery.map((data, i) => (
                            <ImageListItem>
                                <Image key={i} cloudName="homesitterza" publicId={data.public_id} className="GalleryImage">
                                </Image>
                            </ImageListItem>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Gallery;
