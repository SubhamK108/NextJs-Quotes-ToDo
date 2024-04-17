export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export const EmptyQuote: Quote = {
  id: 0,
  quote: "",
  author: ""
};
