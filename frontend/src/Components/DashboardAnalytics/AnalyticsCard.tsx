import { ReactNode } from "react";
import ColorConstants from "../../constants/ColorConstants";
import { hexToRgba } from "../../utils/color.utils";

interface AnalyticsCardProps {
    value: number;
    color: string;
    title: string;
    icon: ReactNode;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({color, value, title, icon}) => {
    return(
        <div className="analytics_display_card" style={{backgroundColor: ColorConstants.white, boxShadow: 'rgba(0, 0, 0, 0.3) 0px 2px 5px 1px' }}>
            <div className="analytics_display_card_logo" style={{backgroundColor: hexToRgba(color, 0.5)}}>
                {icon}
            </div>
            <div className="analytics_display_card_main">
                <p>{title}</p>
                <p>{value}</p>
            </div>
        </div>
    )
}

export default AnalyticsCard;