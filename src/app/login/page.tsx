'use client';

import React, { useEffect, useState } from 'react'
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();

    const [inputData, setInputData] = useState({
        email: "",
        password: ""
    })

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setloading] = useState(false);

    // Hit api for login
    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            setloading(true);
            const res = await axios.post("/api/users/login", inputData);
            // console.log("Signup result: ", res);

            if (res.data.success)
                router.push('/profile');

        } catch (error: any) {
            console.log("Error in Login: ", error);
            toast.error(error.response.data.message || "Something went wrong!");
        }
    }

    useEffect(() => {
        if (inputData.email.length > 0 && inputData.password.length > 0) {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true)
        }
    }, [inputData])

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={handleLogin} className="p-8 rounded-md shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-semibold text-center mb-6">Login Account</h2>

                <input
                    name="email" type="email" required
                    placeholder="Email"
                    value={inputData.email}
                    onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    name="password" type="password" required
                    placeholder="Password"
                    value={inputData.password}
                    onChange={(e) => setInputData({ ...inputData, password: e.target.value })}
                    className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    type="submit"
                    disabled={loading || isButtonDisabled}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex justify-center items-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <img src="/loader.svg" alt="loader" className="animate-spin h-5 w-5 mx-auto" />
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
        </div>
    )
}
