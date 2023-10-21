
import { useEffect, useState } from 'react';
import foodMenu from '../josn_files/food_menu2.json';
import catJson from '../josn_files/menu-cat-images.json';
import {BiMinus,BiPlus,BiSushi} from 'react-icons/bi';
import {AiOutlineRollback} from 'react-icons/ai';
import {MdArrowForwardIos,MdArrowBackIosNew,MdOutlineClose} from 'react-icons/md'
import { IconContext } from 'react-icons';
import {AnimatePresence, motion} from 'framer-motion'



//  ██████╗ █████╗ ██████╗ ████████╗    ███████╗██╗   ██╗███╗   ██╗ ██████╗████████╗██╗ ██████╗ ███╗   ██╗███████╗
// ██╔════╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔════╝██║   ██║████╗  ██║██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║██╔════╝
// ██║     ███████║██████╔╝   ██║       █████╗  ██║   ██║██╔██╗ ██║██║        ██║   ██║██║   ██║██╔██╗ ██║███████╗
// ██║     ██╔══██║██╔══██╗   ██║       ██╔══╝  ██║   ██║██║╚██╗██║██║        ██║   ██║██║   ██║██║╚██╗██║╚════██║
// ╚██████╗██║  ██║██║  ██║   ██║       ██║     ╚██████╔╝██║ ╚████║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║███████║
//  ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚═╝      ╚═════╝ ╚═╝  ╚═══╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝
                                                                                                               
const AddToCart = (title,name) => {
    const itemCount = document.querySelector(`#${name.split(' ').join('-')}-count`).innerText
    const data = {
        name:name,
        price:foodMenu[title][name].price,
        count:itemCount
    }
    addCartData(data)

}

function getCartData() {
    const localName = 'Asahi-data'
    const data = localStorage.getItem(localName);

    if (data) {
        const jdata  = JSON.parse(data); 
        return jdata;
    }
}

function addCartData(item) {
    const localName = 'Asahi-data'
    const data = localStorage.getItem(localName);
    if (data) {
        const jdata  = JSON.parse(data);
        var itemExists = false;

        jdata['cartData'].map((cartItem,index) => {
            if (cartItem.name == item.name) {
                itemExists=true;
            }
        })

        if (itemExists) {
            jdata['cartData'].map((cartItem,index) => {
                if (cartItem.name == item.name) {
                    var cCount = parseInt(cartItem.count)
                    cCount = cCount+parseInt(item.count)
                    jdata['cartData'][index].count = cCount.toString();
                }
            })
        } else {
            jdata.cartData.push(item);
        }
        
        const finalData = JSON.stringify(jdata)
        localStorage.setItem(localName, finalData);
        updateCart()
    }
  
  
}
  

function updateCart() {
    const cartData = getCartData();
    const cartCountIndicator = document.querySelector('#cart-count-indicator');
    var total = 0;
    
    cartData['cartData'].map(item => {
        total = total + eval(item.count)
    })

    cartCountIndicator.innerText = total


}



// ██╗████████╗███████╗███╗   ███╗     ██████╗ ██████╗ ██╗   ██╗███╗   ██╗████████╗███████╗██████╗ 
// ██║╚══██╔══╝██╔════╝████╗ ████║    ██╔════╝██╔═══██╗██║   ██║████╗  ██║╚══██╔══╝██╔════╝██╔══██╗
// ██║   ██║   █████╗  ██╔████╔██║    ██║     ██║   ██║██║   ██║██╔██╗ ██║   ██║   █████╗  ██████╔╝
// ██║   ██║   ██╔══╝  ██║╚██╔╝██║    ██║     ██║   ██║██║   ██║██║╚██╗██║   ██║   ██╔══╝  ██╔══██╗
// ██║   ██║   ███████╗██║ ╚═╝ ██║    ╚██████╗╚██████╔╝╚██████╔╝██║ ╚████║   ██║   ███████╗██║  ██║
// ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝     ╚═════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
                                                                                                
