import { Link, Route, Routes } from "react-router";
import Layout from "./components/Layout";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ShopPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route
          path="*"
          element={
            <p>
              Page not found. <Link to="/">Back to the shop</Link>
            </p>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
