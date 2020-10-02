import React, { useMemo } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { View } from 'react-native';

import { useCart } from '~/hooks/cart';

import formatValue from '~/utils/formatValue';
import theme from '~/styles/theme';

import * as S from './styles';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const {
    increment,
    decrement,
    products,
    totalItensInCart,
    cartTotal,
  } = useCart();

  function handleIncrement(id: string): void {
    increment(id);
  }

  function handleDecrement(id: string): void {
    decrement(id);
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
          renderItem={({ item }: { item: Product }) => (
            <S.Product>
              <S.ProductImage source={{ uri: item.image_url }} />
              <S.ProductTitleContainer>
                <S.ProductTitle>{item.title}</S.ProductTitle>
                <S.ProductPriceContainer>
                  <S.ProductSinglePrice>
                    {formatValue(item.price)}
                  </S.ProductSinglePrice>

                  <S.TotalContainer>
                    <S.ProductQuantity>{`${item.quantity}x`}</S.ProductQuantity>

                    <S.ProductPrice>
                      {formatValue(item.price * item.quantity)}
                    </S.ProductPrice>
                  </S.TotalContainer>
                </S.ProductPriceContainer>
              </S.ProductTitleContainer>
              <S.ActionContainer>
                <S.ActionButton
                  testID={`increment-${item.id}`}
                  onPress={() => handleIncrement(item.id)}
                >
                  <FeatherIcon
                    name="plus"
                    color={theme.colors.primary}
                    size={16}
                  />
                </S.ActionButton>
                <S.ActionButton
                  testID={`decrement-${item.id}`}
                  onPress={() => handleDecrement(item.id)}
                >
                  <FeatherIcon
                    name="minus"
                    color={theme.colors.primary}
                    size={16}
                  />
                </S.ActionButton>
              </S.ActionContainer>
            </S.Product>
          )}
        />
      </S.ProductContainer>
      <S.TotalProductsContainer>
        <FeatherIcon
          name="shopping-cart"
          color={theme.colors.white}
          size={24}
        />
        <S.TotalProductsText>{`${totalItensInCart} itens`}</S.TotalProductsText>
        <S.SubtotalValue>{cartTotal}</S.SubtotalValue>
      </S.TotalProductsContainer>
    </S.Container>
  );
};

export default Cart;
