
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, DocumentReference } from "firebase/firestore";
import { db } from "../firebase";

export interface Product {
    id?: string;
    name: string;
    description?: string;
    price: number;
    type: "Product" | "Service";
    userId: string;
}

function getProductsCollection(userId: string) {
    return collection(db, "users", userId, "products");
}

function getProductDoc(userId: string, productId: string): DocumentReference {
    return doc(db, "users", userId, "products", productId);
}

export async function addProduct(userId: string, product: Omit<Product, 'id' | 'userId'>) {
    try {
        await addDoc(getProductsCollection(userId), { ...product, userId });
    } catch (error) {
        console.error("Error adding product: ", error);
    }
}

export async function getProducts(userId: string): Promise<Product[]> {
    const querySnapshot = await getDocs(getProductsCollection(userId));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}

export async function getProduct(userId: string, productId: string): Promise<Product | null> {
    const docSnap = await getDoc(getProductDoc(userId, productId));

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
    } else {
        return null;
    }
}

export async function updateProduct(userId: string, productId: string, product: Partial<Product>) {
    await updateDoc(getProductDoc(userId, productId), product);
}

export async function deleteProduct(userId: string, productId: string) {
    await deleteDoc(getProductDoc(userId, productId));
}
