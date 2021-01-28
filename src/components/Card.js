import logo from '../logo.svg';

const Card = (product) => (
    <div className="card">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="card-body">
            <h2>{product.name}</h2>
            <h2>{product.price}</h2>
            <h2>{product.quantity}</h2>
            <button className="btn-buy">Comprar</button>
        </div>
     </div>
) 

export default Card;