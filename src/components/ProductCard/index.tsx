import styles from "./styles.module.css";
import { Product } from "../../models/Product";
import { useContext, useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import RemoverProduto from "../RemoverProduto";
import { ProductService } from "../../services/ProductService";
import { UserContext } from "../../context/UserContext";
import EditarProduto from "../EditarProduto";

type Props = {
  product: Product;
  removeProductFromPage: (cod: string) => void;
  editProductFromPage: (newProduct: Product) => void;
};

const ProductCard = ({
  product,
  removeProductFromPage,
  editProductFromPage,
}: Props) => {
  const [openDeleteModal, shouldShowDelete] = useState(false);
  const [openEditModal, shouldShowEdit] = useState(false);
  const { email } = useContext(UserContext);

  const deleteProduct = () => {
    const service = new ProductService();
    service.deletebyOwnerEmailAndCod(email, product.cod);
    removeProductFromPage(product.cod);
    shouldShowDelete(false);
  };

  const editProduct = async (newProduct: Product) => {
    const service = new ProductService();
    try {
      await service.save(newProduct);
    } catch (err) {
      console.log(err);
    }
    editProductFromPage(newProduct);
    shouldShowEdit(false);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.info}>
        <table>
          <tbody>
            <tr>
              <th className={styles.key}>
                <span>Codigo:</span>
              </th>
              <th className={styles.value}>
                <span>{product.cod}</span>
              </th>
            </tr>
            <tr>
              <th className={styles.key}>
                <span>Descrição:</span>
              </th>
              <th className={styles.value}>
                <span>{product.description}</span>
              </th>
            </tr>
            <tr>
              <th className={styles.key}>
                <span>Preço:</span>
              </th>
              <th className={styles.value}>
                <span>R$ {product.unitPrice}</span>
              </th>
            </tr>
            <tr>
              <th className={styles.key}>
                <span>Estoque:</span>
              </th>
              <th className={styles.value}>
                <span>{product.stock}</span>
              </th>
            </tr>
            <tr>
              <th className={styles.key}>
                <span>Total:</span>
              </th>
              <th className={styles.value}>
                <span>R$ {product.unitPrice * product.stock}</span>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.actionButton} ${styles.editButton}`}
          onClick={() => shouldShowEdit(true)}
        >
          <span>Editar</span>
        </button>
        <Modal
          open={openEditModal}
          onClose={() => shouldShowEdit(false)}
          center
          classNames={{
            modal: styles.deleteModal,
          }}
        >
          <EditarProduto
            closeModal={() => shouldShowEdit(false)}
            refProduct={product}
            editProduct={editProduct}
          />
        </Modal>

        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={() => shouldShowDelete(true)}
        >
          <span>Remover</span>
        </button>
        <Modal
          open={openDeleteModal}
          onClose={() => shouldShowDelete(false)}
          center
          classNames={{
            modal: styles.deleteModal,
          }}
        >
          <RemoverProduto
            removeProduct={deleteProduct}
            closeModal={() => shouldShowDelete(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default ProductCard;
