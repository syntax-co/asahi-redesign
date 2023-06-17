import { useState } from "react";
import { motion } from "framer-motion";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import { IconContext } from "react-icons/lib";

const ImageContainer = ({ image, position }) => {
  return (
    <div
      id={`image-${position}`}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>
  );
};

const SlideshowArrows = () => {
  return (
    <div className="h-full w-full absolute">
      <div className="slideshow-left-arrow" onClick={() => {}}>
        <MdOutlineArrowBackIos size={40} />
      </div>
      <div className="slideshow-right-arrow" onClick={() => {}}>
        <MdOutlineArrowForwardIos size={40} />
      </div>
    </div>
  );
};


const SlideShowDots = ({images}) => {

  const Dot = () => {
    return(
      <div className="w-2 h-2 mx-1 rounded-lg  bg-white">

      </div>
    )
  }

  return(
    <div className="w-full h-4 absolute bottom-0 flex items-center justify-center">
      {
        images.map((item,index) => {
          return(
            <Dot key={index} />
          )
        })
      }
    </div>
  )
}


const Slideshow = ({ images }) => {
  const [layerOneImage, setLayerOneImage] = useState(0);
  const [layerTwoImage, setLayerTwoImage] = useState(1);
  const [currentLayer, setCurrentLayer] = useState(0);

  const MoveShow = (direction) => {};

  return (
    <div className="w-full h-2/6 relative">
      <motion.div
        id="item-one"
        className="slideshow-image-layer"
        initial={{ opacity: 1 }}
        animate={{ opacity: currentLayer == 0 ? 1 : 0 }}
        style={{
          backgroundImage: `url(${images[layerOneImage].url})`,
        }}
      ></motion.div>

      <motion.div
        id="item-two"
        className="slideshow-image-layer"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLayer == 1 ? 1 : 0 }}
        style={{
          backgroundImage: `url(${images[layerTwoImage].url})`,
        }}
      ></motion.div>

      <SlideshowArrows />
      <SlideShowDots images={images} />
    </div>
  );
};

export default Slideshow;
