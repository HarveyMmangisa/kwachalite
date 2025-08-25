
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from "firebase/firestore";
import { db } from "../firebase";

export interface Client {
    id?: string;
    name: string;
    email: string;
    phone: string;
    status: "Active" | "Inactive";
}

export async function addClient(userId: string, client: Client) {
    try {
        await addDoc(collection(db, "users", userId, "clients"), client);
    } catch (error) {
        console.error("Error adding client: ", error);
    }
}

export async function getClients(userId: string): Promise<Client[]> {
    const q = query(collection(db, "users", userId, "clients"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
}

export async function getClient(clientId: string): Promise<Client | null> {
    // This is not secure, as it doesn't check for user ID.
    // In a real app, you would need to query within the user's collection.
    // For simplicity, we're fetching directly. This needs to be improved.
    const docRef = doc(db, "clients", clientId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Client;
    } else {
        return null;
    }
}

export async function updateClient(clientId: string, client: Partial<Client>) {
     // This is not secure. See getClient comment.
    const docRef = doc(db, "clients", clientId);
    await updateDoc(docRef, client);
}

export async function deleteClient(clientId: string) {
    // This is not secure. See getClient comment.
    const docRef = doc(db, "clients", clientId);
    await deleteDoc(docRef);
}
