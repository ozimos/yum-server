import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';

describe('Login Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).exists(<form className="login" />)).toBe(true);
  });
});
