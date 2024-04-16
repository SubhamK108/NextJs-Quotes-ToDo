export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export const EmptyQuote: Quote = {
  // id: 0  => For showing loading state
  // id: -1 => For bad GET requests
  id: 0,
  quote: "",
  author: ""
};
