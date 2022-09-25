
import './App.css';

import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([])
  const [product, setProductDetails] = useState([])
  const [buyers, setBuyerDetails] = useState([])
  const [productId, setState] = useState([])

  const buyerList = [...buyers].sort((a, b) => b.bidAmount - a.bidAmount);


  const getProductId = (e) => {
    //console.log("onchange = "+e.target.value);
    setState(e.target.value);
  };



  const onSubmitProduct = async (e) => {
    e.preventDefault();
    if(productId === 'reset'){
      setProductDetails('');
      setBuyerDetails('');
    }else{
      const resultData = await fetch('https://eauction-seller.azurewebsites.net/seller/show-bids/' + productId)
      const jsonResultData = await resultData.json()      
      setProductDetails(jsonResultData.product);
      setBuyerDetails(jsonResultData.buyers);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://eauction-seller.azurewebsites.net/seller/getProducts')
      const jsonResult = await result.json()

      setProducts(jsonResult);
    }
    fetchData()
  }, [])



  return (
    <div className="products_container">
      <ul className="listData">
        <li style={{border:'1px solid black', padding:'10px'}}>LOGO</li>
        <li style={{border:'1px solid black', padding:'5px', backgroundColor:'#D3D3D3'}}>Fetch Details</li>
      </ul>
      <form onSubmit={onSubmitProduct}>
        <ul  className="listData">
            <li style={{border:'1px solid black', marginLeft: '250px', padding:'5px', backgroundColor:'#D3D3D3'}}>Product</li>
            <li>
            <select className="mySelect" name="productId" onChange={getProductId}>
                  <option value="reset">Please select</option>
                  {products && products.map(product =>

                    <option key={product.id} value={product.id}>{product.productName}</option>

                  )}
                </select>
            </li>
            <li><button className="submitButton" type="submit">GET</button></li>
        </ul>
      </form>     

      <table style={{marginLeft:'185px'}}>
        <tbody>
          <tr>
            <td className="tdBorder">Product Name</td>
            <td className="tdBorder1">{product.productName}</td>
          </tr>
          <tr>
            <td className="tdBorder">Short Description</td>
            <td className="tdBorder1">{product.shortDescription}</td>
          </tr>
          <tr>
            <td className="tdBorder">Detailed Description</td>
            <td className="tdBorder1">{product.detailedDescription}</td>
          </tr>
          <tr>
            <td className="tdBorder">Category</td>
            <td className="tdBorder1">{product.category}</td>
          </tr>
          <tr>
            <td className="tdBorder">Starting price</td>
            <td className="tdBorder1">{product.startingPrice}</td>
          </tr>
          <tr>
            <td className="tdBorder">Bid EndDate</td>
            <td className="tdBorder1">{product.bidEndDate}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <div style={{marginLeft:'auto',marginRight:'auto', backgroundColor: '#D3D3D3',width:'500px', textAlign:'center'}}>Bids</div>
   
      <table style={{marginLeft:'185px', borderSpacing:'15px'}}>
        <thead>          
          <tr style={{ backgroundColor: '#D3D3D3', color: 'black', padding: '10px' }}>
            <th className="bids">Bid Amount</th>
            <th className="bids">Name</th>
            <th className="bids">Email</th>
            <th className="bids">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {buyerList && buyerList.map(buyer =>

            <tr>
              <td className="tdBorder">{buyer.bidAmount}</td>
              <td className="tdBorder">{buyer.firstName} {buyer.lastName}</td>
              <td className="tdBorder">{buyer.email}</td>
              <td className="tdBorder">{buyer.phone}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>

  );
}

export default App;
