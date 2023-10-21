import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./component/navbar";
import MobileMenu from "./component/navmenu";


function createCartData() {
  const storageName = 'Asahi-data'
  if (!localStorage.getItem(storageName)) {
      var asahiData = {
        navToGallery:false,
        cartData:[]
      }; // Creating an empty object for the cart data

      // Check if localStorage is supported by the browser
      if (typeof(Storage) !== "undefined") {
        // Store the cartData object as a JSON string in localStorage
        localStorage.setItem(storageName, JSON.stringify(asahiData));
      
      } else {
      console.log("Sorry, localStorage is not supported in this browser.");
      }
  }
}



export default function App({ Component, pageProps }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [updateCart,setUpdateCart] = useState(false);

  useEffect(() => {
    createCartData()
  },[])


  const stepOne = () => {

    


    if (document.location.href != process.env.NEXT_PUBLIC_BASE_URL+'menu' ) {
      setTimeout(() => {
        setMenuOpen(true);
      }, 2500);
  
      setTimeout(() => {
        document.location.href = process.env.NEXT_PUBLIC_BASE_URL+'menu';
      }, 4500);
    } else {
      const openButton = document.querySelector('#Asahi-Special-Rolls-view-menu');
      
      setTimeout(() => {
        openButton.click();
      }, 2500);

      const closeButton = document.querySelector('#Asahi-Special-Rolls-close');
      // console.log(closeButton )

      // setTimeout(() => {
        
      //   // closeButton.click();
      // }, 4500);

      setTimeout(() => {
        setMenuOpen(true);
      }, 5500);

      setTimeout(() => {
        document.location.href = process.env.NEXT_PUBLIC_BASE_URL;
      },7500)


    }
    

  }

  useEffect(() => {
    // stepOne();
  }, []);

  
  return (
    <div className="font-primary w-full h-screen "
    >
      <MobileMenu setMenu={setMenuOpen} />
      
      <motion.div className="w-full h-full relative bg-darkBlue"
      animate={{
        right:menuOpen? '60%':0,
        scale:menuOpen? .95:1,
        transition:{
          duration:.3
        }
      }}  
      >
        <Navbar open={menuOpen} setOpen={setMenuOpen} />

        <AnimatePresence key='page-presence' >
          <Component key='comp-item' />
        </AnimatePresence>
        
      </motion.div>

      
    </div>
  );
}
