'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Profile() {
    const [userData, setUserData] = useState<any>(null);
    const router = useRouter();

    const getUserProfile = async () => {
        try {
            const res = await axios.post('/api/users/me');
            if (res.data.success) {
                setUserData(res.data.data);
                toast.success('User fetched');
            }
        } catch (error: any) {
            console.error(error.response?.data || error.message);
            toast.error(error.response?.data?.error || 'Failed to fetch user');
        }
    };

    const logout = async () => {
        try {
            const res = await axios.get('/api/users/logout');
            if (res.data.success) {
                toast.success('Logout successful');
                router.push('/login');
            }
        } catch (error: any) {
            console.error('Error in logout:', error.response?.data || error.message);
            toast.error(error.response?.data?.error || 'Logout failed');
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            {userData ? (
                <div className="max-w-sm w-full p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
                        User Details
                    </h2>
                    <div className="mb-4 text-left text-gray-700 dark:text-gray-300 space-y-2">
                        <p><strong>Username:</strong> {userData.username}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => router.push(`/profile/${userData._id}`)}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                        >
                            See your Id by params
                        </button>
                        <button
                            onClick={logout}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-600 dark:text-gray-300 text-xl">Loading profile...</p>
            )}
        </div>
    );
}


