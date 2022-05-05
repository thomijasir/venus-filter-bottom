import React from 'react';
import render from 'react-test-renderer';
import Button from './Button.comp';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Error General Component Snap Test', () => {
  describe('render()', () => {
    test('renders the component', () => {
      const compProps = {
        classStyle: 'primary',
        onClick: () => {},
        id: 'btn',
      };
      const wrapper = render.create(<Button {...compProps}>Sample</Button>);
      expect(wrapper.toJSON()).toMatchSnapshot();
    });
  });
});

// import React from 'react';
// import { shallow } from 'enzyme';
// import toJson from 'enzyme-to-json';
// import Button from './Button.comp';

// const event = { preventDefault: () => {}, stopPropagation: () => {} };
// let wrapper;
// let instance;

// const props = {
//   style: 'outline',
//   onClick: jest.fn(),
// };

// jest.useFakeTimers();

// beforeEach(() => {
//   wrapper = shallow(<Button {...props} />);
//   instance = wrapper.instance();
//   jest.spyOn(event, 'preventDefault');
//   jest.spyOn(event, 'stopPropagation');
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

// describe('BillersPage Snap Test', () => {
//   describe('render()', () => {
//     test('renders with success result', () => {
//       expect(toJson(wrapper)).toMatchSnapshot();
//     });
//     test('Add class renders with success result', () => {
//       const nProps = {
//         style: 'outline',
//         onClick: jest.fn(),
//         addClass: 'inactive',
//       };
//       const nWrapper = shallow(<Button {...nProps} />);
//       expect(toJson(nWrapper)).toMatchSnapshot();
//     });
//   });
//   describe('strRegExPattern()', () => {
//     test('get match pattern strRegExPattern', () => {
//       const result = instance.stringMatch('data inactive', 'inactive');
//       expect(result.length).toEqual(1);
//     });
//   });
//   describe('mainAction()', () => {
//     test('mainAction excuted', () => {
//       instance.mainAction(event);
//       expect(event.preventDefault).toHaveBeenCalled();
//       expect(event.stopPropagation).toHaveBeenCalled();
//       expect(props.onClick).toHaveBeenCalled();
//     });
//   });
// });
