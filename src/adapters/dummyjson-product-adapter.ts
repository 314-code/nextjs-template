import type { DataAdapter } from "./data-adapter";

/**
 * Internal filter model - what your app uses
 */
export type InternalProductFilters = {
	search?: string;
	category?: string;
};

/**
 * Product type matching DummyJSON API
 */
export type DummyJSONProduct = {
	id: number;
	title: string;
	description: string;
	price: number;
	rating: number;
	category: string;
	thumbnail?: string;
	images?: string[];
	tags?: string[];
	brand?: string;
	stock?: number;
	discountPercentage?: number;
};

/**
 * DummyJSON API response structure
 */
export type DummyJSONProductsResponse = {
	products: DummyJSONProduct[];
	total: number;
	skip: number;
	limit: number;
};

/**
 * Adapter for DummyJSON Products API
 * Handles: skip-based pagination, search/category endpoints, response parsing
 */
export class DummyJSONProductAdapter
	implements DataAdapter<DummyJSONProduct, InternalProductFilters, DummyJSONProductsResponse, number>
{
	private readonly limit: number;

	constructor(limit = 20) {
		this.limit = limit;
	}

	initialPageParam = 0; // First skip value

	buildURL(filters: InternalProductFilters, skip: number): string {
		const params = new URLSearchParams();
		params.set("limit", this.limit.toString());
		params.set("skip", skip.toString());

		// Determine endpoint based on filters
		if (filters.search) {
			// Search endpoint: /products/search?q=...&limit=...&skip=...
			params.set("q", filters.search);
			return `/products/search?${params.toString()}`;
		}

		if (filters.category) {
			// Category endpoint: /products/category/{slug}?limit=...&skip=...
			return `/products/category/${filters.category}?${params.toString()}`;
		}

		// Default list endpoint: /products?limit=...&skip=...
		return `/products?${params.toString()}`;
	}

	parseResponse(response: DummyJSONProductsResponse) {
		return {
			items: response.products,
			total: response.total,
			hasNextPage: response.skip + response.limit < response.total,
		};
	}

	getNextPageParam(lastPage: ReturnType<this["parseResponse"]>, allPages: ReturnType<this["parseResponse"]>[]) {
		const nextSkip = allPages.length * this.limit;
		return nextSkip < lastPage.total ? nextSkip : undefined;
	}
}
