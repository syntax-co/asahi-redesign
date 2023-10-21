import Image from "next/image";
import {FaLocationArrow,FaPhoneAlt} from 'react-icons/fa';
import { IconContext } from "react-icons";
import { useEffect } from "react";
import { motion } from "framer-motion";


const images = [
  {
    url: "./images/beef.jpg",
    caption: "Slide 1",
  },
  {
    url: "./images/plate-1.jpg",
    caption: "Slide 2",
  },
  {
    url: "./images/salad-bowl.jpg",
    caption: "Slide 3",
  },
  {
    url: "./images/sushi2.jpg",
    caption: "slide 4",
  },
];


const ImageHolder = ({image,ident, size, position,corner,delay}) => {


  return(
    <motion.div id={ident} className='absolute bg-cover bg-center rounded-full border-2 border-white bg-white'
    style={{
      backgroundImage:`url(${image})`,
    }}
    initial={{opacity:0}}
    animate={{
      opacity:1,
      transition:{
        delay:delay,
        duration:.5
      }
    }}
    whileHover={{scale:1.05}}
    >

    </motion.div>
  )
}


const Gallery = () => {

  const GalItem = ({image, rowSpan,colSpan,row=false,column=true}) => {

    return(
      <div className="bg-center bg-cover"
      style={{
        backgroundImage:`url(${image})`,
        gridColumnStart:column && colSpan[0],
        gridColumnEnd:column && colSpan[1],
        gridRowStart:row && rowSpan[0],
        gridRowEnd:row && rowSpan[1],
      }}
      >
      </div>
    )
  }

  return(
    <div id='photo-gallery' className="gallery-body" >

      <div className="w-full h-[8vh] pl-8 text-white text-4xl flex flex-col justify-center bg-darkBlue">
        Gallery
        <div className="h-1 w-2/6 bg-white rounded-full mt-2"></div>
      </div>
      
      <div className="w-full h-[92vh] grid grid-rows-5 grid-cols-8 gap-0.5">
      <GalItem image={'./images/optimized/image-10.jpg'} rowSpan={[1,3]} colSpan={[1,5]} row={true} />
      <GalItem image={'./images/optimized/image-5.jpg'} rowSpan={[3,6]} colSpan={[1,3]} row={true} />
      <GalItem image={'./images/optimized/image-2.jpg'} rowSpan={[1,4]} colSpan={[7,9]} row={true} />
      <GalItem image={'./images/optimized/image-12.jpg'} rowSpan={[1,3]} colSpan={[5,7]} row={true} />
      <GalItem image={'./images/optimized/image-6.jpg'} rowSpan={[3,6]} colSpan={[3,7]} row={true} />
      <GalItem image={'./images/optimized/image-3.jpg'} rowSpan={[4,6]} colSpan={[7,9]} row={true} />
      </div>
    </div>
  )
}

export default function Home() {

  const checkScrollToGallery = () => {
    const currentStorage = JSON.parse(localStorage.getItem('Asahi-data'));
    
    if (currentStorage['navToGallery']) {
      setTimeout(() => {
        const elem = document.querySelector('#photo-gallery');
        elem.scrollIntoView({behavior:'smooth'})

        currentStorage['navToGallery']=false;
        localStorage.setItem('Asahi-data',JSON.stringify(currentStorage));
      },700)
      
    } else {

    }
  } 


  const Present = () => {

    setTimeout(() => {
      window.scrollTo({
        top:1000,
        behavior:'smooth'
      })  
    }, 2500);

    setTimeout(() => {
      window.scrollTo({
        top:0,
        behavior:'smooth'
      })  
    }, 4500);
    

    setTimeout(() => {
      document.location.href=process.env.NEXT_PUBLIC_BASE_URL+'menu'
    }, 5500);


  }


  useEffect(() => {
    checkScrollToGallery();
    // Present();
  },[])

  return (
    <motion.div className="hompage-body"
    initial={{opacity:0}}
    animate={{opacity:1,transition:{duration:2}}}
    exit={{opacity:0}}
    >
      {/* panel 1 */}
      <div className="home-panel-1">

        

        <div className="home-panel-1-text-holder">

            <div className="hometext-1">
              Asahi Roll provides authentic Japanese cuisines and sushi.
            </div>

            <div className="hometext-2">
              Enjoy all sorts of sushi, rolls, noodles and Korean dishes!
            </div>

            <div className="mt-16">
              <div className="text-lg">
                Checkout Our Menu
              </div>
              <div className="h-12 w-22 mt-2 cursor-pointer flex items-center justify-center text-2xl border-2 border-white rounded-full"
              onClick={() => {
                document.location.href = `${process.env.NEXT_PUBLIC_BASE_URL+'menu'}`
              }}
              >
                Menu
              </div>
            </div>

        </div>



        <ImageHolder image={images[1].url} ident={'image-circle-1'}  position={[75,200]} corner='bottom-left' delay={1.2} />
        <ImageHolder image={images[2].url} ident={'image-circle-2'}  position={[400,150]} corner='bottom-right' delay={.75} />
        <ImageHolder image={images[3].url} ident={'image-circle-3'}  position={[100,350]} corner='top-right' delay={.5} />
        

      </div>

      {/* gallery */}
      
      <Gallery />

      

      {/* footer */}
      <div className="footer-body">

        <div className="footer-address-body ">
          <div className="flex items-center w-fit text-white border-b border-sushiGreen text-xl">
            <IconContext.Provider value={{
              color:'#77cc6d',
            }}>
              <FaLocationArrow size={15} />
            </IconContext.Provider>
            <div className="ml-2">
            Address
            </div>
          </div>
          <div className=" text-gray-400 text-sm mt-4">
            6803 N Sheridan Rd <br/>
            Chicago, IL 60626
          </div>
        </div>

        

        <div className="footer-address-body">
          <div className="flex items-center w-fit text-white border-b border-sushiGreen text-xl">
            <IconContext.Provider value={{
              color:'#77cc6d',
            }}>
              <FaPhoneAlt size={15} />
            </IconContext.Provider>
            <div className="ml-2">
            Phone
            </div>
          </div>
          <div className=" text-gray-400 text-sm mt-4">
            773-654-3649
          </div>
        </div>


        
        

      </div>

    </motion.div>
  );
}
