"use client";

import { QuotesRequestResult, getQuote } from "@/components/quotes/quotes-api";
import QuotesDisplay from "@/components/quotes/quotes-display";
import QuotesLoadingState from "@/components/quotes/quotes-loading-state";
import ErrorPage from "@/components/shared/error-page";
import Header from "@/components/shared/header";
import { EmptyQuote, Quote } from "@/models/Quote";
import Link from "next/link";
import { ReactElement, useCallback, useEffect, useRef, useState } from "react";

export default function Quotes(): ReactElement {
  const ranUseEffect = useRef<boolean>(false);
  const [quote, setQuote] = useState<Quote>(EmptyQuote);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  async function getNewQuote(): Promise<void> {
    setLoading(true);
    const data: [Quote, QuotesRequestResult] = await getQuote();
    if (data[1] === "GET_SUCCESS") {
      setQuote(data[0]);
    } else {
      setIsError(true);
    }
    setLoading(false);
  }

  const getNewQuoteCached = useCallback(getNewQuote, []);

  useEffect(() => {
    if (ranUseEffect.current || process.env.NODE_ENV !== "development") {
      getNewQuoteCached();
    }
    ranUseEffect.current = true;
  }, [getNewQuoteCached]);

  if (!loading && isError) {
    return (
      <div className="h-screen flex flex-col justify-center items-center text-center">
        <ErrorPage />
      </div>
    );
  }

  return (
    <div>
      <div className="h-full flex flex-col justify-center items-center text-center">
        <Header Heading="Quote Of The Day" />
        {loading ? <QuotesLoadingState /> : <QuotesDisplay Quote={quote} />}
        <button
          className="mt-12 max-sm:mt-9 text-3xl max-sm:text-2xl rounded-xl bg-green-700 dark:bg-green-900 hover:bg-green-900 dark:hover:bg-green-950 disabled:bg-zinc-400 dark:disabled:bg-zinc-800 hover:ring hover:ring-green-500 dark:hover:ring-green-700 disabled:ring-transparent dark:disabled:ring-transparent text-gray-200 disabled:text-zinc-300 dark:disabled:text-zinc-600 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44"
          onClick={getNewQuote}
          disabled={loading}
        >
          {"New Quote"}
        </button>
        <Link href="/todos">
          <button className="mt-6 mb-5 max-sm:mt-4 max-sm:mb-3 text-3xl max-sm:text-2xl rounded-xl bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] text-gray-200 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44">
            {"Today's Tasks"}
          </button>
        </Link>
      </div>
    </div>
  );
}
