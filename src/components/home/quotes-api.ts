"use server";

import { delay } from "@/lib/utils";
import { InvalidQuote, Quote } from "@/models/Quote";
import { revalidateTag } from "next/cache";

export async function getQuote(): Promise<Quote> {
  await delay(500);
  try {
    const res = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store", next: { tags: ["quotes"] } });
    if (res.ok) {
      const data: Quote = await res.json();
      return data;
    } else {
      throw new Error();
    }
  } catch {
    return { ...InvalidQuote };
  }
}

export async function revalidateQuotesApi(): Promise<void> {
  revalidateTag("quotes");
}
