export interface Quote {
  id: number;
  quote: string;
  author: string;
}

export const InvalidQuote: Quote = {
  id: 0,
  quote: "",
  author: ""
};
