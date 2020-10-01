import 'react-native-gesture-handler';
import React from 'react';
import { View, StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import AppContainer from '~/hooks';
import Routes from '~/routes';
import theme from './styles/theme';

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <View style={{ backgroundColor: theme.colors.mainBg, flex: 1 }}>
      <AppContainer>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.mainBg}
        />
        <Routes />
      </AppContainer>
    </View>
  </ThemeProvider>
);

export default App;
