/* global React:false */

import { render } from 'react-testing-library';
import 'dom-testing-library/extend-expect';
import { SignUp } from '../signup/SignUp';

test('SignUp component receives prop and then renders text', () => {
  const { getTestId } = render(<SignUp text="The funniest" />);
  expect(getTestId('joke-text')).toHaveTextContent('The funniest');
});