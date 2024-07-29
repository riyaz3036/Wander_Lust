import React, {useState, useRef, memo}from 'react'
import './features.css'
import features_vid from "../../assets/videos/features_vid.mp4";

const Features = () => {

    const featuresVidRef = useRef();

    // Function and states to handle playing and pausing videos
    const [currentVideo, setCurrentVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = (videoRef) => {
        if (currentVideo && currentVideo !== videoRef) {
            currentVideo.pause();
            setIsPlaying(false);
        }

        if (videoRef.paused) {
            videoRef.play();
            setCurrentVideo(videoRef);
            setIsPlaying(true);
        } else {
            videoRef.pause();
            setCurrentVideo(null);
            setIsPlaying(false);
        }
    };


    return (
        <div className="home_features">
            <div className="flex justify-center home_features_video">
                <div className="flex relative justify-center items-center home_features_video_main" onClick={() => handlePlayPause(featuresVidRef.current)}>

                    <video src={features_vid} ref={featuresVidRef}/>

                    {isPlaying && currentVideo === featuresVidRef.current ? (
                            <></>
                    ) : (
                            <>
                                <div className="flex justify-center items-center cursor-pointer home_features_play_button pr-1">
                                    <i class="ri-play-line"></i>
                                </div>
                                <p className="text-white absolute text-center font-medium"> Discover how our travel platform can make your adventures unforgettable!</p>
                            </>
                    )}

                </div>
            </div>

            <div className="flex flex-wrap px-5 justify-center gap-10 py-12 home_customer_reviews">
                <div className="flex flex-col items-center home_customer_review_section">
                    <p className="text-center font-lg mb-4 home_customer_review">"WanderLust made our family vacation amazing! The detailed itineraries and personalized recommendations made our trip truly memorable."</p>
                    <p className="text-center font-base font-medium home_reviewer">Aarav Patel</p>
                </div>

                <div className="flex flex-col items-center home_customer_review_section">
                    <p className="text-center font-lg mb-4 home_customer_review">"Thanks to WanderLust, our honeymoon was perfect. The suggestions for off-the-beaten-path locations and activities were just what we wanted!"</p>
                    <p className="text-center font-base font-medium home_reviewer">Ishita Sharma</p>
                </div>

                <div className="flex flex-col items-center home_customer_review_section">
                    <p className="text-center font-lg mb-4 home_customer_review">"WanderLust turned our weekend getaway into an cheerful and unforgettable experience. The local insights and tips helped us explore like a local!"</p>
                    <p className="text-center font-base font-medium home_reviewer">Rohan Gupta</p>
                </div>
            </div>


        </div>
    )
}

export default memo(Features);