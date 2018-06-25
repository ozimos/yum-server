/* global React:false, shallow:false toJson:false */

import { Nav } from '../nav/Nav';

describe('Nav Component', () => {
  const user = { isCaterer: true };

  it('should render without throwing an error', () => {
    expect(shallow(<Nav user={user} />)
      .exists(<nav className="flexbox" />)).toBe(true);
  });
  it('renders correctly', () => {
    const wrapper = shallow(<Nav user={user} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

