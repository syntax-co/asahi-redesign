import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
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

const SlideshowArrows = ({ change, position }) => {
  return (
    <div className="h-full w-full absolute">
      <div
        className="slideshow-left-arrow"
        onClick={() => {
          change("left");
        }}
      >
        <MdOutlineArrowBackIos size={40} />
      </div>
      <div
        className="slideshow-right-arrow"
        onClick={() => {
          change("right");
        }}
      >
        <MdOutlineArrowForwardIos size={40} />
      </div>
    </div>
  );
};

const Dot = ({dotPosition,cPosition}) => {
    
  return (
    <motion.div
      className="w-2 h-2 mx-1 rounded-lg "
      initial={{ backgroundColor: "#ffffff" }}
      animate={{
        backgroundColor: dotPosition == cPosition ? "#77cc6d" : "#ffffff",
      }}
    ></motion.div>
  );
};

const SlideShowDots = ({ images, position }) => {
  

  return (
    <div className="w-full h-4 absolute bottom-0 flex items-center justify-center">
      {images.map((item, index) => {
        return <Dot key={index} dotPosition={index} cPosition={position} />;
      })}
    </div>
  );
};

const Slideshow = ({ images }) => {
  const [layerOneImage, setLayerOneImage] = useState(0);
  const [layerTwoImage, setLayerTwoImage] = useState(1);
  const layerOneControls = useAnimationControls();
  const layerTwoControls = useAnimationControls();
  const [currentLayer, setCurrentLayer] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const slideInterval = useRef(null);
  const [slideTrigger,setSlideTrigger] = useState(0);

  const changePosition = (direction) => {
    
    if (direction == "right") {
      if (currentPosition == images.length - 1) {
        setCurrentPosition(0);
      } else {
        setCurrentPosition(currentPosition + 1);
      }
    } else if (direction == "left") {
      if (currentPosition == 0) {
        setCurrentPosition(images.length - 1);
      } else {
        setCurrentPosition(currentPosition - 1);
      }
    }
  };

  const MoveShow = (direction) => {
    
    if (currentLayer == 0) {
      layerOneControls.start({
        opacity: 0,
        transition:{
          duration:.5
        }
      });
      layerTwoControls.start({
        opacity: 1,
        transition:{
          duration:.5
        }
      });

      setTimeout(() => {
        if (direction == "right") {
          if (layerTwoImage == images.length - 1) {
            setLayerOneImage(0);
          } else {
            setLayerOneImage(layerTwoImage + 1);
          }
        } else if (direction == "left") {
          if (layerTwoImage == 0) {
            setLayerOneImage(images.length - 1);
          } else {
            setLayerOneImage(layerTwoImage - 1);
          }
        }
      }, 500);

      setCurrentLayer(1);
    } else if (currentLayer == 1) {
      layerTwoControls.start({
        opacity: 0,
        transition:{
          duration:.5
        }
      });
      layerOneControls.start({
        opacity: 1,
        transition:{
          duration:.5
        }
      });

      setTimeout(() => {
        if (direction == "right") {
          if (layerOneImage == images.length - 1) {
            setLayerTwoImage(0);
          } else {
            setLayerTwoImage(layerOneImage + 1);
          }
        } else if (direction == "left") {
          if (layerOneImage == 0) {
            setLayerTwoImage(images.length - 1);
          } else {
            setLayerTwoImage(layerOneImage - 1);
          }
        }
      }, 500);

      setCurrentLayer(0);
    }
    changePosition(direction);
  };

  

  const startSlide = () => {
    slideInterval.current = setInterval(() => {
      setSlideTrigger(prev => prev+1);
    },5000)
  }

  useEffect(() => {
    if (!(slideTrigger == 0)) {
      MoveShow('right');
    }
  },[slideTrigger])

  useEffect(() => {
    startSlide();

    return () => {
      clearInterval(slideInterval.current);
    }
  },[])

  return (
    <div className="slideshow-main-body">
      <motion.div
        id="item-one"
        className="slideshow-image-layer"
        animate={layerOneControls}
        style={{
          backgroundImage: `url(${images[layerOneImage].url})`,
          opacity: 1,
        }}
      ></motion.div>

      <motion.div
        id="item-two"
        className="slideshow-image-layer"
        animate={layerTwoControls}
        style={{
          backgroundImage: `url(${images[layerTwoImage].url})`,
          opacity: 0,
        }}
      ></motion.div>

      <SlideshowArrows change={MoveShow} />
      <SlideShowDots position={currentPosition} images={images} />
    </div>
  );
};

export default Slideshow;
