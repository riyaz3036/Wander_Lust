import React , {memo} from 'react'
import './register-images.css'
import reg_img1 from '../../assets/images/reg_img1.jpg'
import reg_img2 from '../../assets/images/reg_img2.jpg'
import reg_img3 from '../../assets/images/reg_img3.jpg'
import reg_img4 from '../../assets/images/reg_img4.jpg'
import reg_img5 from '../../assets/images/reg_img5.jpg'
import reg_img6 from '../../assets/images/reg_img6.jpg'
import reg_img7 from '../../assets/images/reg_img7.jpg'
import reg_img8 from '../../assets/images/reg_img8.jpg'
import reg_img9 from '../../assets/images/reg_img9.jpg'

const RegisterImages=()=>{
    return(
        <div className="flex items-center justify-center items-start register_left">
            <div className="register_photos">
                <div className="register_photos_column">
                    <div className="register_photo">
                        <img src={reg_img1} loading="lazy" alt="gallery-image"/>
                    </div>
                    <div className="register_photo">
                        <img src={reg_img2} loading="lazy" alt="gallery-image"/>
                    </div>
                    <div className="register_photo">
                        <img src={reg_img3} loading="lazy" alt="gallery-image"/>
                    </div>
                </div>
                <div className="register_photos_column">
                    <div className="register_photo">
                        <img src={reg_img4} loading="lazy" alt="gallery-image"/>
                    </div>
                    <div className="register_photo">
                        <img src={reg_img5} loading="lazy" alt="gallery-image"/>
                    </div>
                    <div className="register_photo">
                        <img src={reg_img6} loading="lazy" alt="gallery-image"/>
                    </div>
                    <div className="register_photo">
                        <img src={reg_img9} loading="lazy" alt="gallery-image"/>
                    </div>
                </div>
                <div className="register_photos_column">
                    <div className="register_photo">
                        <img src={reg_img7} loading="lazy" alt="gallery-image"/>
                    </div>
                    <div className="register_photo">
                        <img src={reg_img8} loading="lazy" alt="gallery-image"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(RegisterImages);