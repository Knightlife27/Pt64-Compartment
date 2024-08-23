import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    Nestify.AI
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/homeSearchPage" className="nav-link" activeclassname="active">Buy</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/searchPage" className="nav-link" activeclassname="active">Rent</NavLink>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/categories" className="nav-link">
                                <button className="btn btn-outline-primary">Categories</button>
                            </Link>
                        </li>
                        {!store.token ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/signin" className="nav-link">
                                        <button className="btn btn-primary">Sign In</button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link">
                                        <button className="btn btn-primary">Sign Up</button>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <Link to="/signin" className="nav-link">
                                    <button className="btn btn-primary" onClick={() => actions.logOut()}>Logout</button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
