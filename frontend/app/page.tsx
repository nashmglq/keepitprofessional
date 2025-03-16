"use client";
import { useState } from "react";
import copy from "copy-to-clipboard";
import { ClipboardIcon, ArrowPathIcon  } from "@heroicons/react/24/outline";
import { postPrompt } from "../server/user";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [data, setData] = useState("");
  const [holder, setHolder] = useState("");
  const [loading, setLoading] = useState(false);

  const copyFunc = () => {
    copy(holder);
    toast.success("Copied to clipboard!", { position: "top-right", autoClose: 2000 });
  };

  const clearFunc = () => {
    setHolder("")
    setData("")
  }

  const mutation = useMutation({
    mutationFn: postPrompt,
    onMutate: () => setLoading(true),
    onSuccess: (result) => {
      if(!data) toast.error("Empty text", { position: "top-right", autoClose: 2000 });

      setLoading(false)
      setHolder(result);
    },
    onError: () => {
      setHolder("Error generating text.");
      setLoading(false)
    },
  });

  return (
    <div>
      <ToastContainer /> {/* <- Add this inside return */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 w-full max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold mb-4 font-sans">KeepItProfessional</h1>
        <p className="text-lg mb-6 text-center max-w-lg font-sans">
          An AI-powered paraphraser that transforms your casual text into a polished, professional message.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <textarea
            className="border border-gray-500 min-h-40 w-full p-4 rounded shadow-sm shadow-white"
            placeholder="Enter your text here..."
            onChange={(e) => setData(e.target.value)}
            value={data}
          ></textarea>

          <div className="relative w-full">
            <textarea
              className="border border-gray-500 min-h-40 w-full p-4 rounded-lg shadow-sm shadow-white"
              placeholder="Your professional text will appear here..."
              value={holder}
            ></textarea>

            {holder ? (<div><button
              onClick={copyFunc}
              title="Copy to clipboard"
              className="absolute bottom-2 right-2 text-white px-4 py-2 rounded"
            >
              <ClipboardIcon className="h-6 w-6 text-white-700" />
            </button>

            
              <button
                onClick={clearFunc}
                title="Clear"
                className="absolute bottom-2 right-10 text-white px-4 py-2 rounded"
              >
                <ArrowPathIcon className="h-6 w-6 text-white-700" />
              </button></div>


            ) : null}

          </div>
        </div>

        <button
          onClick={() => mutation.mutate(data)}
          className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold text-lg mt-6 shadow-md transition duration-200"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
    </div>
  );
}
