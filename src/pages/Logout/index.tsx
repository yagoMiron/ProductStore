import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import styles from "./styles.module.css";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../config/firebase";
import { Bars } from "react-loader-spinner";

const Logout = () => {
  const { setExp, setAuthTime } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    signOut(auth)
      .then(() => {
        setExp(0);
        setAuthTime(0);
        navigate("/");
      })
      .catch((err) => {
        const { code, message } = err;
        console.log(code);
        console.log(message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Bars
        height="80"
        width="80"
        color="#fff"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Logout;
