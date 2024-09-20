import { useNavigate, useParams } from 'react-router-dom';
import '../Card/index.css';
import { useEffect, useState } from 'react';

const Card = () => {
  const { id } = useParams(); 

 
  const [product, setProduct] = useState<Card | null>(null);
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate()
  interface Card {
    id: number;
    attributes: {
      name: string;
      price: number;
      description: string;
      image: string;
    };
  }

  
  const fetchData = async () => {
    try {
      const response = await fetch(`https://strapi-store-server.onrender.com/api/products/${id}`);
      if (!response.ok) {
        throw new Error('Ma\'lumotni olishda xato yuz berdi'); 
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setError('Ma\'lumot olishda xatolik yuz berdi'); 
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (id) { 
      fetchData()
        .then((data) => {
          if (data && data.data) { 
            setProduct(data.data); 
          } else {
            setError('Ma\'lumot topilmadi');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]); 

  if (error) {
    return <div>{error}</div>; 
  }

  if (!product) {
    return <div><div className="loadering">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
</div></div>; 
  }

  function handhome(e:MouseEvent){
    e.preventDefault()
    nav('/')
  }

  return (
    <div>
      <div className="cardinghead conta">
        <div className="head">
          <button onClick={handhome}>Home</button>
        </div>
        <div className="cardingmain">
         
          <img src={product.attributes.image} alt={product.attributes.name} />
          <div className="mn">
            <h1>{product.attributes.title}</h1>
            <h2>{product.attributes.company}</h2>
            <p>${product.attributes.price}</p>
           <h5> <span>{product.attributes.description}</span></h5>
            <div className="amount">
              <label>Amount</label>
              <select>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;


