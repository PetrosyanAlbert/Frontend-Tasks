"use client";

import { useRouter } from "next/navigation";  
import { useState } from "react";

export default function AddUser() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState<number | "">("");
    const [loading, setLoading] = useState(false);

    const handleCreate = async () => {
        if (!name || !email || !age) return;
        await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                age: Number(age),
            }),
        });
        router.push("/");
    };

    return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md border border-green-500/40 rounded-xl p-8 bg-black shadow-[0_0_30px_rgba(34,197,94,0.15)]">

        <h2 className="text-green-400 text-2xl font-bold mb-6 text-center">
          Create User
        </h2>

        <div className="flex flex-col gap-4">

          <input
            className="bg-black border border-green-500/40 text-green-300 placeholder-green-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="bg-black border border-green-500/40 text-green-300 placeholder-green-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="number"
            className="bg-black border border-green-500/40 text-green-300 placeholder-green-700 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="mt-4 bg-green-500/10 border border-green-500 text-green-400 py-2 rounded-lg font-semibold 
                       hover:bg-green-500 hover:text-black transition-all duration-200 disabled:opacity-40"
          >
            {loading ? "Creating..." : "Create User"}
          </button>

        </div>
      </div>
    </div>
  );
}
