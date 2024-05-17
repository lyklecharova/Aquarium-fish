import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../contexts/authContext";
import style from "./Header.module.css";

export const Header = () => {
    const { isLog } = useContext(AuthContext);
    return (
        <header className={style["header"]}>
            <nav className={style["header-nav"]}>
                <Link to="/">Aquarium-fish-website</Link>
                <ul role="list" className={style["header-nav-list"]}>
                    <li className={style["header-nav-item"]}>
                        <NavLink to="/">Home</NavLink>{" "}
                    </li>
                    <li className={style["header-nav-item"]}>
                        <NavLink to="/catalog">Catalog</NavLink>
                    </li>
                    {isLog && (
                        <>
                            <li className={style["header-nav-item"]}>
                                <NavLink to="/create">Create</NavLink>
                            </li>

                            <li className={style["header-nav-item"]}>
                                <NavLink to="/logout">Logout</NavLink></li>
                        </>
                    )}

                    {!isLog && (
                        <>
                            <li className={style["header-nav-item"]}>
                                <NavLink to="/login">Login</NavLink>
                            </li>

                            <li className={style["header-nav-item"]}>
                                <NavLink to="/register">Register</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
