
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, DocumentReference } from "firebase/firestore";
import { db } from "../firebase";

export interface Client {
    id?: string;
    name: string;
    email: string;
    phone: string;
    status: "Active" | "Inactive";
}

function getClientsCollection(userId: string) {
    return collection(db, "users", userId, "clients");
}

function getClientDoc(userId: string, clientId: string): DocumentReference {
    return doc(db, "users", userId, "clients", clientId);
}


export async function addClient(userId: string, client: Omit<Client, 'id' | 'userId'>) {
    try {
        await addDoc(getClientsCollection(userId), client);
    } catch (error) {
        console.error("Error adding client: ", error);
        throw new Error("Failed to add client");
    }
}

export async function getClients(userId: string): Promise<Client[]> {
    const querySnapshot = await getDocs(getClientsCollection(userId));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
}

export async function getClient(userId: string, clientId: string): Promise<Client | null> {
    const docSnap = await getDoc(getClientDoc(userId, clientId));

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Client;
    } else {
        return null;
    }
}

export async function updateClient(userId: string, clientId: string, client: Partial<Client>) {
    await updateDoc(getClientDoc(userId, clientId), client);
}

export async function deleteClient(userId: string, clientId: string) {
    await deleteDoc(getClientDoc(userId, clientId));
}
