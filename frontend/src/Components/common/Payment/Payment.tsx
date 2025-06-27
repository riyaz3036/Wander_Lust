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
    BITCOIN = 'Bitcoin',
    APPLE_WALLET = 'Apple Wallet',
    PAYPAL = 'Paypal',
    DEBIT_CARD = 'Debit/Credit Card',

}

const PaymentModes: { title: string, value: PaymentMode }[] = [
    { title: "Bitcoin", value: PaymentMode.BITCOIN },
    { title: "Apple Wallet", value: PaymentMode.APPLE_WALLET },
    { title: "Paypal", value: PaymentMode.PAYPAL },
    { title: "Debit/Credit Card", value: PaymentMode.DEBIT_CARD },
]

const Payment: React.FC<PaymentProps> = ({ amount, handlePay, success, backTo }) => {
    const navigate = useNavigate();
    const [mode, setMode] = useState<PaymentMode>(PaymentMode.BITCOIN);

    return (
        <div className="flex flex-wrap items-center justify-center gap-20 py-10 px-5">
            <div className="" style={{ width: '700px' }}>
                <Typography.Title>Payment</Typography.Title>
                <Typography.Title style={{ fontSize: '16px', fontWeight: 400 }}>Select the mode of payment:</Typography.Title>
                <div className="flex flex-col mb-5 gap-[5px]">
                    {PaymentModes.map((paymentMode) => (
                        <button className="flex gap-2 items-center w-full sm:w-1/2 py-2 px-4 rounded-[5px]" style={{ border: '1px solid #C4C4C4', backgroundColor: mode === paymentMode.value ? ColorConstants.darkGrey : ColorConstants.white }} onClick={() => setMode(paymentMode.value)}>
                            <p className="m-0 font-medium">{paymentMode.title}</p>
                        </button>
                    ))}
                </div>
                <div className="flex flex-wrap items-center justify-between mb-5">
                    <button
                        className="text-white text-[16px] font-medium py-[5px] px-[24px] rounded-[5px] flex gap-[5px]"
                        style={{ backgroundColor: ColorConstants.darkGrey2 }}
                        onClick={() => navigate(backTo)}
                    >
                        <i className="ri-arrow-left-line"></i>
                        <p className="m-0">back</p>
                    </button>
                    <button
                        className="text-white text-[16px] font-medium py-[5px] px-[24px] rounded-[5px]"
                        style={{ backgroundColor: ColorConstants.secondaryColor }}
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