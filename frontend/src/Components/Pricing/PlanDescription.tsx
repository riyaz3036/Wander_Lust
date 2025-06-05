import { ReactNode } from "react";
import { UserMembership } from "../../enums/user-membership.enum";

interface PlanDescriptionProps {
    plan: UserMembership
    point1: ReactNode;
    point2: ReactNode;
    point3: ReactNode;
}
const PlanDescription: React.FC<PlanDescriptionProps> = ({plan, point1, point2, point3}) => {
    return(
        <div className="pricing_plan_desc_card">
            <p className="pricing_plan_desc_card_title">{plan} Plan</p>
            <div className="pricing_plan_desc_card_element">
                <i className="ri-checkbox-circle-fill"></i>
                {point1}
            </div>
            <div className="pricing_plan_desc_card_element">
                <i className="ri-checkbox-circle-fill"></i>
                {point2}
            </div>
            <div className="pricing_plan_desc_card_element">
                <i className="ri-checkbox-circle-fill"></i>
                {point3}
            </div>
        </div>
    )
}

export default PlanDescription;