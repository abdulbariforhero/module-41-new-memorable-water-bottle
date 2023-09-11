import { useEffect, useState } from 'react';
import Bottle from '../bottle/bottle';
import './bottles.css'
import { addToLs, getStoredCart, removeFromLS } from '../../../utilities/localstorage';
import Cart from '../cart/cart';


const Bottles = () => {
    const [bottles, setBottles] = useState([])
    const [cart, setCart] = useState([])

    
    useEffect(() =>{
        fetch('bottles.json')
        .then(res => res.json())
        .then(data => setBottles(data))
    },[])



    // load from local storage
    useEffect( () => {        
        // console.log('called the useEffect', bottles.length);        
        if(bottles.length){            
        const storedCart = getStoredCart();
        // console.log(storedCart);
        const savedCart = []
        for (const id of storedCart) {
            // console.log(id);
            const bottle = bottles.find(bottle => bottle.id === id);
            if(bottle){
                savedCart.push(bottle)
            }
        }
        // console.log('savedCart', savedCart);
        setCart(savedCart)
        }
    } ,[bottles])

    

    const handleAddToCart = bootle => {
        const newCart = [...cart, bootle];
        setCart(newCart)
        // console.log(bootle.id);
        addToLs(bootle.id)
    }


    // remove From Cart
    const handleRemoveToCart = id =>{
        // visual cart remove
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)
        //remove from LS
        removeFromLS(id)

    }




    return (
        <div>
            
            <h3>Bottles {bottles.length} </h3>

            <Cart cart={cart} handleRemoveToCart={handleRemoveToCart} ></Cart>

            <div  className='bottles-container'>
            {
                bottles.map(bottle => <Bottle
                     key={bottle.id}
                     bottle={bottle}
                     handleAddToCart={handleAddToCart}
                     ></Bottle>)
            }
            </div>

        </div>
    );
};

export default Bottles;