const ItemCounter = ({counterLabel}) => {
    const maxCount = 30;
    const [counter,setCounter] = useState(0);

    return(
        <div className='w-4/12 h-8 flex mr-auto ml-auto border border-sushiGreen rounded-full'>
            <div 
            className='w-1/3 h-full flex items-center justify-center'
            onClick={() => {
                if (counter != 0) {
                    setCounter(counter-1)
                }
            }}
            >
                <IconContext.Provider
                value={{}}
                >
                    <BiMinus size={20} />
                </IconContext.Provider>
            </div>
            <div id={`${counterLabel.split(' ').join('-')}-count`} className='w-1/3 h-full flex items-center justify-center'>
                {counter}
            </div>
            <div 
            className='w-1/3 h-full flex items-center justify-center'
            onClick={() => {
                if (counter < maxCount) {
                    setCounter(counter+1)
                }
            }}
            >
                <IconContext.Provider
                value={{}}
                >
                    <BiPlus size={20} />
                </IconContext.Provider>
            </div>
        </div>
    )
}

//  ██████╗ █████╗ ████████╗    ██╗████████╗███████╗███╗   ███╗
// ██╔════╝██╔══██╗╚══██╔══╝    ██║╚══██╔══╝██╔════╝████╗ ████║
// ██║     ███████║   ██║       ██║   ██║   █████╗  ██╔████╔██║
// ██║     ██╔══██║   ██║       ██║   ██║   ██╔══╝  ██║╚██╔╝██║
// ╚██████╗██║  ██║   ██║       ██║   ██║   ███████╗██║ ╚═╝ ██║
//  ╚═════╝╚═╝  ╚═╝   ╚═╝       ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝

const CategoryItem = ({name,price,description,_category,rawFish}) => {
    const [open,setOpen] = useState(false);


    return(
        <div className='w-[90%] h-fit mb-2 bg-lighterBlue rounded-lg flex flex-col items-center text-white'>
            <div className='flex w-full h-12 items-center'>
                <div className='w-8/12 ml-4'>
                    {name}
                </div>
                <div className='w-2/12'>
                    {price}
                </div>
                <div className='w-2/12 flex items-center justify-center'
                
                onClick={() => {
                    setOpen(!open)
                }}
                >
                    <motion.div
                    initial={{rotate:0}}
                    animate={{rotate:open? '-90deg':0}}
                    
                    >
                        <IconContext.Provider
                        value={{
                            color:'#5dd64f'
                        }}
                        >
                            <MdArrowForwardIos size={25} />
                        </IconContext.Provider>
                    </motion.div>
                </div>
            </div>

            {
                open&&
                <motion.div className='w-full h-fit'
                initial={{height:'0px'}}
                animate={{
                    height:open? 'fit-content':'0px'
                }}
                >
                    <motion.div className='w-full h-fit mb-2'
                    initial={{opacity:0}}
                    animate={{
                        opacity:open? 1:0,
                        transition:{
                            duration:open? .5:0,
                            delay:open? .5:0
                        }
                    }}
                    >   
                        <div className='w-10/12 ml-5'>
                            {description}
                        </div>
                    </motion.div>
                    {/* <motion.div className='w-full h-12 flex items-center'
                    initial={{opacity:0}}
                    animate={{
                        opacity:open? 1:0,
                        transition:{
                            duration:open? .5:0,
                            delay:open? .5:0
                        }
                    }}
                    >
                        <ItemCounter counterLabel={name} />
                        <div 
                        className='w-3/12 h-8 mr-auto ml-auto text-white flex items-center justify-center rounded-full bg-sushiGreen'
                        onClick={() => {
                            AddToCart(_category,name)
                            setOpen(false);
                        }}
                        >
                            Add
                        </div>
                        
                    </motion.div> */}
                </motion.div>
            }
            
            

        </div>
    )
}


//  ██████╗ █████╗ ████████╗    ██████╗  ██████╗ ██████╗ ██╗   ██╗
// ██╔════╝██╔══██╗╚══██╔══╝    ██╔══██╗██╔═══██╗██╔══██╗╚██╗ ██╔╝
// ██║     ███████║   ██║       ██████╔╝██║   ██║██║  ██║ ╚████╔╝ 
// ██║     ██╔══██║   ██║       ██╔══██╗██║   ██║██║  ██║  ╚██╔╝  
// ╚██████╗██║  ██║   ██║       ██████╔╝╚██████╔╝██████╔╝   ██║   
//  ╚═════╝╚═╝  ╚═╝   ╚═╝       ╚═════╝  ╚═════╝ ╚═════╝    ╚═╝   

