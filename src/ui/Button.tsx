import { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonType = {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type?: string;
};

export default function Button({
  children,
  disabled,
  to,
  type = "primary",
}: ButtonType) {
  const base =
    "text-sm inline-block rounded-full bg-yellow-400  font-semibold uppercase tracking-wide  text-stone-800 transition-colors duration-300 hover:bg-yellow-300  focus:bg-yellow-300 focus:outline-none focus:ring      focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: base + " px-4 py-3 md:px-6 md:py-4",
    small: base + " px-4 py-2 md:px-5 md:py-2.5 text-xs",
    secondary:
      "px-4 text-sm py-2.5 md:px-6 md:py-3.5 border-2 border-stone-300 inline-block rounded-full font-semibold uppercase tracking-wide  text-stone-400 transition-colors duration-300 hover:bg-stone-300 focus:text-stone-800 hover:text-stone-800 focus:bg-stone-300 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed",
  };

  const className = styles[type as keyof typeof styles] || styles["primary"];
  if (to)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}
