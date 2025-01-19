import { ReactNode } from "react";
import styles from "./Card.module.css";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div className={[styles.root, className].filter(Boolean).join(" ")}>
    {children}
  </div>
);
