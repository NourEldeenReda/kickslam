import { NavLink, Outlet } from "react-router";
import { useStore } from "../context/useStore";

function Layout() {
  const { cartCount, wishlist } = useStore();

  return (
    <>
      <header className="site-header">
        <NavLink to="/" className="logo">
          Kick<span>slam</span>
        </NavLink>
        <nav>
          <NavLink to="/" end>
            Shop
          </NavLink>
          <NavLink to="/wishlist">
            ♥ Wishlist
            {wishlist.length > 0 && (
              <span className="badge">{wishlist.length}</span>
            )}
          </NavLink>
          <NavLink to="/cart">
            Cart
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </NavLink>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="site-footer">
        © {new Date().getFullYear()} Kickslam · A demo store, no real orders are
        placed.
      </footer>
    </>
  );
}

export default Layout;
