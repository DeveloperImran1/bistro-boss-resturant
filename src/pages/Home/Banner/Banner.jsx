import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import img1 from '../../../assets/home/01.jpg';
import img2 from '../../../assets/home/02.jpg';
import img3 from '../../../assets/home/03.png';
import img4 from '../../../assets/home/04.jpg';
import img5 from '../../../assets/home/05.png';
import img6 from '../../../assets/home/06.png';
import { useEffect, useRef } from 'react';
import videoFile from "./car.mp4"
const Banner = () => {
    const videoRef = useRef(null);

 
    useEffect(() => {
        // Auto play the video when the component mounts
        if (videoRef.current) {
          videoRef.current.play().catch(error => {
            console.error('Error attempting to play the video:', error);
          });
        }
      }, []); //
    return (
        <Carousel>
            {/* <div> */}
                <video ref={videoRef}  >
                    <source src={videoFile} type="video/mp4" />

                </video>
            {/* </div> */}
            <div>
                <img src={img1} />
            </div>
            <div>
                <img src={img2} />
            </div>
            <div>
                <img src={img3} />
            </div>
            <div>
                <img src={img4} />
            </div>
            <div>
                <img src={img5} />
            </div>
            <div>
                <img src={img6} />
            </div>
        </Carousel>
    );
};

export default Banner;