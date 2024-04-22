import { ReactElement } from "react";

export default function ToDosLoadingState(): ReactElement {
  return (
    <div className="mt-16 w-[50rem] max-sm:mt-7 max-sm:w-auto max-sm:px-8 font-sans">
      <div className="mt-5 mb-3 max-sm:mt-4 max-sm:mb-2 flex flex-col justify-center items-center animate-pulse">
        {[0, 1, 2, 3, 4].map((index: number) => (
          <div key={index} className="flex flex-row items-center">
            <p className="mr-5 max-sm:mr-3 h-9 w-9 mb-4 max-sm:mb-3 max-sm:h-7 max-sm:w-7 bg-zinc-400 dark:bg-zinc-800 rounded-lg"></p>
            <p className="h-9 mb-4 max-sm:mb-3 w-[35rem] max-sm:h-7 max-sm:w-[18.5rem] bg-zinc-400 dark:bg-zinc-800 rounded-lg"></p>
          </div>
        ))}
      </div>
    </div>
  );
}