const CategoryBody = ({title,setCurrentCategory,viewingList,setViewingList}) => {
    
    const CategoryTitle = () => {

        useEffect(() => {
            setTimeout(() => {
                setViewingList(false);
            }, 4500);
        }, []);

        return(
            <div id={title.split(' ').join('-')} 
            className='w-full h-20 text-2xl flex justify-center items-center text-white'
            >
                <div className='w-[90%] flex items-center relative'>
                    <div className=''>
                        {title}
                    </div>

                    <div id={title.split(' ').join('-')+'-close'} className='w-10 h-10 flex items-center justify-center bg-lighterBlue rounded-full  absolute right-0'
                    onClick={() => {

                        setViewingList(false);
                        
                        // setTimeout(() => {
                        //     setCurrentCategory('')
                        // },1000)
                    }}
                    >
                        <IconContext.Provider
                        value={{color:'white'}}
                        >
                            <AiOutlineRollback size={30} />
                        </IconContext.Provider>
                    </div>      
                </div>
                

            </div>
        )
    }

    

    const CategoryList = () => {
        
        return(
            <div className='w-full h-full flex flex-col items-center overflow-x-scroll'>
                {
                    Object.keys(foodMenu[title]).map((key,index) => {
                        const item = foodMenu[title][key];
                        return(
                            <CategoryItem key={key} 
                            name={key} 
                            price={item.price} 
                            description={item.description}
                            _category={title}
                            rawFish={item.rawFish}
                            />
                        )
                    })
                    
                }
                <div className='w-full min-h-[40px]'></div>
            </div>
        )
    }



    return(
        <div className='w-full h-full'>
            <CategoryTitle />
            <div className=' w-full h-[88%] mt-5 '>

                {
                    title &&
                    <CategoryList />
                }
            </div>
            
        </div>
    )
}




//  ██████╗ █████╗ ████████╗    ████████╗██╗████████╗██╗     ███████╗
// ██╔════╝██╔══██╗╚══██╔══╝    ╚══██╔══╝██║╚══██╔══╝██║     ██╔════╝
// ██║     ███████║   ██║          ██║   ██║   ██║   ██║     █████╗  
// ██║     ██╔══██║   ██║          ██║   ██║   ██║   ██║     ██╔══╝  
// ╚██████╗██║  ██║   ██║          ██║   ██║   ██║   ███████╗███████╗
//  ╚═════╝╚═╝  ╚═╝   ╚═╝          ╚═╝   ╚═╝   ╚═╝   ╚══════╝╚══════╝
                                                                                                                                   
const CategoryTile = ({setCurrentCategory,viewingList,setViewingList}) => {

    const CatBody = ({catName}) => {

        return(
            <div id={catName.split(' ').join('-') + '-view-menu'} className=' flex flex-col relative items-center justify-center bg-lighterBlue text-white my-1 mx-auto rounded-md'
            style={{
                width:'48vw',
                height:'48vw',
            }}
            onClick={() => {
                setCurrentCategory(catName);
                setViewingList(true);
            }}
            >


                <div>
                    <IconContext.Provider
                    value={{color:'white'}}
                    >
                        <BiSushi size={50} />
                    </IconContext.Provider>
                </div>
                <div className='text-lg h-2/6 flex items-center absolute bottom-0'>
                    {catName}
                </div>
                
                

            </div>
        )
    }

    return(
        <motion.div className='w-full h-[100vh] absolute'
        initial={{opacity:0}}
        animate={{
            opacity:1,
            translateX:viewingList? '-100vw':0,
            transition:{
                ease:'easeInOut'
            }
        }}
        
        >
            
            <div className=' h-1/6'>
                
            </div>
            <div className='h-5/6'>
                <div className='w-full h-12 bg-darkBlue text-white text-2xl flex items-center pl-5 rounded-tl-md rounded-tr-md'>
                    Menu
                </div>

                <div className='h-full w-full flex flex-wrap bg-darkBlue overflow-y-auto '>

                    {
                        Object.keys(foodMenu).map((key,index) => {
                            
                            return(
                                <CatBody key={key} catName={key} />
                            )
                        })
                    }   
                    <div className='w-full h-20' >

                    </div>
                </div>
            </div>
            
            


        </motion.div>
    )
}


