import { useContext } from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import logout from "../../assets/img/logout.png";
import stock from "../../assets/img/stock.png";
import { UserContext } from "../../context/UserContext";

const Header = () => {
  const { photoURL, name } = useContext(UserContext);

  return (
    <header className={styles.header}>
      <img src={stock} className={styles.stock} alt="Voltar" />
      <h1 className={styles.appTitle}>
        {" "}
        Product<strong>Stock</strong>{" "}
      </h1>

      <img src={photoURL} className={styles.thumb} alt={name} />

      <Link to="/logout">
        <img src={logout} className={styles.logout} alt="Sair" />
      </Link>
    </header>
  );
};

export default Header;
