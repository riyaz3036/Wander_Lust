import { useNavigate } from "react-router-dom";
import success from '../../../assets/images/success.png';
import RouteConstants from "../../../constants/RouteConstants";
import ColorConstants from "../../../constants/ColorConstants";

const Success = () => {
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate(RouteConstants.root);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white" style={{ width: '500px', position: 'relative' }}>
                <div className="relative">
                    <div className="w-full h-[300px]" style={{backgroundColor: ColorConstants.grey}}>
                        <img className="w-full object-cover" src={success} alt="Success" />
                    </div>
                    <div 
                        onClick={handleContinueShopping} 
                        className="flex items-center justify-center w-8 h-8 rounded-full absolute top-2 right-2 bg-black/20 text-base cursor-pointer text-white"
                    >
                        X
                    </div>
                </div>
                <div className="flex flex-col items-center py-12 px-10">
                    <p className="font-bold text-center text-lg md:text-xl" style={{ color: '#4A4B4D' }}>
                        Payment Successful
                    </p>
                    <p className="text-center text-sm max-w-xs">
                        Go and Book your holiday now!!
                    </p>
                    <button 
                        className="text-white mt-[40px] py-2 text-sm md:text-lg px-10 rounded" 
                        style={{ backgroundColor: '#004197' }}
                        onClick={handleContinueShopping}
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Success;
