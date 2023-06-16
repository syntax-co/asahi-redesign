import Image from 'next/image'
import { Inter } from 'next/font/google'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const inter = Inter({ subsets: ['latin'] })

const images=[
  {
    url: './images/beef.jpg',
    caption: 'Slide 1'
  },
  {
    url: './images/plate-1.jpg',
    caption: 'Slide 2'
  },
  {
    url: './images/salad-bowl.jpg',
    caption: 'Slide 3'
  },
  {
    url:'./images/sushi2.jpg',
    caption:'slide 4'
  }
]


export default function Home() {
  return (
    <div className='hompage-body'>
      <div className="slide-container">
      <Fade>
        {
          images.map((item,index) => {

            return(
              <div key={index} className='slide-show-image-holder'>
                <div  className='slide-show-image-body'
                style={{
                  backgroundPosition:'center',
                  backgroundSize:'contain',
                  backgroundRepeat:'no-repeat',
                  backgroundImage:`url(${item.url})`
                }}
                >

                </div>
              </div>
            )

          })
        }
      </Fade>
      </div>

    </div>
  )
}
