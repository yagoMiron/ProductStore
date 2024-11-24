import { useContext, useEffect, useState } from "react";

import styles from "./styles.module.css";
import Header from "../../components/Header";
import { UserContext } from "../../context/UserContext";
import { Circles } from "react-loader-spinner";
import ProductCard from "../../components/ProductCard";
import { Product } from "../../models/Product";
import { ProductService } from "../../services/ProductService";
import NewProduct from "../../components/NewProduct";
import { useMask } from "@react-input/mask";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, isLoading] = useState(false);
  const [filter, setFilter] = useState("description");
  const [pesquisa, setPesquisa] = useState("");
  const [resultadoPesquisa, setResultadoPesquisa] = useState<Product[]>([]);

  const { email } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      isLoading(true);
      const service = new ProductService();
      const results = await service.findAllByOwner(email);
      setProducts(results);
      isLoading(false);
      setResultadoPesquisa(results);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      filtrar(pesquisa);
    })();
  }, [products, pesquisa]);

  const addProductonPage = (newProduct: Product) => {
    setProducts([...products, newProduct]);
  };
  const removeProductFromPage = (cod: string) => {
    const newProductsArray = products.filter((p) => p.cod !== cod);
    setProducts(newProductsArray);
  };
  const editProductFromPage = (newProduct: Product) => {
    const newProductsArray = products.map((p) =>
      p.cod === newProduct.cod ? newProduct : p
    );
    setProducts(newProductsArray);
  };

  const filtrar = (query: string) => {
    let queryPesquisa: Product[];
    if (filter === "description") {
      queryPesquisa = products.filter((p) =>
        p.description.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      queryPesquisa = products.filter((p) => p.cod.includes(query));
    }
    setResultadoPesquisa(queryPesquisa);
  };
  const codRef = useMask({
    mask: "$$___-__",
    replacement: { $: /[a-zA-Z]/, _: /\d/ },
  });

  return (
    <>
      <Header />

      <NewProduct addProduct={addProductonPage} />

      <div className={styles.container}>
        <Circles
          height="80"
          width="80"
          color="#fff"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={loading}
        />

        <div className={styles.pesquisa}>
          <label htmlFor="filter">Critério: </label>
          <select
            name="filter"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
          >
            <option value="description">Descrição</option>
            <option value="cod">Codigo</option>
          </select>

          <label htmlFor="pesquisa">Pesquisa:</label>
          <input
            ref={filter === "cod" ? codRef : null}
            placeholder={`Pesquise por ${
              filter === "cod" ? "codigo" : "descrição"
            }`}
            type="text"
            name="pesquisa"
            value={pesquisa}
            onChange={(e) => {
              const value =
                filter === "cod"
                  ? e.target.value.toUpperCase()
                  : e.target.value;

              setPesquisa(value);
            }}
          />
        </div>
        {!loading && resultadoPesquisa.length > 0 && (
          <>
            <h1>Seus produtos</h1>

            {resultadoPesquisa.map((p) => (
              <ProductCard
                key={p.cod}
                product={p}
                removeProductFromPage={removeProductFromPage}
                editProductFromPage={editProductFromPage}
              />
            ))}
          </>
        )}

        {!loading && resultadoPesquisa.length === 0 && (
          <p>Nenhum produto encontrado</p>
        )}
      </div>
    </>
  );
};

export default Home;
