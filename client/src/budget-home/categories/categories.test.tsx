import React from 'react';
import { cleanup, render } from 'react-testing-library';

import Categories from './categories';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const { queryByLabelText } = render(<Categories budgetId="test" />);
  expect(queryByLabelText(/budgetId/i)).toBeTruthy();
});
