import { ReactElement, Suspense } from "react";
import Quotes from "../components/quotes/quotes";
import QuotesLoadingState from "@/components/quotes/quotes-loading-state";

export default async function Home(): Promise<ReactElement> {
  return (
    <div>
      <Suspense fallback={<QuotesLoadingState />}>
        <Quotes />
      </Suspense>
    </div>
  );
}
