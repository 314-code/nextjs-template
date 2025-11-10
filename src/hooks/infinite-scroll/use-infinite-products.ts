"use client";

import { DummyJSONProductAdapter, type InternalProductFilters } from "@/adapters/dummyjson-product-adapter";
import { fetcher } from "@/lib/api-client";
import { useInfiniteData, usePrefetchNextPage } from "../use-infinite-data";

/**
 * Query key factory for products
 */
export const productKeys = {
	all: ["products"] as const,
	infinite: (filters?: InternalProductFilters) => [...productKeys.all, "infinite", filters] as const,
};

/**
 * Create a singleton adapter instance
 */
const productAdapter = new DummyJSONProductAdapter(20); // 20 items per page

/**
 * Hook for infinite product list with DummyJSON adapter
 * API-agnostic: Swap adapter to change data source
 */
export const useInfiniteProducts = (filters: InternalProductFilters = {}) => {
	return useInfiniteData({
		queryKey: productKeys.infinite(filters),
		adapter: productAdapter,
		fetcher,
		filters,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

/**
 * Hook for prefetching next page of products
 */
export const useProductPrefetch = () => {
	return usePrefetchNextPage({
		queryKey: productKeys.infinite(),
		adapter: productAdapter,
		fetcher,
	});
};
