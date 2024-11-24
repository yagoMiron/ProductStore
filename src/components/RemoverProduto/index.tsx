import styles from "./styles.module.css";

type Props = {
  removeProduct: () => void;
  closeModal: () => void;
};

const RemoverProduto = ({ removeProduct, closeModal }: Props) => {
  return (
    <>
      <h2 className={styles.title}>Remover Produto !</h2>
      <div className={styles.content}>
        <span className={styles.message}>
          Você tem certeza que deseja remover este produto?
        </span>
        <div className={styles.buttons}>
          <button className={styles.remover} onClick={removeProduct}>
            Sim, tenho certeza!
          </button>
          <button className={styles.fechar} onClick={closeModal}>
            Ops, me enganei!
          </button>
        </div>
      </div>
    </>
  );
};

export default RemoverProduto;
