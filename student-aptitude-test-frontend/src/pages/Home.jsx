import React from 'react';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">Welcome to the Student Aptitude Test</h1>
            <p className="text-lg mb-4">Register now and take the test to assess your skills!</p>
            <a href="/register" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">Get Started</a>
        </div>
    );
};

export default Home;
