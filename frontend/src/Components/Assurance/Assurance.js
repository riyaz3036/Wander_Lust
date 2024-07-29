import React,{memo} from 'react'
import './assurance.css'

const Assurance=()=>{
    return (
       
    <div className="flex justify-center items-center py-20 flex-wrap assurance_main">
        <div className="assurance_section">
            <div className="flex justify-center text-3xl pb-7 assurance_logo"><i class="ri-plane-fill"></i></div>
            <p className="mb-2 text-base font-bold assurance_title text-center">Real-Time Travel Updates</p>
            <p className="text-gray-500 text-sm font-normal assurance_desc text-center">Stay informed with the latest travel updates. Get real-time information on flight schedules, delays, and more.</p>
        </div>

        <div className="w-px bg-gray-500 mx-16 assurance_partition"></div>

        <div className="assurance_section">
            <div className="flex justify-center text-3xl pb-7 assurance_logo"><i class="ri-lock-fill"></i></div>
            <p className="mb-2 text-base font-medium assurance_title text-center">Safe & Secure Bookings</p>
            <p className="text-gray-500 text-sm font-normal assurance_desc text-center">Book your travel plans with confidence. Our platform ensures your personal and payment information is protected.</p>
        </div>

        <div className="w-px bg-gray-500 mx-16 assurance_partition"></div>

        <div className="assurance_section">
            <div className="flex justify-center text-3xl pb-7 assurance_logo"><i class="ri-customer-service-2-fill"></i></div>
            <p className="mb-2 text-base font-medium assurance_title text-center">24/7 Customer Support</p>
            <p className="text-gray-500 text-sm font-normal assurance_desc text-center">We're here to help, anytime, anywhere. Our customer support team is available around the clock to assist you.</p>
        </div>
    </div>

    )
}

export default memo(Assurance);