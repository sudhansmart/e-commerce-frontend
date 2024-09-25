import React,{ useState,useEffect }from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass,faUser,faHeart,faBagShopping,faBars} from '@fortawesome/free-solid-svg-icons'
import '../styles/navbar.css'
import {ListGroup} from 'react-bootstrap'
import axios from 'axios'

function NavBar({setSearchTerm,setFilteredProducts,ProductRef,scrollToSection}) {
    const [products, setProducts] = useState([]);
    const [isSticky, setIsSticky] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [filteredItems, setFilteredItems] = useState([]);
    const [feedBack, setFeedBack] = useState('');


    useEffect(() => {
        const handleScroll = () => {
          if ( window.scrollY > 30) {
            // User is scrolling down, hide the navbar
            setIsSticky(true);
          } else {
            // User is scrolling up, show the navbar
            setIsSticky(false);
          }
          setLastScrollY(window.scrollY);
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [lastScrollY]);

      const fetchData = async () => {
        const response = await axios.get('https://e-commerce-backend-fdtz.onrender.com/product/productdetails')
  
        setProducts(response.data)
       }
  
      useEffect(() => {
          fetchData()
      }, [])

      const handleItemClick = (candidate) => {
        setSelectedItem(candidate);
        // setFormData(candidate); 
      };

      const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
       
    
        const filtered = products.filter(product =>
          product.name.toLowerCase().includes(value)
        );
        setFilteredProducts(filtered);
           if(filtered.length > 0){
            scrollToSection(ProductRef)
           }
      };
    
  return (
    <div className={`navmain ${isSticky ? 'sticky' : ''}`}>
        <div className="sec1">
        <form>
  <div className="input-field position-relative">
    <input 
      type="search" 
      name="search" 
      placeholder="Search Anything..."  
      onChange={handleSearch} 
      className="search-input"
    />
    <button 
      type="submit" 
      className="search-btn"
    >
      <FontAwesomeIcon icon={faMagnifyingGlass} />             
    </button>
    {filteredItems.length > 0 && (
      <ListGroup className='search-list position-absolute w-100 mt-2 mb-3' style={{ zIndex: 1000 }}>
        {filteredItems.map(item => (
          <ListGroup.Item 
            key={item._id} 
            onClick={() => handleItemClick(item)}
            style={{ cursor: 'pointer' }}
          >
            {feedBack && <p className='text-danger'>{feedBack}</p>}
            <p>{item.name}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    )}
  </div>
</form>


        </div>
        <div className="sec2">
            <h2>UrbanCartel</h2>
        </div>
        <div className="sec3">
                 
                          <FontAwesomeIcon className='navicon1' icon={faUser} />     
                          <FontAwesomeIcon className='navicon2' icon={faHeart} /> 
                          <FontAwesomeIcon className='navicon3' icon={faBagShopping} />  
                         
                          
                   <FontAwesomeIcon className='naviconbar' icon={faBars} />
        </div>

    </div>
  )
}

export default NavBar