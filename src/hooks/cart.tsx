import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import formatValue from '~/utils/formatValue';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Omit<Product, 'quantity'>): void;
  increment(id: string): void;
  decrement(id: string): void;
  totalItensInCart: number;
  cartTotal: string;
}

const CartContext = createContext<CartContext | null>(null);

const storageKeyProducts = '@gomarketplace:products';

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const storageProducts = await AsyncStorage.getItem(storageKeyProducts);
      if (storageProducts) {
        setProducts([...JSON.parse(storageProducts)]);
      }
    }
    loadProducts();
  }, []);

  const saveProducts = async (newProducts: Product[]): Promise<void> => {
    setProducts(newProducts);
    await AsyncStorage.setItem(storageKeyProducts, JSON.stringify(newProducts));
  };

  const addToCart = useCallback(
    async (product: Product) => {
      const productExist = products.find(p => p.id === product.id);
      let newProducts;

      if (productExist) {
        newProducts = products.map(p =>
          p.id === product.id ? { ...product, quantity: p.quantity + 1 } : p,
        );
      } else {
        newProducts = [...products, { ...product, quantity: 1 }];
      }
      saveProducts(newProducts);
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      const newProducts = products.map(product =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product,
      );
      saveProducts(newProducts);
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const newProducts = products
        .map(product =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter(p => p.quantity !== 0);

      saveProducts(newProducts);
    },
    [products],
  );

  const totalItensInCart = useMemo(() => {
    const items = products.reduce((acc, product) => {
      return acc + product.quantity;
    }, 0);

    return items;
  }, [products]);

  const cartTotal = useMemo(() => {
    const total = products.reduce((acc, product) => {
      const productsSubTotal = product.price * product.quantity;
      return acc + productsSubTotal;
    }, 0);

    return formatValue(total);
  }, [products]);

  const value = useMemo(
    () => ({
      addToCart,
      increment,
      decrement,
      products,
      totalItensInCart,
      cartTotal,
    }),
    [products, addToCart, increment, decrement, totalItensInCart, cartTotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
