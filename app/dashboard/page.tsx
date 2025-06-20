"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [confessions, setConfessions] = useState([]);
    const [content, setContent] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const fetchConfessions = async () => {
        const res = await fetch("/api/confession");
        const data = await res.json();
        setConfessions(data);
    };

    useEffect(() => {
        fetchConfessions();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        await fetch("/api/confession", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content }),
        });

        setContent("");
        setSubmitted(true); // hide confessions after submission
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Anonymous Confessions</h1>

            <form onSubmit={handleSubmit} className="mb-6">
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write your confession..."
                    className="w-full border rounded p-2 h-24"
                    required
                />
                <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}
