"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CompleteProfilePage() {
  const { user, isLoaded } = useUser();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  if (!isLoaded) return null;

  const saveProfile = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);
    
    try {
      await user?.update({
        firstName,
        lastName,
       
      });
     
      router.replace("/");
      router.refresh(); 


    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* الخلفية المماثلة لصفحة تسجيل الدخول */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105 blur-[2px]"
        style={{ backgroundImage: "url('/images/background.png')" }}
      ></div>

      <div className="relative z-10 w-full max-w-[420px] mx-4 rounded-[2.5rem] shadow-2xl overflow-hidden bg-white flex flex-col border border-white/90 ">
        
        <div className="bg-[#1a1a1a] pt-12 pb-10 text-center w-full shadow-lg">
          <div className="flex justify-center items-center mb-4">
            <img
              className="w-40 h-auto object-contain"
              src="/images/icons/logo-rm-bg.png"
              alt="Pentella"
            />
          </div>
          <p className="text-[11px] tracking-[0.4em] uppercase text-[#cfa893] font-medium opacity-90">
            Complete Your Profile
          </p>
        </div>
        <div className="px-8 pt-10 pb-12 w-full flex flex-col gap-6">
          <div className="text-center mb-2">
            <h2 className="text-xl font-bold text-[#1a1a1a]">Almost there!</h2>
            <p className="text-gray-500 text-sm mt-1">Please provide your details to continue</p>
          </div>

          <div className="space-y-4">

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">First Name</label>
              <input
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={(e) => {setFirstName(e.target.value); setError("");}}
                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm focus:border-[#d6a38c] focus:ring-1 focus:ring-[#d6a38c] outline-none bg-white transition-all"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-gray-700 ml-1">Last Name</label>
              <input
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={(e) => {setLastName(e.target.value); setError("");}}
                className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm focus:border-[#d6a38c] focus:ring-1 focus:ring-[#d6a38c] outline-none bg-white transition-all"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-medium text-center bg-red-50 py-2 rounded-lg border border-red-100">
              {error}
            </p>
          )}

          <button
            onClick={saveProfile}
            disabled={loading}
            className={`w-full rounded-xl bg-[#c48c74] py-3 text-white font-bold hover:bg-[#b67b63] transition-all normal-case text-base shadow-md mt-2 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : "Finish Setup"}
          </button>
        </div>

        <div className="bg-gray-50/50 border-t border-gray-100 py-6 text-center">
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
            Secured by Pentella Cloud
          </p>
        </div>
      </div>
    </div>
  );
}
