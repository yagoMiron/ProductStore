import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export class Product {
  ownerEmail: string = "";
  cod: string = ""; //AA999-99
  description: string = ""; // minimo 5 caracteres
  unitPrice: number = 0; // valor minimo = 0,50
  stock: number = 0; // positivo

  constructor(obj: Partial<Product>) {
    Object.assign(this, obj);
  }
}

export const productConverter: FirestoreDataConverter<Product, DocumentData> = {
  toFirestore: (product: Product): DocumentData => {
    const cleanproduct = Object.entries(product)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
    return cleanproduct;
  },

  fromFirestore: (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ) => {
    const data = snapshot.data(options);
    return new Product(data);
  },
};
