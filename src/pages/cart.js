import { useEffect,useState } from "react";
import {MdModeEditOutline} from 'react-icons/md';
import { IconContext } from "react-icons";
import {animate, motion} from 'framer-motion';
import {AiOutlineCheck} from 'react-icons/ai';
import {BiMinus,BiPlus} from 'react-icons/bi';
import {BsTrash} from 'react-icons/bs';


const ItemCounter = ({counterLabel,quantity}) => {
    const maxCount = 30;
    const [counter,setCounter] = useState(quantity);

    return(
        <div className='w-4/12 h-8 flex mr-auto ml-auto border border-white rounded-full'>
            <div 
            className='w-1/3 h-full flex items-center justify-center'
            onClick={() => {
                if (counter != 0) {
                    setCounter(counter-1)
                }
            }}
            >
                <IconContext.Provider
                value={{color:'white'}}
                >
                    <BiMinus size={20} />
                </IconContext.Provider>
            </div>
            <div id={`${counterLabel.split(' ').join('-')}-count`} className='w-1/3 h-full flex items-center justify-center text-white'>
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
                value={{color:'white'}}
                >
                    <BiPlus size={20} />
                </IconContext.Provider>
            </div>
        </div>
    )
}



const CartItem = ({name,quantity,price,updater,removeItem}) => {

    const [editing,setEditing] = useState(false)

    return(
        <div className="cart-item-body">
            <div className="cart-item-inner-body">
                <div className="h-5/6 w-8/12">
                    <div className="h-full ml-5">
                        <div>
                            {name}
                        </div>
                        <div className="mt-3">
                            {price}
                        </div>
                    </div>
                </div>
                <div className="w-3/12">
                    <div>
                        {quantity}
                    </div>
                </div>
                <motion.div 
                className="
                bg-sushiGreen h-full flex rounded-tr-lg rounded-br-lg 
                items-center justify-center absolute right-0
                "
                initial={{width:'30px'}}
                animate={{width:editing? '100%':'30px'}}
                >   
                    
                    {
                        editing&&

                        <motion.div 
                        className="w-full h-full flex items-center justify-center "
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        >
                            <div className="w-11/12 h-5/6 flex items-center ">
                                <ItemCounter counterLabel={name} quantity={parseInt(quantity)} />
                                
                            </div>

                        </motion.div>
                    }
                    

                    {
                        editing&&
                        <motion.div className="h-full flex items-center justify-center absolute left-0 bg-red-500"
                        style={{width:'30px'}}
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        onClick={() => {
                            removeItem(name)
                        }}
                        >
                            <IconContext.Provider
                            value={{color:'white'}}
                            >
                                <BsTrash size={20} />
                            </IconContext.Provider>
                        </motion.div>
                    }

                    
                    <motion.div className="h-full flex items-center justify-center absolute right-0"
                    style={{width:'30px'}}
                    initial={{opacity:1}}
                    animate={{opacity:editing? 0:1}}
                    onClick={() => {
                        setEditing(!editing)
                    }}
                    >
                        <IconContext.Provider
                        value={{color:'white'}}
                        >
                            <MdModeEditOutline size={20} />
                        </IconContext.Provider>
                    </motion.div>
                    
                    <motion.div 
                        className="h-full flex items-center justify-center 
                        absolute right-0 rounded-tr-lg rounded-br-lg
                        "
                        style={{width:'30px'}}
                        initial={{opacity:0}}
                        animate={{opacity:editing? 1:0}}
                        onClick={() => {
                            if (editing) {
                                updater(name)
                                setTimeout(() => {
                                    setEditing(!editing);
                                },500)
                            } else {
                                setEditing(!editing)
                            }
                        }}
                        >
                        <IconContext.Provider
                        value={{color:'white'}}
                        
                        >
                            <AiOutlineCheck size={25} />
                        </IconContext.Provider>
                    </motion.div>
                    
                </motion.div>
            </div>
            
        </div>
    )
}


