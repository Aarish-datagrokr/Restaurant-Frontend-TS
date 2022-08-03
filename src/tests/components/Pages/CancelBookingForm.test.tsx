import React from 'react';
import {shallow} from 'enzyme';
import CancelBookingForm from '../../../components/Pages/CancelBookingForm';
import Axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
let mockAxios:MockAdapter;

const setState:any = jest.fn();
const useStateSpy:any = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState:any) => [initialState, setState]);
const wrapper = shallow(<CancelBookingForm />);

describe("Unit test for BookingForm", () => {
    it('should render Delete Button', () => {
        const addButtonElement = wrapper.find("#deleteButton");
        expect(addButtonElement).toHaveLength(1);
        expect(addButtonElement.text()).toEqual('Delete');
    });
});

it("should update state on input change and toggle setOpen on button click", () => {

  expect(wrapper.find('#phoneNo').text()).toEqual('');
  wrapper.find('#phoneNo').simulate('change',{target: {value: '9988776655'}});
  expect(wrapper.find('#phoneNo').get(0).props.value).toEqual("9988776655");

      wrapper
      .find('#deleteButton')
      .simulate("click", { target: { value: true } });

    wrapper
      .find('#alert')
      .simulate("close", { target: { value: false } });
  });

  describe('Testing of form submission', () => {
    const target = {
        name: '',
        phoneNo: '',
        members: '',
        reservationTime: ''
    };

    const event = { preventDefault: () => {}, target };
    beforeEach(() => {
      mockAxios = new MockAdapter(Axios);
      jest.spyOn(event, 'preventDefault');
    });
  
    afterEach(() => {
      mockAxios.reset();
    });
  
    it("should test handleSubmit", () => {
  
      wrapper
      .find('#form')
      .simulate("submit",event);
    });
  });