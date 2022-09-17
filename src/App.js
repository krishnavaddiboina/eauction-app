
import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([])
  const [product, setProductDetails] = useState([])
  const [buyers, setBuyerDetails] = useState([])
  const [productId, setState] = useState([])


  const getProductId = (e) => {
    //console.log("onchange = "+e.target.value);
    setState(e.target.value);
  };



  const onSubmitProduct = async (e) => {
    e.preventDefault();

    const resultData = await fetch('http://localhost:8081/seller/show-bids/' + productId)
    const jsonResultData = await resultData.json()
    //console.log("product = "+JSON.stringify(jsonResultData.product));
    //console.log("buyers = "+JSON.stringify(jsonResultData.buyers));
    setProductDetails(jsonResultData.product);
    setBuyerDetails(jsonResultData.buyers)
  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('http://localhost:8081/seller/getProducts')
      const jsonResult = await result.json()

      setProducts(jsonResult);
    }
    fetchData()
  }, [])



  return (
    <div className="products_container">
      <ul class="listData">
        <li style={{border:'1px solid black', padding:'10px'}}>LOGO</li>
        <li style={{border:'1px solid black', padding:'5px', backgroundColor:'#D3D3D3'}}>Fetch Details</li>
      </ul>
      <form onSubmit={onSubmitProduct}>
        <ul  class="listData">
            <li style={{border:'1px solid black', marginLeft: '250px', padding:'5px', backgroundColor:'#D3D3D3'}}>Product</li>
            <li>
            <select class="mySelect" name="productId" onChange={getProductId}>
                  <option value="">Please select</option>
                  {products && products.map(product =>

                    <option key={product.id} value={product.id}>{product.productName}</option>

                  )}
                </select>
            </li>
            <li><button class="submitButton" type="submit">GET</button></li>
        </ul>
      </form>     

      <table style={{marginLeft:'185px'}}>
        <tbody>
          <tr>
            <td class="tdBorder">Product Name</td>
            <td class="tdBorder1">{product.productName}</td>
          </tr>
          <tr>
            <td class="tdBorder">Short Description</td>
            <td class="tdBorder1">{product.shortDescription}</td>
          </tr>
          <tr>
            <td class="tdBorder">Detailed Description</td>
            <td class="tdBorder1">{product.detailedDescription}</td>
          </tr>
          <tr>
            <td class="tdBorder">Category</td>
            <td class="tdBorder1">{product.category}</td>
          </tr>
          <tr>
            <td class="tdBorder">Starting price</td>
            <td class="tdBorder1">{product.startingPrice}</td>
          </tr>
          <tr>
            <td class="tdBorder">Bid EndDate</td>
            <td class="tdBorder1">{product.bidEndDate}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div style={{marginLeft:'auto',marginRight:'auto', backgroundColor: '#D3D3D3',width:'500px', textAlign:'center'}}>Bids</div>
   
      <table style={{marginLeft:'185px', borderSpacing:'15px'}}>
        <thead>          
          <tr style={{ backgroundColor: '#D3D3D3', color: 'black', padding: '10px' }}>
            <th class="bids">Bid Amount</th>
            <th class="bids">Name</th>
            <th class="bids">Email</th>
            <th class="bids">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {buyers && buyers.map(buyer =>

            <tr>
              <td class="tdBorder">{buyer.bidAmount}</td>
              <td class="tdBorder">{buyer.firstName} {buyer.lastName}</td>
              <td class="tdBorder">{buyer.email}</td>
              <td class="tdBorder">{buyer.phone}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>

  );
}

export default App;