const CurrentCartBody = ({cartData,reload}) => {


    const removeItem = (name) => {
        const currentStorage = JSON.parse(localStorage.getItem('Asahi-data'));

        currentStorage.cartData.map((item,index) => {
            const itemName = item.name;

            if (itemName == name) {
                currentStorage['cartData'].splice(index,index+1);
            }

        })
        
        const newData = JSON.stringify(currentStorage);

        localStorage.setItem('Asahi-data',newData);
        console.log(localStorage.getItem('Asahi-data'))
        reload();
    }

    const updateCart = (name) => {
        const currentStorage = JSON.parse(localStorage.getItem('Asahi-data'));
        const editerCount = document.querySelector(`#${name.split(' ').join('-')}-count`).innerText;
        
        
        currentStorage['cartData'].map((item,index) => {
            const itemName = item.name;
            
            if (itemName == name) {
                if (editerCount > 0) {
                    currentStorage['cartData'][index].count = editerCount;
                    localStorage.setItem('Asahi-data',JSON.stringify(currentStorage));
                    reload();
                } else {
                    
                    removeItem(name);
                }
            }

        })

        
    }

    return(
        <div className="current-cart-body">
            {   cartData&&
                cartData['cartData'].map(item => {
                    
                    return(
                        <CartItem key={item.name+9} 
                        name={item.name} 
                        quantity={item.count} 
                        price={item.price} 
                        updater={updateCart} 
                        removeItem={removeItem}
                        />
                    )
                })
            }
        </div>
    )
}


const TotalBody = ({itemCosts,taxCosts,totalCosts,calcTotal}) => {

    


    const CheckoutButton = () => {

        return(
            <div className="checkout-button"
            onClick={() => {
                document.location.href = 'payment'
            }}
            >
                CheckOut
            </div>
        )
    }


    const TotalDisplay = ({displayLabel,price}) => {

        return(
            <div className="total-display-body">
                <div className="w-1/2">
                    {displayLabel}
                </div>
                <div className="w-1/2 flex justify-end">
                    ${price}
                </div>
            </div>
        )
    }


    return(
        <div className="total-body">
            <div className="total-inner-body">
                <TotalDisplay displayLabel={'Subtotal'} price={itemCosts} />
                <TotalDisplay displayLabel={'Fees & Tax'} price={taxCosts} />
                <div className="
                w-11/12 h-1 bg-darkBlue
                rounded-full
                "
                ></div>
                <TotalDisplay displayLabel={'Total'} price={totalCosts} />
                <CheckoutButton />
            </div>
        </div>
    )
}


const Cart = () => {

    const [cartData,setCartData] = useState(null);

    const [itemCosts,setItemCosts] = useState('0.00');
    const [taxCosts,setTaxCosts] = useState('0.00');
    const [totalCosts,setTotalCosts] = useState('0.00');

    const tax = .21

    const calcTotal = () => {
        var cartItems = JSON.parse(localStorage.getItem('Asahi-data'));
        

        var calcItems = 0;
        var calcTaxes = 0;
        var calcTotal = 0;
        cartItems.cartData.map((item,index) => {
            const qty = parseFloat(item.count);
            const price = parseFloat(item.price.split('$')[1])

            const itemTotal = parseFloat((qty*price).toFixed(2))
            const taxes = parseFloat((itemTotal * tax).toFixed(2))
            const total = parseFloat((itemTotal + taxes).toFixed(2))
            
            calcItems = calcItems + itemTotal;
            calcTaxes = calcTaxes + taxes;
            calcTotal = calcTotal + total;
        })

        setItemCosts(calcItems.toFixed(2));
        setTaxCosts(calcTaxes.toFixed(2));
        setTotalCosts(calcTotal.toFixed(2));


    }



    const reloadCart = () => {
        const localName = 'Asahi-data'
        const data = localStorage.getItem(localName);
    
        if (data) {
            const jdata  = JSON.parse(data); 
            setCartData(jdata);
        }
        // setInterval()
        calcTotal();
    }

    useEffect(() => {
        reloadCart();
        
    },[])

    return(
        <div className="cart-main-body">

            <CurrentCartBody cartData={cartData} reload={reloadCart} />
            <TotalBody 
            itemCosts={itemCosts}
            taxCosts={taxCosts}
            totalCosts={totalCosts}
            />

        </div>
    )
}



export default Cart;