"use client";

import { Product } from "@prisma/client";
import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	useState,
	useContext,
} from "react";

type ProductData = Product & { seller: string | undefined };

type StoreFields = {
	cartItems: ProductData[];
	setCartItems: Dispatch<SetStateAction<ProductData[]>>;
};

const StoreContext = createContext<StoreFields | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
	const [cartItems, setCartItems] = useState<ProductData[]>([]);

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
