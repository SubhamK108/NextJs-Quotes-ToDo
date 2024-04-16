import { ReactElement, Suspense } from "react";
import Quotes from "../components/home/quotes";
import { CircularSpinnerLarge } from "../components/shared/spinners";

export default async function Home(): Promise<ReactElement> {
  return (
    <div>
      <Suspense
        fallback={
          <div className="h-screen flex flex-col justify-center items-center text-center">
            <CircularSpinnerLarge />
          </div>
        }
      >
        <Quotes />
      </Suspense>
    </div>
  );
}