// ██╗████████╗███████╗███╗   ███╗███████╗    ██╗   ██╗██╗███████╗██╗    ██╗
// ██║╚══██╔══╝██╔════╝████╗ ████║██╔════╝    ██║   ██║██║██╔════╝██║    ██║
// ██║   ██║   █████╗  ██╔████╔██║███████╗    ██║   ██║██║█████╗  ██║ █╗ ██║
// ██║   ██║   ██╔══╝  ██║╚██╔╝██║╚════██║    ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
// ██║   ██║   ███████╗██║ ╚═╝ ██║███████║     ╚████╔╝ ██║███████╗╚███╔███╔╝
// ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝╚══════╝      ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ 
                                                                         
const ItemsView = ({currentCategory,setCurrentCategory,viewingList,setViewingList}) => {

    return(
        <motion.div className='w-full h-full absolute'
        style={{
            opacity:0,
            translateX:'100vw'
        }}
        animate={{
            opacity:1,
            translateX:viewingList? '0vw':'100vw',
            transition:{
                ease:'easeInOut'
            }
        }}
        >
            
            <div className=' h-1/6'>
                {/* top spacer */}
            </div>
            <div className=' w-full h-5/6 rounded-tr-md rounded-tl-md bg-darkBlue'>

                <CategoryBody 
                title={currentCategory}
                setCurrentCategory={setCurrentCategory}
                viewingList={viewingList}
                setViewingList={setViewingList}
                />
            </div>

                    
        </motion.div>
    )
}


// ███╗   ███╗ ██████╗ ██████╗ ██╗██╗     ███████╗    ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
// ████╗ ████║██╔═══██╗██╔══██╗██║██║     ██╔════╝    ████╗ ████║██╔════╝████╗  ██║██║   ██║
// ██╔████╔██║██║   ██║██████╔╝██║██║     █████╗      ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
// ██║╚██╔╝██║██║   ██║██╔══██╗██║██║     ██╔══╝      ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
// ██║ ╚═╝ ██║╚██████╔╝██████╔╝██║███████╗███████╗    ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
// ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ ╚═╝╚══════╝╚══════╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                                         
const MobielMenu = ({currentCategory,setCurrentCategory}) => {
    const [viewingList,setViewingList] = useState(false);

    return(
        <div className='mobile-menu-body'>
            <div id='menu-background' className='
            w-full h-full absolute bg-cover bg-center top-0
            '
            
            ></div>

            
            
                
            <CategoryTile 
            currentCategory={currentCategory} 
            setCurrentCategory={setCurrentCategory}
            viewingList={viewingList}
            setViewingList={setViewingList}
            />
        

            <ItemsView 
            currentCategory={currentCategory} 
            setCurrentCategory={setCurrentCategory}
            viewingList={viewingList}
            setViewingList={setViewingList}
            />
            

            
            
            
        </div>
    )
}


const CatOptionTile = ({optionName,description,price}) => {

    return(
        <div className='w-[48%] h-fit mx-3 mb-4 relative'
        
        >   
            <div className='mb-1 flex relative font-bold'>
                {optionName}
                <div className='absolute right-0 text-sushiGreen font' >
                    {price}
                </div>
            </div>
            <div className='mb-3 w-5/6'>
                {description}
            </div>

            <div className='
            w-full h-1  rounded full
            absolute bottom-0
            '
            style={{
                background:'linear-gradient(10deg ,#4ade80ff ,#27313d)'
            }}
            ></div>
        </div>
    )
}

const CategoryOptions = ({currentCategory,setCurrentCategory}) => {

    useEffect(() => {
        console.log(currentCategory.split(' ').join('-')+'-close');
    }, []);

    return(
        <motion.div className='w-full h-5/6 absolute z-10 flex items-center justify-center text-white'
            style={{background:'#20202055'}}
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            >
            <div className='w-5/6 h-[90%] bg-darkBlue'>

                

                <div className='w-full h-20 flex flex-col items-center mt-5 '>
                    <div className='w-5/6 h-full text-5xl flex flex-col justify-center relative'>
                        {currentCategory}
                        <div className='w-full h-1 bg-white rounded-full mt-4'></div>

                        <div id={currentCategory.split(' ').join('-') +'-close'} className='absolute right-0 cursor-pointer'
                        onClick={() => {
                            setCurrentCategory('');
                        }}
                        >
                            <IconContext.Provider
                            value={{color:'white'}}
                            >
                                <MdOutlineClose size={35} />
                            </IconContext.Provider>
                        </div>
                    </div>

                </div>

                <div className='w-full h-5/6 flex items-center justify-center mt-5'>
                    <div className='w-5/6 h-full flex flex-col flex-wrap overflow-x-auto relative styled-scrollbar-x'>

                        {
                            Object.keys(foodMenu[currentCategory]).map((key,index) => {
                                const item = foodMenu[currentCategory][key];
                                return(
                                    <CatOptionTile 
                                    key={key} 
                                    optionName={key}
                                    description={item.description}
                                    price={item.price}
                                    />
                                )
                            })
                        }

                    </div>
                </div>


            </div>
        </motion.div>
)
}

