'use client';
import React, { useState  } from "react";
import AIAgentService from "./aiagentservice";

export default function Bot ()
{
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [query, setQuery] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent page reload on form submission
        if(!query.trim()){
            setError('Please enter a query');
            return;
        }
        setError(''); // Clear previous errors
        setResult("");
        setIsLoading(true); // Set loading state
        try{
            var res = await AIAgentService(query);
            setResult(res);
        }catch(e){
            setError(e instanceof Error ? e.message : 'An unexpected error occurred');
        }finally {
            setIsLoading(false); // Reset loading state
        }
    }

    return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          id="query"
          placeholder="Ask your question..."
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
          className="flex-grow border rounded px-3 py-2"
          aria-label="Query input"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {result && (
        <p className="mt-4 whitespace-pre-wrap text-left text-gray-800">
          <strong>Result:</strong> {result}
        </p>
      )}
      {error && (
        <p className="mt-4 text-left text-red-600" role="alert">
          <strong>Error:</strong> {error}
        </p>
      )}
    </div>
  );
}