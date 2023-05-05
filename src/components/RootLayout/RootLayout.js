import { Outlet } from "react-router-dom";

import { Footer } from "../Footer/Footer";
import { Navbar } from "../Navbar/Navbar";

import styles from "./RootLayout.module.css";

export const RootLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};
