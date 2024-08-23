import React, { useState } from 'react';

const Test = () => {
    const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds

    // Logic to handle countdown and submission would go here

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold mb-6">Aptitude Test</h2>
            <p>Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                {/* Add your test questions here */}
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                    Submit Test
                </button>
            </div>
        </div>
    );
};

export default Test;
