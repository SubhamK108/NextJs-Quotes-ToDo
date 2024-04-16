"use server";

import { delay } from "@/lib/utils";
import { Quote } from "@/models/Quote";
import { revalidateTag } from "next/cache";

export async function getQuote(): Promise<Quote | null> {
  await delay(1500);
  try {
    const req = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store", next: { tags: ["quotes"] } });
    if (req.ok) {
      const res: Quote = await req.json();
      return res;
    } else {
      throw new Error();
    }
  } catch {
    return null;
  }
}

export async function revalidateQuotesApi(): Promise<void> {
  revalidateTag("quotes");
}
