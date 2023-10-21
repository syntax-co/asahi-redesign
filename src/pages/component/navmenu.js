import { IconContext } from "react-icons";
import menuOptions from "../../josn_files/menu_options.json";
import { MdOutlineAccountCircle } from "react-icons/md";
import {BsCart} from 'react-icons/bs';
import { useEffect,useState } from "react";

const MenuItem = ({ label, path,setMenu}) => {
    const [onPage,setOnPage] = useState(false);

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
        <div className="mobile-menu-item"
        style={{
            color:onPage? '#4ade80':'white'
        }}
        onClick={() => {
            setMenu(false);
            setTimeout(() => {
                document.location.href=path;
            },500)
        }}
        >
            
            {label}
            
        </div>
    );
};

const Cart = ({setMenu}) => {
    const [itemCount, setItemCount] = useState(0);

    const checkCart = () => {
        const cartData = JSON.parse(localStorage.getItem('Asahi-data'))
        var total = 0;
        cartData.cartData.map((item,index) => {
            total = total + parseInt(item.count);
        })
        setItemCount(total);
    }   

    useEffect(() => {
        checkCart()
    },[])

    return(
        <div className="cart-body"
        onClick={() => {
            setMenu(false);
            setTimeout(() => {
                document.location.href='/cart';
            },500)
        }}
        >
            <IconContext.Provider
            value={{
                color:'white'
            }}
            >
                <BsCart size={30} />
            </IconContext.Provider>

            <div id='cart-count-indicator' className="cart-count">
                {itemCount}
            </div>

        </div>
    )
}

const MobileMenu = ({setMenu}) => {

    useEffect(() => {

    },[])


    return (
        <div className="mobile-nav-menu-body">
        <div className="mobile-menu-top-bar">
            
            {/* <Cart setMenu={setMenu} />
            <div className="menu-profile-body">
                <div className="menu-profile-label">Login</div>
                <div className="menu-profile-icon">
                    <IconContext.Provider value={{ color: "white" }}>
                    <MdOutlineAccountCircle size={30} />
                    </IconContext.Provider>
                </div>
            </div> */}
        </div>
        

        

        {Object.keys(menuOptions).map((key) => {
            const itemData = menuOptions[key];

            return (
                <MenuItem key={key} 
                label={key} 
                path={itemData.path}
                setMenu={setMenu}
                />
            )
        })}
        </div>
    );
};

export default MobileMenu;
