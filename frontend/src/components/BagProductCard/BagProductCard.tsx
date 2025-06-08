import "./BagProductCard.css";

interface BagProductCardProps {
  id?: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  deleteProduct: () => void;
  incrementQuantity: () => void;
  decrementQuantity: () => void;
}

const BagProductCard: React.FC<BagProductCardProps> = ({
  id,
  name,
  imageUrl,
  price,
  quantity,
  deleteProduct,
  incrementQuantity,
  decrementQuantity,
}) => {
  const isDisabled = quantity <= 1;

  return (
    <div className="bagProductCardContainer">
      <div className="bagProductCardImageContainer">
        <img className="bagProductCardImage" src={imageUrl} alt="post img" />
      </div>

      <div className="bagProductCartDetails">
        <h5 className="bagProductCardTitleContainer">{name}</h5>
        <div className="bagProductCardPriceContainer">
          <p>${price}</p>
        </div>
        <div className="actionContainer">
          <div className="quantityContainer">
            <button className="quantityButtons" onClick={incrementQuantity}>
              +
            </button>
            <p> {quantity} </p>
            <button
              className="quantityButtons"
              disabled={isDisabled}
              onClick={decrementQuantity}
            >
              -
            </button>
          </div>
          <button className="removeButton" onClick={deleteProduct}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default BagProductCard;
