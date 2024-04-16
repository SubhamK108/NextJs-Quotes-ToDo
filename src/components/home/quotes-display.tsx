"use client";

import { Quote } from "@/models/Quote";
import { ReactElement, useEffect, useState } from "react";
import { revalidateQuotesApi } from "./quotes-api";

interface QuotesDisplayProps {
  Quote: Quote;
}

export default function QuotesDisplay(props: QuotesDisplayProps): ReactElement {
  const [quote, setQuote] = useState<Quote>(props.Quote);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setQuote(props.Quote);
    setLoading(false);
  }, [props]);

  function getNewQuote(): void {
    setLoading(true);
    revalidateQuotesApi();
  }

  return (
    <div className="mt-12 w-[50rem] font-sans">
      {loading ? (
        <div className="mt-10 mb-3 animate-pulse">
          <p className="mt-5 mx-auto h-24 w-[46rem] bg-zinc-800 rounded"></p>
          <p className="mt-12 mx-auto h-11 w-[15rem] bg-zinc-800 rounded"></p>
        </div>
      ) : (
        <div>
          <p className="mt-5 text-4xl leading-relaxed italic">{`“${quote.quote}”`}</p>
          <p className="mt-6 text-[1.7rem] tracking-widest">{`— ${quote.author}`}</p>
        </div>
      )}
      <button
        className="mt-12 text-3xl max-sm:text-2xl rounded-xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44"
        onClick={getNewQuote}
        disabled={loading}
      >
        {"New Quote"}
      </button>
    </div>
  );
}
