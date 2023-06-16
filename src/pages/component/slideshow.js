import { useState } from "react";
import { motion } from "framer-motion";

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

const Slideshow = ({ images }) => {
  const [layerOneImage, setLayerOneImage] = useState(0);
  const [layerTwoImage, setLayerTwoImage] = useState(1);
  const [currentLayer, setCurrentLayer] = useState(0);

  return (
    <div className="w-full h-2/6 ">
      <motion.div
        id="item-one"
        className="w-full h-full "
        initial={{ opacity: 1 }}
        animate={{ opacity: currentLayer == 0 ? 1 : 0 }}
        style={{
          backgroundImage: `url(${images[layerOneImage].url})`,
        }}
      ></motion.div>

      <motion.div
        id="item-two"
        className="w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLayer == 1 ? 1 : 0 }}
        style={{
          backgroundImage: `url(${images[layerTwoImage].url})`,
        }}
      ></motion.div>
    </div>
  );
};

export default Slideshow;
