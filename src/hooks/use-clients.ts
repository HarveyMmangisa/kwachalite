
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './use-auth';
import { Client, getClients as getClientsFromDb } from '@/lib/db/clients';

export function useClients() {
    const { user } = useAuth();
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchClients = useCallback(async () => {
        if (user) {
            setLoading(true);
            try {
                const fetchedClients = await getClientsFromDb(user.uid);
                setClients(fetchedClients);
            } catch (error) {
                console.error("Error fetching clients:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setClients([]);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    return { clients, loading, refreshClients: fetchClients };
}
