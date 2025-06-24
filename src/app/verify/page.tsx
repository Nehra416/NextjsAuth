'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function verify() {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const searchParams = useSearchParams();

    // Hit api for verify email
    const verifyByEmail = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/verify", { token });
            // console.log("verifyByEmail response: ", response)

            if (response.data.success)
                setVerified(true);

        } catch (error: any) {
            setErrorMessage(error.response.data.error || "Something went wrong");
            console.log("Error in verify: ", error.response.data)
        } finally {
            setLoading(false);
        }
    }

    // Get Token on first render
    useEffect(() => {
        const urlToken = searchParams.get("token");

        if (urlToken)
            setToken(urlToken || "");

        // By js if we want
        // const urlToken2 = window.location.search.split("=")[1];
        // setToken(urlToken2 || "");

    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="p-8 rounded shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-semibold mb-4">Email Verification</h1>

                {!verified ? (
                    <>
                        <p className="mb-6 text-gray-600">
                            Click the button below to verify your email.
                        </p>
                        <button
                            onClick={verifyByEmail}
                            disabled={loading || !token}
                            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded cursor-pointer hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <img src="/loader.svg" alt="loader" className="animate-spin h-5 w-5 mx-auto" />
                            ) : (
                                "Verify"
                            )}
                        </button>

                        {errorMessage && <p className="mt-4 text-red-500 text-sm">{errorMessage}</p>}
                    </>
                ) : (
                    <>
                        <p className="text-green-600 font-semibold mb-6">
                            Your email has been verified successfully!
                        </p>
                        <Link
                            href="/login"
                            className="inline-block w-full bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700"
                        >
                            Continue to Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
