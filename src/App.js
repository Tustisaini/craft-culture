'./App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import ShopCategory from './Pages/ShopCategory';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import Footer from './Components/Footer/Footer';
import banner_pottery from './Components/Assets/Banner_pottery.png'
import banner_textile from './Components/Assets/Banner_textile.png'
import banner_stone from './Components/Assets/Banner_stone.png'

function App() {
  return (
    <div>
<BrowserRouter>
<Navbar />
<Routes>
<Route path='/' element={<Shop/>}/>
<Route path='/Pottery & Ceramics' element={<ShopCategory banner={banner_pottery} Category="Pottery & Ceramics"/> } />
<Route path='/Textiles & Fabrics' element={<ShopCategory banner={banner_textile} Category="Textiles & Fabrics" />} />
<Route path='/Stone & Marble' element={<ShopCategory banner={banner_stone} Category="Stone & Marble"/> } />
<Route path='/product' element={<Product/> } />
<Route path='/product/:productId' element={<Product/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/login' element={<LoginSignup/>}/>

</Routes>
<Footer/>
</BrowserRouter>
      
      
    </div>
  );
}

export default App;