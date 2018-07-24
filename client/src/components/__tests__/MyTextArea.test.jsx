/* global React:false, shallow:false toJson:false */

import { TextArea } from '../helpers/MyTextArea';

describe('MyTextArea Component', () => {

  it('should render without throwing an error', () => {
    expect(shallow(<TextArea
      getValue={jest.fn()}
      getErrorMessage={jest.fn()}
      name="name"
      typeOfInput="text"
    />)
      .exists(<div
        style={{
          color: 'red', fontSize: '1rem'
        }}
      />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<TextArea
      getValue={jest.fn()}
      getErrorMessage={jest.fn()}
      name="name"
      typeOfInput="text"
    />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