const GalItem = ({name,image, delay, rowSpan,colSpan,row=false,column=true,setCurrentCategory}) => {
    const [hovering,setHovering] = useState(false);

    return(
      <motion.div className="bg-center bg-cover flex flex-col items-center  text-white relative"
      style={{
        backgroundImage:`url(./images/optimized/${image})`,
        gridColumnStart:column && colSpan[0],
        gridColumnEnd:column && colSpan[1],
        gridRowStart:row && rowSpan[0],
        gridRowEnd:row && rowSpan[1],
      }}
      initial={{opacity:0}}
      animate={{
        opacity:1,
        transition:{
            delay:delay
        }
      }}
      >

        <div className='w-full h-full'
        style={{backgroundColor:'#20202055'}}
        ></div>


        
        <div className='h-16 w-full flex items-center justify-center text-2xl absolute'>
            {name}
        </div>

        <motion.div id={name.split(' ').join('-')+'-view-menu'} className='absolute w-28 h-10 flex items-center justify-center border border-white cursor-pointer'
        style={{bottom:16}}
        initial={{background:'#ffffff00'}}
        animate={{background:hovering?'#ffffff55':'#ffffff00'}}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        onClick={() => {
            setCurrentCategory(name)
        }}
        >
            View Menu
        </motion.div>

        
      </motion.div>
    )
}

const PageDot = ({currentpage,pageId}) => {
    return(
        <div className='w-2 h-2 mx-1 rounded-full'
        style={{
            backgroundColor:currentpage == pageId? '#ffffff':'#ffffff88'
        }}
        >

        </div>
    )
}


// ██████╗ ██████╗  ██████╗ ██╗    ██╗███████╗███████╗██████╗     ███╗   ███╗███████╗███╗   ██╗██╗   ██╗
// ██╔══██╗██╔══██╗██╔═══██╗██║    ██║██╔════╝██╔════╝██╔══██╗    ████╗ ████║██╔════╝████╗  ██║██║   ██║
// ██████╔╝██████╔╝██║   ██║██║ █╗ ██║███████╗█████╗  ██████╔╝    ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║
// ██╔══██╗██╔══██╗██║   ██║██║███╗██║╚════██║██╔══╝  ██╔══██╗    ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║
// ██████╔╝██║  ██║╚██████╔╝╚███╔███╔╝███████║███████╗██║  ██║    ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝
// ╚═════╝ ╚═╝  ╚═╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚══════╝╚═╝  ╚═╝    ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝ 
                                                                                                     

