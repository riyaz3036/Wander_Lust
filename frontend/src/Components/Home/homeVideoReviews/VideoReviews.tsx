import { memo, useRef, useState } from 'react';
import customer_rev1 from "../../../assets/videos/customer_rev1.mp4";
import customer_rev2 from "../../../assets/videos/customer_rev2.mp4";
import customer_rev3 from "../../../assets/videos/customer_rev3.mp4";
import './video-reviews.css';

const VideoReviews = () =>{

    const customerRevRef1 = useRef<HTMLVideoElement | null>(null);
    const customerRevRef2 = useRef<HTMLVideoElement | null>(null);
    const customerRevRef3 = useRef<HTMLVideoElement | null>(null);

    // Function and states to handle playing and pausing videos
    const [currentVideo, setCurrentVideo] = useState<any>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayPause = (videoRef: any) => {
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
        <div className="home_video_reviews">
            <div className="flex justify-center mb-3 home_video_reviews_title">
                <p className="font-semibold text-4xl text-center"><span>Over</span> 1000+ <span>people trust us</span></p>
            </div>
            <div className="flex justify-center home_video_reviews_subtitle">
                <p className="text-normal text-xl text-center">Discover the world with confidence. We provide the best travel deals, comprehensive guides, and exceptional customer service to make your journey unforgettable.</p>
            </div>
            <div className="flex justify-center mb-3 gap-14 home_video_reviews_main">
                <div className="relative home_reviews_section">
                    <div className="home_review_img"><video src={customer_rev1} ref={customerRevRef1} /></div>
                    <div className="flex justify-between p-5 absolute bottom-0 home_review_content">
                        <div className="home_reviewer_details">
                            <p className="text-base font-medium text-white reviewer_name">Arjun Sharma</p>
                        </div>
                        <div className="home_play_button" onClick={() => handlePlayPause(customerRevRef1.current)}>
                            {isPlaying && currentVideo === customerRevRef1.current ? (
                                <i className="ri-pause-line"></i>
                            ) : (
                                <div className=""><i className="ri-play-line"></i></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="relative home_reviews_section">
                    <div className="home_review_img"><video src={customer_rev2} ref={customerRevRef2} /></div>
                    <div className="flex justify-between p-5 absolute bottom-0 home_review_content">
                        <div className="home_reviewer_details">
                            <p className="text-base font-medium text-white reviewer_name">Vihaan Patel</p>
                        </div>
                        <div className="home_play_button" onClick={() => handlePlayPause(customerRevRef2.current)}>
                            {isPlaying && currentVideo === customerRevRef2.current ? (
                                <i className="ri-pause-line"></i>
                            ) : (
                                <div className=""><i className="ri-play-line"></i></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="relative home_reviews_section">
                    <div className="home_review_img"><video src={customer_rev3} ref={customerRevRef3} /></div>
                    <div className="flex justify-between p-5 absolute bottom-0 home_review_content">
                        <div className="home_reviewer_details">
                            <p className="text-base font-medium text-white reviewer_name">Aisha Khan</p>
                        </div>
                        <div className="home_play_button" onClick={() => handlePlayPause(customerRevRef3.current)}>
                            {isPlaying && currentVideo === customerRevRef3.current ? (
                                <i className="ri-pause-line"></i>
                            ) : (
                                <div className=""><i className="ri-play-line"></i></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default memo(VideoReviews);