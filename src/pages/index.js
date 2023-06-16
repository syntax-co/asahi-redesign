import Image from "next/image";
import { Inter } from "next/font/google";
import Slideshow from "./component/slideshow";

const inter = Inter({ subsets: ["latin"] });

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

export default function Home() {
  return (
    <div className="hompage-body">
      <Slideshow images={images} />
    </div>
  );
}
