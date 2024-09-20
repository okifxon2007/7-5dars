import '../Home/index.css';
import Header from '../../componets/card/Header';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Card/index.css'

interface Product {
    id: number;
    attributes: {
        name: string;
        price: number;
        description: string;
        image: string;
        category: string;
        brand: string;
    };
}

const fetchProducts = async () => {
   
    try {
        const response = await fetch('https://strapi-store-server.onrender.com/api/products');
        if (!response.ok) {
            throw new Error('error');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetchda xato:', error);
        throw error;
    }
};

const Home = () => {
    const nav = useNavigate();

    function handleNav(e: React.MouseEvent<HTMLDivElement>) {
        const target = e.currentTarget.getAttribute('data-value');
        
        if (target) {
            nav(`/card/${target}`);
            
        }
    }

    const [prod, setProd] = useState<Product[]>([]);
    const [filteredProd, setFilteredProd] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [category, setCategory] = useState<string>('all');
    const [brand, setBrand] = useState<string>('all');

    useEffect(() => {
        fetchProducts()
            .then((data: { data: Product[] }) => {
                setProd(data.data);
                setFilteredProd(data.data); 
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        
        const filtered = prod.filter((product) => {
            const matchesSearch = product.attributes.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || product.attributes.category === category;
            const matchesBrand = brand === 'all' || product.attributes.brand === brand;

            return matchesSearch && matchesCategory && matchesBrand;
        });

        setFilteredProd(filtered);
    };

    const handleReset = () => {
        setSearchTerm('');
        setCategory('all');
        setBrand('all');
        setFilteredProd(prod); 
    };

    return (
        <div>
            <Header />
            <div className="home conta">
                <div className="forma">
                    <form onSubmit={handleSubmit}>
                        <div className="formabir">
                            <label>Search product</label> <br />
                            <input 
                                type="text" 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="formabir">
                            <label>Select Category</label> <br />
                            <select 
                                value={category} 
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="all">all</option>
                                <option value="Tables">Tables</option>
                                <option value="Chairs">Chairs</option>
                                <option value="Kids">Kids</option>
                                <option value="Sofas">Sofas</option>
                                <option value="Beds">Beds</option>
                            </select>
                        </div>
                        <div className="formabir">
                            <label>Select Brand</label> <br />
                            <select 
                                value={brand} 
                                onChange={(e) => setBrand(e.target.value)}
                            >
                                <option value="all">all</option>
                                <option value="Modenza">Modenza</option>
                                <option value="Luxora">Luxora</option>
                                <option value="Artifex">Artifex</option>
                                <option value="Homestead">Homestead</option>
                            </select> 
                            <br />
                            <div className="hombut">
                                <button type="button" className="btbir" onClick={handleReset}>Reset</button>
                                <button type="submit">Submit</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="product">
                    <div className="prodone">
                        <h2>{filteredProd.length} Products</h2>
                        <hr />
                    </div>
                    <div className="prodtwo">
                        {filteredProd.length ? (
                            filteredProd.map((produc) => (
                                <div onClick={handleNav} className="card" key={produc.id} data-value={produc.id}>
                                    <img src={produc.attributes.image} alt="" />
                                    <h2>{produc.attributes.title}</h2>
                                    <p>${produc.attributes.price}</p>
                                </div>
                            ))
                        ) : (
                            <div><div className="loader">
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
    <div className="circle"></div>
</div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
