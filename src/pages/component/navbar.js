import { useState } from "react";
import { IconContext } from "react-icons";
import { BiMenuAltRight } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import Image from "next/image";
import { motion } from "framer-motion";

const MobileMenuButton = ({ open, setOpen }) => {
  return (
    <div
      className="mobile-menu-button"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <motion.div
        className="absolute"
        initial={{ opacity: 1 }}
        animate={{ opacity: open ? 0 : 1 }}
      >
        <IconContext.Provider value={{ color: "#77cc6d" }}>
          <BiMenuAltRight size={40} />
        </IconContext.Provider>
      </motion.div>

      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
      >
        <IconContext.Provider value={{ color: "#77cc6d" }}>
          <TfiClose size={30} />
        </IconContext.Provider>
      </motion.div>
    </div>
  );
};

const NavbarLogo = () => {
  return (
    <div className="navbar-logo-holder">
      <Image src={"/images/sushi-logo.png"} width={50} height={50} alt={""} />
    </div>
  );
};

const Navbar = ({ open, setOpen }) => {
  return (
    <div className="navbar-body">
      <NavbarLogo />

      <MobileMenuButton open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
