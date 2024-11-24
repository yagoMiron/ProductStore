import { useState } from "react";
import { Product } from "../../models/Product";
import styles from "./styles.module.css";

type Props = {
  editProduct: (newProduct: Product) => Promise<void>;
  refProduct: Product;
  closeModal: () => void;
};

const EditarProduto = ({ editProduct, refProduct, closeModal }: Props) => {
  const [cod, setCod] = useState(refProduct.cod);
  const [description, setDescription] = useState(refProduct.description);
  const [unitPrice, setPrice] = useState(refProduct.unitPrice);
  const [stock, setStock] = useState(refProduct.stock);

  const areInputsInvalid = () => {
    if (description.length < 5 || unitPrice < 0.5 || stock < 1) {
      return true;
    }

    return false;
  };

  return (
    <>
      <h2 className={styles.title}>Editar Produto</h2>
      <div className={styles.content}>
        <form
          className={styles.productForm}
          onSubmit={(e) => {
            e.preventDefault();

            const newProduct = new Product({
              cod,
              description,
              unitPrice,
              stock,
            });
            editProduct(newProduct);
          }}
        >
          <label htmlFor="cod">Codigo*:</label>
          <input
            type="text"
            name="cod"
            value={cod}
            required
            onChange={(e) => {
              setCod(e.target.value.toUpperCase());
              e.currentTarget.setCustomValidity("");
            }}
            disabled={true}
          />

          <label htmlFor="description">Descrição*:</label>
          <input
            placeholder="Descreva o produto"
            type="text"
            name="description"
            value={description}
            required
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "A descrição deve ter ao menos 5 caracteres"
              );
            }}
            onChange={(e) => {
              setDescription(e.target.value);
              e.currentTarget.setCustomValidity("");
            }}
          />

          <label htmlFor="unitPrice">Preço Unitário*:</label>
          <input
            placeholder="Digite o preço unitário do produto"
            type="number"
            name="unitPrice"
            value={unitPrice}
            required
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "O valor minimo do produto é de R$ 0,50"
              );
            }}
            onChange={(e) => {
              setPrice(Number(e.target.value));
              e.currentTarget.setCustomValidity("");
            }}
            min={0.5}
            step={0.01}
          />

          <label htmlFor="stock">Quantidade em Estoque*:</label>
          <input
            placeholder="Digite a quantidade em estoque"
            type="number"
            name="stock"
            value={stock}
            required
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity(
                "O numero de produtos em estoque deve ser inteiro, positivo e maior que 0"
              );
            }}
            onChange={(e) => {
              setStock(Number(e.target.value));
              e.currentTarget.setCustomValidity("");
            }}
            min={1}
          />
          <div className={styles.buttons}>
            <input
              className={styles.editar}
              type="submit"
              value="Editar Dados"
              disabled={areInputsInvalid()}
            />
            <button className={styles.fechar} onClick={closeModal}>
              Descartar Mudanças
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditarProduto;
