import React, { useContext, useState } from "react";
import { useMask } from "@react-input/mask";

import styles from "./styles.module.css";
import { UserContext } from "../../context/UserContext";
import { ProductService } from "../../services/ProductService";
import { Severity } from "../../enums/Severity";
import Message from "../../components/Message";
import { Product } from "../../models/Product";

type props = {
  addProduct: (newProduct: Product) => void;
};

const NewProduct = ({ addProduct }: props) => {
  const [cod, setCod] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setPrice] = useState(0.5);
  const [stock, setStock] = useState(1);

  const [responseSeverity, setResponseSeverity] = useState(Severity.SUCCESS);
  const [showResponseMessage, shouldShowResponseMessage] = useState(false);

  const ownerEmail = useContext(UserContext).email;

  const service = new ProductService();

  const saveToDB = async () => {
    const newProduct = new Product({
      cod,
      description,
      unitPrice,
      stock,
      ownerEmail,
    });

    try {
      await service.save(newProduct);
      setResponseSeverity(Severity.SUCCESS);
      addProduct(newProduct);
    } catch (err) {
      console.log(err);
      setResponseSeverity(Severity.ERROR);
    }

    setCod("");
    setDescription("");
    setPrice(0.5);
    setStock(1);
  };

  const saveProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    shouldShowResponseMessage(false);

    const existingProduct = await service.findByOwnerEmailAndCod(
      ownerEmail,
      cod
    );

    if (existingProduct) {
      setResponseSeverity(Severity.WARNING);
    } else {
      await saveToDB();
    }
    shouldShowResponseMessage(true);
  };

  const areInputsInvalid = () => {
    if (
      cod.match(/^[A-Z]{2}\d{3}-\d{2}$/) === null ||
      description.length < 5 ||
      unitPrice < 0.5 ||
      stock < 1
    ) {
      return true;
    }

    return false;
  };
  const codRef = useMask({
    mask: "$$___-__",
    replacement: { $: /[a-zA-Z]/, _: /\d/ },
  });

  return (
    <div>
      <form className={styles.productForm} onSubmit={saveProduct}>
        <h2>+ Adicionar Novo Produto</h2>

        <label htmlFor="cod">Codigo*:</label>
        <input
          ref={codRef}
          placeholder="AA999-99"
          type="text"
          name="cod"
          value={cod}
          required
          onInvalid={(e) => {
            e.currentTarget.setCustomValidity("O codigo deve ser preenchido");
          }}
          onChange={(e) => {
            setCod(e.target.value.toUpperCase());
            e.currentTarget.setCustomValidity("");
          }}
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

        <input type="submit" value="Salvar" disabled={areInputsInvalid()} />
      </form>

      {showResponseMessage && (
        <Message
          severity={responseSeverity}
          message={(() => {
            if (responseSeverity === Severity.SUCCESS) {
              return "Produto adicionado com Sucesso";
            } else if (responseSeverity === Severity.WARNING) {
              return "Já existe um produto com esse código.";
            }

            return "Ocorreu um erro ao tentar salvar o Produto.";
          })()}
        />
      )}
    </div>
  );
};

export default NewProduct;
