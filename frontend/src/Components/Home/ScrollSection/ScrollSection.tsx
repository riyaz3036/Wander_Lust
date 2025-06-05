import { memo } from "react";
import travlogo1 from "../../../assets/images/travlogo1.jpg";
import travlogo2 from "../../../assets/images/travlogo2.png";
import travlogo3 from "../../../assets/images/travlogo3.jpg";
import travlogo4 from "../../../assets/images/travlogo4.jpg";
import travlogo5 from "../../../assets/images/travlogo5.jpg";
import travlogo6 from "../../../assets/images/travlogo6.jpg";
import './scroll-section.css';


const ScrollSection=()=>{
    
    return(
        <div className="home_uni_logos">
            <div className="home_uni_logo_slider">
                <img src={travlogo1}/>
                <img src={travlogo2}/>
                <img src={travlogo3}/>
                <img src={travlogo4}/>
                <img src={travlogo5}/>
                <img src={travlogo6}/>
            </div>

            <div className="home_uni_logo_slider">
                <img src={travlogo1}/>
                <img src={travlogo2}/>
                <img src={travlogo3}/>
                <img src={travlogo4}/>
                <img src={travlogo5}/>
                <img src={travlogo6}/>
            </div>         
                                         
        </div>
    )
}

export default memo(ScrollSection);