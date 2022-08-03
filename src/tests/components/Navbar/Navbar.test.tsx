import React, { Component } from 'react';
import {shallow} from 'enzyme';
import Navbar from '../../../components/Navbar/Navbar';

const setState = jest.fn();
const useStateSpy:any = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState:Boolean) => [initialState, setState]);
const wrapper = shallow<Component>(<Navbar />);

test('Should test Navbar component', () => {
    expect(wrapper).toMatchSnapshot();
});

it("should toggle isNavbarExpanded on click", () => {
    const newInputValue:Boolean = true;
    wrapper
      .find('#hamburger')
      .simulate("click", { target: { value: newInputValue } });
  });

  it("should toggle isNavbarExpanded on click", () => {
    const newInputValue = true;
    wrapper
      .find('#add')
      .simulate("click", { target: { value: newInputValue } });
  });

  it("should toggle isNavbarExpanded on click", () => {
    const newInputValue = true;
    wrapper
      .find('#update')
      .simulate("click", { target: { value: newInputValue } });
  });

  it("should toggle isNavbarExpanded on click", () => {
    const newInputValue = true;
    wrapper
      .find('#delete')
      .simulate("click", { target: { value: newInputValue } });
  });