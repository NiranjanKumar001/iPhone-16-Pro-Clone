import React, { useState } from 'react'
import Navbar from '../layouts/Navbar'
import Footer from '../Footer'
import IPhone from '../IPhone'
import '/Dev-Env/open-contributions/iPhone-16-Pro/src/index.css'



// Apple Products for content support

const products = [
  { id: 1, name: 'iPhone', img: 'assets/images/image-grid-iphone-tn_2x.png' },
  { id: 2, name: 'Mac', img: 'assets/images/image-grid-mac-tn_2x.png' },
  { id: 3, name: 'iPad', img: 'assets/images/image-grid-ipad-tn_2x.png' },
  { id: 4, name: 'Watch', img: 'assets/images/image-grid-watch-_2x.png' },
  { id: 5, name: 'Vision', img: 'public/assets/images/image-grid-apple-vision-pro_2x.png' },
  { id: 6, name: 'AirPods', img: 'public/assets/images/image-grid-airpods_2x.png' },
  { id: 7, name: 'TV', img: 'public/assets/images/image-grid-tv_2x.png' },
 
];

const Support = () => {

  return (
    <div>
      <Navbar />

      {/* Support Section */}
      <div className="hero-banner-container">
        <img
          src="assets/images/hero-banner-homepage.image.large_2x-1.png"  // Ensure you use the correct relative path
          alt="Hero Banner"
          className="hero-banner-image"
        />
      </div>


      <div className="support-content">
        <div className="apple-support">
          <h1>Apple Support</h1>
          {/* <p>Here you can find all support-related information, including troubleshooting, FAQs, and product manuals.</p> */}

          <div className="apple-support-products">

          {products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.img} alt={product.name} className="product-image" />
                <h4 className="product-title">{product.name}</h4>
              </div>
            ))}
           
          </div>

        </div>

        <h2>Get Help</h2>
        <p>Explore options to get help with your Apple products or find authorized service providers.</p>

        <h2>Helpful Topics</h2>
        <p>Check out helpful guides on using Apple products and solving common issues.</p>
      </div>



    </div>
  )
}

export default Support
