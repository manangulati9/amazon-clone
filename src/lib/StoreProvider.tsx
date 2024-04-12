"use client";

import { type Product } from "@prisma/client";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useState,
	useContext,
	useEffect,
} from "react";

export type ProductData = Product & {
	seller: string | undefined;
	quantity?: string;
};

type StoreFields = {
	cartItems: ProductData[];
	setCartItems: Dispatch<SetStateAction<ProductData[]>>;
};

const StoreContext = createContext<StoreFields | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<ProductData[]>([]);

	useEffect(() => {
		const cartItemsString = localStorage.getItem("cartItems");

		if (!cartItemsString) {
			return;
		}

		const storedCartItems = JSON.parse(cartItemsString) as ProductData[];
		setCartItems(storedCartItems);
	}, []);

	return (
		<StoreContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</StoreContext.Provider>
	);
}

export function useStore() {
	const context = useContext(StoreContext);

	if (!context) {
		throw new Error(
			"useStoreContext must be used within StoreContextProvider!",
		);
	}

	return context;
}
