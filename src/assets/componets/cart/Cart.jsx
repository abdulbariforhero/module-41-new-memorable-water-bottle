import PropTypes from 'prop-types';
import './cart.css'

const Cart = ({cart, handleRemoveToCart}) => {
    return (
        <div>
            <h3>carts : {cart.length}</h3>
            <div className="cart-container">
                {cart.map(bottle => <div key={bottle.id}> <img key={bottle.id}  src={bottle.img}></img>
                <button onClick={() => handleRemoveToCart(bottle.id)} >Remove</button>
                 </div>)}
            </div>
        </div>
    );
};


Cart.propTypes = {
    cart:PropTypes.array.isRequired,
    handleRemoveToCart:PropTypes.func.isRequired,
}

export default Cart;