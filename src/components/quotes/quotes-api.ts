"use server";

import { delay } from "@/lib/utils";
import { EmptyQuote, Quote } from "@/models/Quote";
import { revalidateTag } from "next/cache";

export type QuotesRequestResult = "NOT_MADE" | "GET_SUCCESS" | "GET_FAIL";

export async function getQuote(): Promise<[Quote, QuotesRequestResult]> {
  await delay(500);
  try {
    const res = await fetch("https://dummyjson.com/quotes/random", { cache: "no-store", next: { tags: ["quotes"] } });
    if (res.ok) {
      const data: Quote = await res.json();
      return [data, "GET_SUCCESS"];
    } else {
      throw new Error();
    }
  } catch {
    return [EmptyQuote, "GET_FAIL"];
  }
}

export async function revalidateQuotesApi(): Promise<void> {
  revalidateTag("quotes");
}
