import React, { useState, useEffect } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View, Image } from 'react-native';

import formatValue from '~/utils/formatValue';
import { useCart } from '~/hooks/cart';
import api from '~/services/api';
import theme from '~/styles/theme';

import FloatingCart from '~/components/FloatingCart';

import * as S from './styles';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      const { data } = await api.get('/products');
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleAddToCart(item: Product): void {
    addToCart(item);
  }

  return (
    <S.Container>
      <S.ProductContainer>
        <S.ProductList
          data={products}
          keyExtractor={item => item.id}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{
            height: 80,
          }}
          renderItem={({ item }) => (
            <S.Product>
              <S.ProductImage source={{ uri: item.image_url }} />
              <S.ProductTitle>{item.title}</S.ProductTitle>
              <S.PriceContainer>
                <S.ProductPrice>{formatValue(item.price)}</S.ProductPrice>
                <S.ProductButton
                  testID={`add-to-cart-${item.id}`}
                  onPress={() => handleAddToCart(item)}
                >
                  <FeatherIcon
                    size={20}
                    name="plus"
                    color={theme.colors.gray}
                  />
                </S.ProductButton>
              </S.PriceContainer>
            </S.Product>
          )}
        />
      </S.ProductContainer>
      <FloatingCart />
    </S.Container>
  );
};

export default Dashboard;
