import { ReactElement } from "react";
import QuotesDisplay from "./quotes-display";
import ErrorPage from "../shared/error-page";
import QuotesHeader from "./quotes-header";
import Link from "next/link";
import { Quote } from "@/models/Quote";
import { getQuote } from "./quotes-api";

export default async function Quotes(): Promise<ReactElement> {
  const quote: Quote = await getQuote();

  return (
    <div>
      {quote.id !== 0 ? (
        <div className="h-full flex flex-col justify-center items-center text-center">
          <QuotesHeader />
          <QuotesDisplay Quote={quote} />
          <Link href="/todos">
            <button className="mt-6 mb-5 max-sm:mt-4 max-sm:mb-3 text-3xl max-sm:text-2xl rounded-xl bg-[#074DA6] dark:bg-[#05336E] hover:bg-[#05346e] dark:hover:bg-[#04234D] hover:ring hover:ring-[#0091ff] dark:hover:ring-[#074DA6] text-gray-200 p-2 h-[4.5rem] w-56 max-sm:h-16 max-sm:w-44">
              {"Today's Tasks"}
            </button>
          </Link>
        </div>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center text-center">
          <ErrorPage />
        </div>
      )}
    </div>
  );
}
