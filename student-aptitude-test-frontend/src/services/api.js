import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/' // Update this if your backend server is running on a different port
});

export const registerUser = async (userData) => {
    const response = await api.post('/api/user/register', userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await api.post('/api/user/login', userData);
    return response.data;
};

export const makePayment = async () => {
    const response = await api.post('/api/user/payment');
    return response.data;
};

export const handlePayment = async () => {
    const order = await makePayment();
    const options = {
        key: 'your_key_id',
        amount: order.amount,
        currency: 'INR',
        name: 'Student Aptitude Test',
        description: 'Test Fee',
        order_id: order.id,
        handler: function (response) {
            alert('Payment Successful');
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
};
