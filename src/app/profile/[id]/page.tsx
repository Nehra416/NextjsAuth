'use client';

import { useParams, useRouter } from 'next/navigation';

export default function page() {
    const { id } = useParams();
    const router = useRouter();

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-sm w-full p-6 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-semibold mb-4">
                    Your Id is {id}
                </h2>
                <div className="space-y-4">
                    <button
                        onClick={() => router.back()}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}