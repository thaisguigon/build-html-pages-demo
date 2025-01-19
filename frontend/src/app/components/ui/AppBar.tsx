import styles from "./AppBar.module.css";

type AppBarProps = {
  title: string;
};

export const AppBar = ({ title }: AppBarProps) => (
  <header className={styles.header}>
    <h1>{title}</h1>
  </header>
);
