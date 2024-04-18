import { Quote } from "@/models/Quote";
import { ReactElement } from "react";

interface QuotesDisplayProps {
  Quote: Quote;
}

export default function QuotesDisplay({ Quote }: QuotesDisplayProps): ReactElement {
  return (
    <div className="mt-16 w-[50rem] max-sm:mt-7 max-sm:w-auto max-sm:px-10 font-sans">
      <div>
        <p className="text-4xl max-sm:text-[1.6rem] leading-relaxed italic">{`“${Quote.quote}”`}</p>
        <p className="mt-6 text-[1.7rem] max-sm:mt-3 max-sm:text-[1.4rem] tracking-widest max-sm:tracking-wider">{`— ${Quote.author}`}</p>
      </div>
    </div>
  );
}
