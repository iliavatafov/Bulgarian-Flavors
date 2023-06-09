import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

import { Navbar } from "../Navbar/Navbar";
import { Footer } from "../Footer/Footer";
import { ForgotPassword } from "../Auth/ForgotPassword";
import { Login } from "../Auth/Login";
import { Profile } from "../Auth/Profile";
import { Register } from "../Auth/Register";
import { UpdateProfile } from "../Auth/UpdateProfile";

import styles from "./RootLayout.module.css";

export const RootLayout = () => {
  const modal = useSelector((state) => state.modal);

  return (
    <>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>
        {modal.login && <Login />}
        {modal.register && <Register />}
        {modal.resetPassword && <ForgotPassword />}
        {modal.profile && <Profile />}
        {modal.updateProfile && <UpdateProfile />}
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </>
  );
};
