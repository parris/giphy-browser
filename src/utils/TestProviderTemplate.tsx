import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from '../utils/createStore';
import { ThemeProvider } from '@material-ui/core';
import { MemoryRouter } from 'react-router-dom';
import theme from '../theme';

interface TestProviderTemplateProps {
  children: React.ReactNode,
}

const TestProviderTemplate: React.FC<TestProviderTemplateProps> = ({ children }) => {
  const store = createStore();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <MemoryRouter>
          { children }
        </MemoryRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default TestProviderTemplate;
