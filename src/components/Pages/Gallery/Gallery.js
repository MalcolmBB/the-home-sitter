import React, {useState, useEffect}  from 'react';
import Header from '../../header/header.js';
import Footer from '../../footer/footer.js';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import {Image} from 'cloudinary-react';
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
        });
    }, [])

    return (
        <div className="GalleryDiv">
            <Header></Header>
            <div className="GalleryContainer">
                <h1 className="GalleryHeader">Gallery</h1>
                <ImageList
                    cols={3}
                    rowHeight="auto"
                    gap={0}
                    >
                    {gallery.map((data, i) => (
                        <ImageListItem onClick={console.log("gallery")}>
                            <Image key={i} cloudName="homesitterza" publicId={data.public_id} className="GalleryImage">
                            </Image>
                        </ImageListItem>
                    ))}
                </ImageList>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Gallery;
