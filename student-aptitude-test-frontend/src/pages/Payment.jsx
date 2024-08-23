import React from 'react';
import { handlePayment } from '../services/api';

const Payment = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Payment</h2>
            <button
                onClick={handlePayment}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
                Pay Rs 1000
            </button>
        </div>
    );
};

export default Payment;
