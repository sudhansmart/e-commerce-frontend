import React, { useState,useRef } from 'react'
import NavBar from '../components/NavBar'
import HeroBanner from '../components/HeroBanner'
import Products from '../components/Products'
import Footer from '../components/Footer';

function Homepage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const ProductRef = useRef(null);

  const scrollToSection = (sectionRef) => {
   
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };  

  return (
    <div>
        <NavBar ProductRef={ProductRef} scrollToSection={scrollToSection} 
        setFilteredProducts={setFilteredProducts} setSearchTerm={setSearchTerm}/>
        <HeroBanner  />
        <Products ProductRef={ProductRef} searchTerm={searchTerm}
         setFilteredProducts={setFilteredProducts} 
         filteredProducts={filteredProducts} />
         <Footer/>

    </div>
  )
}

export default Homepage