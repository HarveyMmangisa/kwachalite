
"use client";

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './use-auth';
import { Product, getProducts as getProductsFromDb } from '@/lib/db/products';

export function useProducts() {
    const { user } = useAuth();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        if (user) {
            setLoading(true);
            try {
                const fetchedProducts = await getProductsFromDb(user.uid);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setProducts([]);
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return { products, loading, refreshProducts: fetchProducts };
}
