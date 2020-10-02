import React, { useState, useMemo } from 'react';

import { useNavigation } from '@react-navigation/native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import formatValue from '~/utils/formatValue';

import { useCart } from '~/hooks/cart';
import theme from '~/styles/theme';

import * as S from './styles';

const FloatingCart: React.FC = () => {
  const { cartTotal, totalItensInCart } = useCart();

  const navigation = useNavigation();

  return (
    <S.Container>
      <S.CartButton
        testID="navigate-to-cart-button"
        onPress={() => navigation.navigate('Cart')}
      >
        <FeatherIcon
          name="shopping-cart"
          size={24}
          color={theme.colors.white}
        />
        <S.CartButtonText>{`${totalItensInCart} itens`}</S.CartButtonText>
      </S.CartButton>

      <S.CartPricing>
        <S.CartTotalPrice>{cartTotal}</S.CartTotalPrice>
      </S.CartPricing>
    </S.Container>
  );
};

export default FloatingCart;
