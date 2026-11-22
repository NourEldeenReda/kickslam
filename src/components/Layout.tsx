import { NavLink, Outlet } from "react-router";
import { useStore } from "../context/useStore";
import { useAuth } from "../context/useAuth";
function Layout() {
  const { cartCount, wishlist } = useStore();
  const { user, signOut } = useAuth();

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
          {user ? (
            <button
              type="button"
              className="nav-button"
              title={user.email ?? undefined}
              onClick={signOut}
            >
              Log out
            </button>
          ) : (
            <NavLink to="/login">Log in</NavLink>
          )}
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
