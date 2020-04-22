import React from 'react';
import { render } from '@testing-library/react';
import App from '.';
import TestProviderTemplate from '../../utils/TestProviderTemplate';

test('renders learn react link', () => {
  const { getByText } = render(
    <TestProviderTemplate>
      <App />
    </TestProviderTemplate>
  );

  expect(getByText(/list/i)).toBeInTheDocument();
});
