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
    <div className="mt-16 w-[50rem] max-sm:mt-7 max-sm:w-auto max-sm:px-10 font-sans">
      {loading || props.Quote.id === 0 ? (
        <div className="mt-5 mb-3 max-sm:mt-4 max-sm:mb-2 animate-pulse">
          <p className="mx-auto h-24 w-[46rem] max-sm:w-[19rem] bg-zinc-400 dark:bg-zinc-800 rounded"></p>
          <p className="mt-10 max-sm:mt-6 mx-auto h-11 w-[15rem] max-sm:w-[11rem] bg-zinc-400 dark:bg-zinc-800 rounded"></p>
        </div>
      ) : (
        <div>
          <p className="text-4xl max-sm:text-[1.6rem] leading-relaxed italic">{`“${quote.quote}”`}</p>
          <p className="mt-6 text-[1.7rem] max-sm:mt-3 max-sm:text-[1.4rem] tracking-widest max-sm:tracking-wider">{`— ${quote.author}`}</p>
        </div>
      )}
      <button
        className="mt-12 max-sm:mt-9 text-3xl max-sm:text-2xl rounded-xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44"
        onClick={getNewQuote}
        disabled={loading}
      >
        {"New Quote"}
      </button>
    </div>
  );
}
