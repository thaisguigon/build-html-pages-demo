import { ReactNode } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  type?: "button" | "submit";
  variant?: "contained" | "outlined";
};

export const Button = ({
  children,
  className,
  disabled,
  onClick,
  type,
  variant,
}: ButtonProps) => {
  const classNames = [styles.root, styles[variant ?? "contained"], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={classNames}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
