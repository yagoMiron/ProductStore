import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";

import { store } from "../config/firebase";
import { FirebaseContainer } from "../models/FirebaseContainer";
import { Product, productConverter } from "../models/Product";

export class ProductService {
  async save(product: Product) {
    const id = this._generateId(product.ownerEmail, product.cod);
    const ref = doc(
      store,
      FirebaseContainer.PRODUCTS_COLLECTION_NAME,
      id
    ).withConverter(productConverter);

    await setDoc(ref, product);
  }

  async findByOwnerEmailAndCod(ownerEmail: string, cod: string) {
    const id = this._generateId(ownerEmail, cod);
    const ref = doc(
      store,
      FirebaseContainer.PRODUCTS_COLLECTION_NAME,
      id
    ).withConverter(productConverter);

    const snapshot = await getDoc(ref);
    return snapshot.data();
  }

  async findAllByOwner(ownerEmail: string) {
    const ref = collection(store, FirebaseContainer.PRODUCTS_COLLECTION_NAME);
    const q = query(
      ref,
      where("ownerEmail", "==", ownerEmail),
      orderBy("cod")
    ).withConverter(productConverter);

    const snapshot = await getDocs(q);

    const products: Product[] = [];
    snapshot.forEach((doc) => products.push(new Product(doc.data())));

    return products;
  }

  async deletebyOwnerEmailAndCod(ownerEmail: string, cod: string) {
    const id = this._generateId(ownerEmail, cod);
    const ref = doc(
      store,
      FirebaseContainer.PRODUCTS_COLLECTION_NAME,
      id
    ).withConverter(productConverter);
    await deleteDoc(ref);
  }

  private _generateId(ownerEmail: string, cod: string) {
    return `${ownerEmail}|${cod}`;
  }
}
