import { ReactElement } from "react";

export default function ErrorPage(): ReactElement {
  return (
    <div>
      <p className="text-5xl max-sm:text-[2rem] leading-relaxed italic px-5">{"“Something went wrong...”"}</p>
      <p className="mt-6 text-[2rem] max-sm:mt-3 max-sm:text-[1.4rem] tracking-widest max-sm:tracking-wider">
        {"— Please Refresh"}
      </p>
    </div>
  );
}
