import "@/styles/globals.css";
import { useState } from "react";
import { motion } from "framer-motion";

import Navbar from "./component/navbar";
import MobileMenu from "./component/navmenu";

export default function App({ Component, pageProps }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-primary">
      <MobileMenu />

      <motion.div
        className="w-screen h-screen relative"
        animate={{
          right: menuOpen ? "80%" : 0,
        }}
      >
        <Navbar open={menuOpen} setOpen={setMenuOpen} />

        <div className="w-full h-full absolute">
          <Component {...pageProps} />
        </div>
      </motion.div>
    </div>
  );
}
