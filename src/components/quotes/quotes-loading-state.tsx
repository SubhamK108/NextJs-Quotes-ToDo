import { ReactElement } from "react";

export default function QuotesLoadingState(): ReactElement {
  return (
    <div className="mt-16 w-[50rem] max-sm:mt-7 max-sm:w-auto max-sm:px-10 font-sans">
      <div className="mt-5 mb-3 max-sm:mt-4 max-sm:mb-2 animate-pulse">
        <p className="mx-auto h-24 w-[46rem] max-sm:w-[19rem] bg-zinc-400 dark:bg-zinc-800 rounded"></p>
        <p className="mt-10 max-sm:mt-6 mx-auto h-11 w-[15rem] max-sm:w-[11rem] bg-zinc-400 dark:bg-zinc-800 rounded"></p>
      </div>
    </div>
  );
}
