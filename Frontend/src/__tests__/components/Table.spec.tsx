/* global describe it */
import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from 'enzyme';
import { act } from '@testing-library/react';

import { Table } from '../../pages/components';

describe('Table', () => {
  it('should render the table', () => {
    const columns = [
      {
        Header: 'Test',
        accessor: 'test',
      },
    ];
    const data = [
      {
        test: 'Test',
      },
    ];

    const wrapper = mount(<Table columns={columns} data={data} />);

    expect(wrapper.find('td').text()).toBe('Test');
  });

  it('should render a empty table when data is undefined or null or []', () => {
    const columns = [
      {
        Header: 'Test',
        accessor: 'test',
      },
    ];

    let wrapper = mount(<Table columns={columns} data={null} />);

    expect(wrapper.find('td').length).toBe(0);

    wrapper = mount(<Table columns={columns} data={[]} />);

    expect(wrapper.find('td').length).toBe(0);

    wrapper = mount(<Table columns={columns} data={undefined} />);

    expect(wrapper.find('td').length).toBe(0);
  });

  it('should changing page when click in pagination button', () => {
    const columns = [
      {
        Header: 'Test',
        accessor: 'test',
      },
    ];
    const data = [
      {
        test: 'Test',
      },
    ];

    const fetchData = jest.fn();

    const container = document.createElement('div');

    act(() => {
      ReactDOM.render(
        <Table
          pagination
          columns={columns}
          data={data}
          fetchData={fetchData}
        />,
        container
      );
    });

    const nextBtn = document.querySelector('.pagination button:nth-child(2)');

    act(() => {
      nextBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(fetchData).toHaveBeenCalledTimes(1);

    const previousBtn = document.querySelector('.pagination button:nth-child(1)');

    act(() => {
      previousBtn?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(fetchData).toHaveBeenCalledTimes(1);
  });
});
