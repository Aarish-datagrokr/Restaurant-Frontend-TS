import React from 'react';
import {shallow} from 'enzyme';
import BookingForm from '../../../components/Pages/BookingForm';
import Axios, { AxiosResponse } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
let mockAxios:MockAdapter;

const setState:any = jest.fn();
const useStateSpy:any = jest.spyOn(React, "useState");
useStateSpy.mockImplementation((initialState:any) => [initialState, setState]);
const wrapper = shallow(<BookingForm />);

describe("Unit test for BookingForm", () => {
    it('should render Delete Button', () => {
        const addButtonElement = wrapper.find("#addButton");
        expect(addButtonElement).toHaveLength(1);
        expect(addButtonElement.text()).toEqual('Submit');
    });
});

it("should update state on input change and toggle setOpen on button click", () => {

  expect(wrapper.find('#name').text()).toEqual('');
  wrapper.find('#name').simulate('change',{target: {value: 'Aarish'}});
  expect(wrapper.find('#name').get(0).props.value).toEqual('Aarish');

  expect(wrapper.find('#phoneNo').text()).toEqual('');
  wrapper.find('#phoneNo').simulate('change',{target: {value: '9988776655'}});
  expect(wrapper.find('#phoneNo').get(0).props.value).toEqual("9988776655");

  expect(wrapper.find('#reservationTime').text()).toEqual('');
  wrapper.find('#reservationTime').simulate('change',{target: {value: '12:10:00'}});
  expect(wrapper.find('#reservationTime').get(0).props.value).toEqual("12:10:00");

    wrapper
      .find('#addButton')
      .simulate("click", { target: { value: true } });

    wrapper
      .find('#alert')
      .simulate("close", { target: { value: false } });
  });

  it("should check member value 1", ()=> {
    expect(wrapper.find('#members').text()).toEqual('1234');
    const target = {value: 1};
    const event = {target};
    wrapper.find('#members').simulate('change',event);
    expect(wrapper.find('#members').get(0).props.value).toEqual(1);
    
  });


  it("should check member value 2", ()=> {
    expect(wrapper.find('#members').text()).toEqual('1234');
    const target = {value: 2};
    const event = {target};
    wrapper.find('#members').simulate('change',event);
    expect(wrapper.find('#members').get(0).props.value).toEqual(2);
    
  });

  it("should check member value 3", () => {
    expect(wrapper.find('#members').text()).toEqual('1234');
    const target = {value: 3};
    const event = {target};
    wrapper.find('#members').simulate('change',event);
    expect(wrapper.find('#members').get(0).props.value).toEqual(3);
    
  });

  it("should check other member value 4",() => {
    expect(wrapper.find('#members').text()).toEqual('1234');
    const target = {value: 4};
    const event = {target};
    wrapper.find('#members').simulate('change',event);
    expect(wrapper.find('#members').get(0).props.value).toEqual(4);
    
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

/*  describe('Axios testing', () => {
    const addSpy = jest.spyOn(Axios,'post');
    const target = {
      name: '',
      phoneNo: '',
      members:'',
      reservationTime: ''
    };
    
    jest.mock('Axios');
    const mockedAxios = jest.mocked(axios.post,true);
    const response:AxiosResponse <any,any>= {status:200,data:'',config:{},statusText:'Table booked',headers:{}};
    test('Booking confirmed', async () => {
        (Axios.post as jest.Mock).mockResolvedValue(() => Promise.resolve());
        wrapper.find('#form').simulate('submit');
        expect(addSpy).toHaveBeenCalledWith("restaurant/Bookings/Book-For",{"name": undefined, "members": undefined, "phoneNo": undefined, "reservationTime": undefined},{"headers": {"content-type": "application/json"}});
        expect(useStateSpy).toHaveBeenCalled();        
        mockedAxios.mockResolvedValueOnce(response);
        wrapper.find('#form').simulate('submit',event);
        expect(addSpy).toHaveBeenCalledWith("restaurant/Bookings/Book-For",{"name": undefined, "members": undefined, "phoneNo": undefined, "reservationTime": undefined},{"headers": {"content-type": "application/json"}});
        expect(useStateSpy).toHaveBeenCalled();        

      });
  
    test('Exception raised', async () => {
      const data = 'Something Wrong';
      const error = {response: data};
      (Axios.post as jest.Mock).mockRejectedValue(error);
      expect(useStateSpy).toHaveBeenCalled();    
    }); 
  });  
 */ 