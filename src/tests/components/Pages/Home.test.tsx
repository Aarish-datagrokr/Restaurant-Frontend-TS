import {shallow} from 'enzyme';
import Home from '../../../components/Pages/Home';

test('Should test Home component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
});
