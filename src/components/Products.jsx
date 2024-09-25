import React, { useState, useEffect } from 'react';
import '../styles/products.css';
import { Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faIndianRupeeSign } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ModalComponent from './Modal';

function Products({ searchTerm, filteredProducts, setFilteredProducts, ProductRef }) {
  const [modalShow, setModalShow] = useState(false);
  const [products, setProducts] = useState([]);
  const [modalData, setModalData] = useState({});
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [noResults, setNoResults] = useState(false);

  const fetchData = async () => {
    const response = await axios.get('https://e-commerce-backend-fdtz.onrender.com/product/productdetails');
    setProducts(response.data);
    setFilteredProducts(response.data);

    // Fetching unique categories from the products data
    const uniqueCategories = [...new Set(response.data.map(product => product.category))];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update products based on category and search term
  useEffect(() => {
    let filtered = products;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term if provided
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setNoResults(filtered.length === 0); // Check if no results found
  }, [selectedCategory, searchTerm, products, setFilteredProducts]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const showProduct = (product) => {
    setModalData(product);
    setModalShow(true);
  };

  // Function to get similar products (can be customized)
  const getSimilarProducts = () => {
    return products.filter(product => product.category === selectedCategory).slice(0, 4); // Get up to 4 similar products
  };

  return (
    <div className='products-main' ref={ProductRef}>
      <h2 className='mt-5'>Best Selling Products</h2>

      <div className='category-filter m-5'>
          <h4>Filter by Category</h4>
          <Form.Select onChange={handleCategoryChange} value={selectedCategory} style={{ width: '200px' }}>
            <option value=''>All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </div>

      <div className='products-filter-container'>
        <div className='products-list'>
          <div className='products-cards'>
            {noResults ? (
              <div className="no-results">
                <h5 className='text-info'>No results found. Try a different search.</h5>
                {getSimilarProducts().map(product => (
                  <Card key={product._id} style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={product.image} />
                    <Card.Body>
                      <Card.Title className='price'>
                        <FontAwesomeIcon icon={faIndianRupeeSign} /> {product.price}
                      </Card.Title>
                      <Card.Text>
                        {product.name}
                      </Card.Text>
                      <Button variant="warning" onClick={() => showProduct(product)}>
                        Buy Now
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            ) : (
              filteredProducts.map(product => (
                <Card key={product._id} style={{ width: '20rem' }}>
                  <Card.Img variant="top" src={product.image} />
                  <Card.Body>
                    <Card.Title className='price'>
                      <FontAwesomeIcon icon={faIndianRupeeSign} /> {product.price}
                    </Card.Title>
                    <Card.Text>
                      {product.name}
                    </Card.Text>
                    <Button variant="warning" onClick={() => showProduct(product)}>
                      Buy Now
                    </Button>
                  </Card.Body>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      <ModalComponent modalData={modalData} modalShow={modalShow} setModalShow={setModalShow} />
    </div>
  );
}

export default Products;
