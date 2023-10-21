import { useState,useEffect } from "react";
import { IconContext } from "react-icons";
import { BiMenuAltRight } from "react-icons/bi";
import { TfiClose } from "react-icons/tfi";
import Image from "next/image";
import { motion } from "framer-motion";
import menuOptions from "../../josn_files/menu_options.json";

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
        <IconContext.Provider value={{ color: "white" }}>
          <BiMenuAltRight size={40} />
        </IconContext.Provider>
      </motion.div>

      <motion.div
        className="absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: open ? 1 : 0 }}
      >
        <IconContext.Provider value={{ color: "white" }}>
          <TfiClose size={30} />
        </IconContext.Provider>
      </motion.div>
    </div>
  );
};

const NavbarLogo = () => {
  return (
    <div className="navbar-logo-holder">
      <Image src={"/images/sushi-logo3.png"} width={50} height={50} alt={""} />
      <div className="ml-3 text-3xl">
        Asahi Roll
      </div>
    </div>
  );
};


const NavItem = ({ label, path}) => {
  const [onPage,setOnPage] = useState(false);
  const [hovering,setHovering] = useState(false);

  const navTo = () => {
    if (path.includes('#')) {
      const currentStorage = JSON.parse(localStorage.getItem('Asahi-data'))
      
      currentStorage['navToGallery'] = true;
      localStorage.setItem('Asahi-data',JSON.stringify(currentStorage));

      
      if (document.location.href != process.env.NEXT_PUBLIC_BASE_URL) {
        document.location.href=process.env.NEXT_PUBLIC_BASE_URL;
      } else {
        const elem = document.querySelector('#photo-gallery');
        elem.scrollIntoView({behavior:'smooth'})
      }

      
    } else {
      document.location.href=path;
    }
  }

  useEffect(() => {
      
      if(path != '/') {
          if (document.location.href == process.env.NEXT_PUBLIC_BASE_URL+path) {
              setOnPage(true)
          }
      } else {
          if (document.location.href == process.env.NEXT_PUBLIC_BASE_URL) {
              setOnPage(true)
          }
      }
  },[]);

  return (
      <div 
      className="browser-nav-item"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={() => {
          navTo();
      }}
      >
        <motion.div
        className=" h-1 rounded-sm absolute bottom-0 bg-white"
        initial={{width:0}}
        animate={{width:(hovering || onPage)? '100%':0}}
        >
          
        </motion.div>
        <div className="absolute text-xl">
          {label}
        </div>
      </div>
  );
};

const BrowserNav = () => {

  

  return(
    <div className="browser-nav-body">
      {
        Object.keys(menuOptions).map((key) => {
            const itemData = menuOptions[key];

            return (
                <NavItem key={key} 
                label={key} 
                path={itemData.path}
                />
            )
        })
      }
    </div>
  )
}


const Navbar = ({ open, setOpen }) => {
  return (
    <div className="navbar-body">
      <NavbarLogo />


      <BrowserNav />


      <MobileMenuButton open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
