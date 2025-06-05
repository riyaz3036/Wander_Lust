import { useState } from "react";
import Success from "../Success/Success";
import payment from '../../../assets/images/payment.png';
import { Link, useNavigate } from "react-router-dom";
import ColorConstants from "../../../constants/ColorConstants";
import { Typography } from "antd";

interface PaymentProps {
    amount: number;
    handlePay: () => void;
    success: boolean;
    backTo: string;
}

enum PaymentMode {
    BITCOIN= 'Bitcoin',
    APPLE_WALLET= 'Apple Wallet',
    PAYPAL= 'Paypal',
    DEBIT_CARD= 'Debit/Credit Card',

}

const Payment: React.FC<PaymentProps> = ({amount, handlePay, success, backTo}) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<PaymentMode>(PaymentMode.BITCOIN);

    return (
        <div className="flex flex-wrap items-center justify-center gap-20 py-10 px-5">
            <div className="" style={{ width: '700px' }}>
                <Typography.Title>Payment</Typography.Title>
                 <Typography.Title style={{fontSize: '16px', fontWeight: 400}}>Select the mode of payment:</Typography.Title>
                <div className="flex flex-col mb-5 gap-[5px]">
                    <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4', backgroundColor: mode === PaymentMode.BITCOIN ? ColorConstants.secondaryColor : ColorConstants.white }} onClick={() => setMode(PaymentMode.BITCOIN)}>
                        <p className="m-0">Bitcoin</p>
                    </button>
                    <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4', backgroundColor: mode === PaymentMode.APPLE_WALLET ? ColorConstants.secondaryColor : ColorConstants.white }} onClick={() => setMode(PaymentMode.APPLE_WALLET)}>
                        <p className="m-0">Apple Wallet</p>
                    </button>
                    <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4', backgroundColor: mode === PaymentMode.PAYPAL ? ColorConstants.secondaryColor : ColorConstants.white }} onClick={() => setMode(PaymentMode.PAYPAL)}>
                        <p className="m-0">Paypal</p>
                    </button>
                    <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4" style={{ border: '1px solid #C4C4C4', backgroundColor: mode === PaymentMode.DEBIT_CARD ? ColorConstants.secondaryColor : ColorConstants.white }} onClick={() => setMode(PaymentMode.DEBIT_CARD)}>
                        <p className="m-0">Debit/Credit Card</p>
                    </button>
                </div>
                <div className="flex flex-wrap items-center justify-between mb-5">
                    <div className="mt-4 flex gap-1 items-center cursor-pointer" onClick={()=>navigate(backTo)}>
                       <i className="ri-arrow-left-line"></i>
                        <p className="m-0">back</p>
                    </div>
                    <button
                        className="text-white text-lg font-bold py-2 px-5"
                        style={{ backgroundColor: '#f16d5b' }}
                        onClick={handlePay}
                    >
                        Pay ₹{amount}
                    </button>
                </div>
                {success && <Success />}
            </div>
            <div className="" style={{ width: '500px' }}>
                <div className="flex flex-col justify-center items-center gap-3">
                    <img src={payment} loading="lazy" alt="Payment Options" />
                </div>
            </div>
        </div>
    )
}

export default Payment;