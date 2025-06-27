import ColorConstants from '../../../constants/ColorConstants';
import { hexToRgba } from '../../../utils/color.utils';
import './loading-overlay.css';


const PageLoader = () => {
    return(
        <div className="flex flex-col items-center justify-center" style={{ backgroundColor: hexToRgba(ColorConstants.secondaryColor, 0.5), position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1000}}>
            <div className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default PageLoader;