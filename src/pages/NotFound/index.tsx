import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import erro404 from "../../assets/img/erro-404.png";

const NotFound = () => {
  return (
    <div className={styles.Panel}>
      <img
        className={styles.errorImg}
        src={erro404}
        alt="Pagina não encontrada"
      />
      <p className={styles.errorMessage}>
        Ops, Parece que está pagina não existe
      </p>
      <Link className={styles.returnBtn} to="/">
        ❮❮ Voltar
      </Link>
    </div>
  );
};

export default NotFound;