const BrowserMenu = ({currentCategory,setCurrentCategory}) => {

    const [currentPage,setCurrentPage] = useState(0);

    const gridSpans =[
        {row:[1,4],col:[1,3]},
        {row:[1,4],col:[3,5]},
        {row:[1,4],col:[5,7]},
        {row:[1,4],col:[7,9]},
        {row:[4,7],col:[1,3]},
        {row:[4,7],col:[3,5]},
        {row:[4,7],col:[5,7]},
        {row:[4,7],col:[7,9]}
    ]

    
    
    const pages=[
        [
            {'name':'Asahi Special Rolls'},
            {'name':'Vegetarian Rolls'},
            {'name':'Nigiri & Sashimi'},
            {'name':'Sides & Salads'},
            {'name':'Party Plates'},
            {'name':'Japanese Noodles'},
            {'name':'Yakisoba'},
            {'name':'Fried Rice'}
        ],
        [
            {'name':'Sushi Rolls'},
            {'name':'Hand Rolls'},
            {'name':'Appetizers'},
            {'name':'Sushi & Maki Combos'},
            {'name':'Desserts'},
            {'name':'Korean Dishes'},
            {'name':'Teriyaki'}
    
        ]
        
    ]



    const present = () => {

        // browser automation
        // const button = document.querySelector('#Asahi-Special-Rolls-view-menu')
        // const close = document.querySelector('#Asahi-Special-Rolls-close')


        // setTimeout(() => {
        //     button.click();
        // }, 2500);

        // setTimeout(() => {
        //     setCurrentCategory('');
        // }, 4500);

        // setTimeout(() => {
        //     document.location.href = process.env.NEXT_PUBLIC_BASE_URL
        // },5500)


        // mobile automation


    }


    useEffect(() => {
        // present()

    }, []);

    return(
        <div className='browser-menu-body'
        >

            {/* background image */}
            <div id='menu-background' className='
            w-full h-full absolute bg-cover bg-center top-0
            '
            
            ></div>

            <AnimatePresence key='browser' exit='wait' >
            {
                currentCategory&&
                <CategoryOptions currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
            }
            </AnimatePresence>

            <div className='w-5/6 h-20 relative'>
                <div className='text-white text-7xl ml-10'>
                    Menu
                </div>
            </div>
            
            <div className='h-4/6 w-full flex flex-col justify-end items-center relative'>

                           

                <div className='h-5/6 w-11/12 relative flex justify-center'>
                    
                    <motion.div className='w-10 h-full flex items-center justify-center cursor-pointer'
                    initial={{background:'#20202000'}}
                    whileHover={{background:'#20202055'}}
                    onClick={() => {
                        if (currentPage>0) {
                            setCurrentPage(currentPage-1);
                        }
                    }}
                    >
                        <IconContext.Provider 
                        value={{color:'white'}}
                        >
                            <MdArrowBackIosNew size={40} />
                        </IconContext.Provider>

                    </motion.div>

                    <div className='w-5/6 h-full'>
                        <div className='w-full h-full grid grid-cols-8 grid-rows-6 gap-1 '
                        style={{background:'#20202055'}}
                        >
                        {
                            pages[currentPage].map((item,index) => {

                                return(
                                    <GalItem key={item.name}
                                    name={item.name} 
                                    delay={.15*index}
                                    image={catJson[item.name]} 
                                    rowSpan={gridSpans[index].row} 
                                    colSpan={gridSpans[index].col} 
                                    row={true}
                                    setCurrentCategory={setCurrentCategory}
                                    />
                                )
                            })
                        }
                        </div>
                        <div className='w-full h-10 flex items-center justify-center'>
                            {
                                pages.map((item,index) => {
                                    return(
                                        <PageDot key={index}
                                        currentpage={currentPage}
                                        pageId={index}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <motion.div className='w-10 h-full flex items-center justify-center cursor-pointer'
                    initial={{background:'#20202000'}}
                    whileHover={{background:'#20202055'}}
                    onClick={() => {
                        if (currentPage<pages.length-1) {
                            setCurrentPage(currentPage+1)
                        }
                    }}
                    >
                        <IconContext.Provider 
                        value={{color:'white'}}
                        >
                            <MdArrowForwardIos size={40} />
                        </IconContext.Provider>
                    </motion.div>
                    
                    
                </div>

            </div>


            

        </div>
    )
}



// ███╗   ███╗███████╗███╗   ██╗██╗   ██╗    ██████╗  ██████╗ ██████╗ ██╗   ██╗
// ████╗ ████║██╔════╝████╗  ██║██║   ██║    ██╔══██╗██╔═══██╗██╔══██╗╚██╗ ██╔╝
// ██╔████╔██║█████╗  ██╔██╗ ██║██║   ██║    ██████╔╝██║   ██║██║  ██║ ╚████╔╝ 
// ██║╚██╔╝██║██╔══╝  ██║╚██╗██║██║   ██║    ██╔══██╗██║   ██║██║  ██║  ╚██╔╝  
// ██║ ╚═╝ ██║███████╗██║ ╚████║╚██████╔╝    ██████╔╝╚██████╔╝██████╔╝   ██║   
// ╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝ ╚═════╝     ╚═════╝  ╚═════╝ ╚═════╝    ╚═╝   
                                                                            
const Menu = () => {
    
    const [currentCategory, setCurrentCategory] = useState('');

    useEffect(() => {
        console.log(currentCategory);
    }, [currentCategory]);

    return(
        <motion.div id='menu-main-body' className="menu-main-body"
        initial={{opacity:0}}
        animate={{opacity:1,transition:{duration:2}}}
        exit={{opacity:0}}
        >

            <MobielMenu currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
            <BrowserMenu currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} />
        </motion.div>
    )
}



export default Menu;