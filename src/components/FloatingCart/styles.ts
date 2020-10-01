import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  ${({ theme }) => css`
    position: absolute;
    bottom: 0px;

    flex-direction: row;
    background: ${theme.colors.primary};

    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const CartPricing = styled.Text`
  padding: 20px;
`;

export const CartTotalPrice = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    color: ${theme.colors.white};
    font-weight: bold;
  `}
`;

export const CartButton = styled.TouchableOpacity`
  ${({ theme }) => css`
    flex-direction: row;
    background: ${theme.colors.primary}

    flex: 1;
    padding: 20px 20px;
    justify-content: space-between;
    align-items: center;
  `}
`;

export const CartButtonText = styled.Text`
  ${({ theme }) => css`
    font-weight: bold;
    color: ${theme.colors.white};
    margin-left: 15px;
    flex: 1;
    margin-right: auto;
  `}
`;
