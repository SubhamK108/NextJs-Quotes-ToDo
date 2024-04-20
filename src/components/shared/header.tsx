import { ReactElement } from "react";

interface HeaderProps {
  Heading: string;
}

export default function Header({ Heading }: HeaderProps): ReactElement {
  return (
    <div>
      <p className="mt-28 text-8xl max-sm:mt-10 max-sm:text-[2.8rem] max-sm:px-24 font-sans font-bold tracking-wider">
        {Heading}
      </p>
    </div>
  );
}
