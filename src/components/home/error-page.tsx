import { ReactElement } from "react";

export default function ErrorPage(): ReactElement {
  return (
    <div>
      <p className="text-5xl leading-relaxed italic">{"“Something went wrong...”"}</p>
      <p className="mt-6 text-[2rem] tracking-widest">{"— Please Refresh"}</p>
    </div>
  );
}
