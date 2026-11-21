import { NavLink, Outlet } from "react-router";
import { useStore } from "../context/useStore";

function Layout() {
  const { cartCount, wishlist } = useStore();

  return (
    <>
      <header className="site-header">
        <NavLink to="/" className="logo">
          Kickslam
        </NavLink>
        <nav>
          <NavLink to="/" end>
            Shop
          </NavLink>
          <NavLink to="/wishlist">♥ Wishlist ({wishlist.length})</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
