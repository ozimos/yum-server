/* global React:false, shallow:false */
import { App } from '../App';

describe('Login Component', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).exists(<div className="App" />)).toBe(true);
  });
});
