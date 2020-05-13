/* global describe it act */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from '@testing-library/react';
import faker from 'faker';

import Home from '../../pages/Home';
import { withRouter } from '../utils/Routes';
import { axiosGet } from '../utils/api';

describe('Users', () => {
  let container: HTMLDivElement | null = null;
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      ReactDOM.unmountComponentAtNode(container);
      container.remove();
      container = null;
    }
  });

  it('should list users', async () => {
    const data = new Array(50).fill(null).map(() => ({
      id: faker.random.number(10000),
      login: faker.name.firstName().toLowerCase(),
    }));

    axiosGet({
      data,
      headers: { 'x-next-page': 46 }
    });

    await act(async () => {
      ReactDOM.render(withRouter(<Home />, '/home', ['/home']), container);
    });

    expect(
      document.querySelectorAll(
        'div.container > div.table-container > table > tbody > tr'
      ).length
    ).toBe(data.length);
  });

  it('should display the id and login of users', async () => {
    const user = {
      id: faker.random.number(10000),
      login: faker.name.firstName().toLowerCase(),
    };

    const data = [user];

    axiosGet({
      data,
      headers: { 'x-next-page': 46 },
    });

    await act(async () => {
      ReactDOM.render(withRouter(<Home />, '/home', ['/home']), container);
    });

    expect(
      document.querySelector(
        'td:nth-child(1).MuiTableCell-root.MuiTableCell-body'
      )?.textContent
    ).toBe(String(user.id));
    expect(
      document.querySelector(
        'td:nth-child(2).MuiTableCell-root.MuiTableCell-body'
      )?.textContent
    ).toBe(user.login);
  });
});
