/* global describe it */
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from '@testing-library/react';
import faker from 'faker';

import Detail from '../../pages/Detail';
import { withRouter } from '../utils/Routes';
import { axiosGet, axiosGetWithFunction } from '../utils/api';
import { User, Repos } from '../../types/user';

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

  it("should present user's details: Id, Login, Profile URL and the date of the login creation", async () => {
    const user: User = {
      id: String(faker.random.number(10000)),
      login: faker.name.firstName().toLowerCase(),
      avatar_url: faker.image.imageUrl(),
      created_at: faker.date.past().toISOString(),
    };

    axiosGetWithFunction((url: string) => {
      if (url.includes('details')) {
        return Promise.resolve({ data: user });
      } else return Promise.resolve({ data: [] });
    });

    await act(async () => {
      ReactDOM.render(
        withRouter(<Detail />, '/detail/:login', [`/detail/${user.login}`]),
        container
      );
    });

    expect(document.querySelector('.title h2:nth-child(1)')?.textContent).toBe(
      `#${user.id}`
    );
    expect(document.querySelector('.title h2:nth-child(2)')?.textContent).toBe(
      user.login
    );
    expect(
      document
        .querySelector('.image-container img')
        ?.attributes.getNamedItem('src')?.value
    ).toBe(user.avatar_url);
    expect(document.querySelector('.description span')?.textContent).toBe(
      `User since ${new Date(user.created_at).toLocaleDateString()}`
    );
  });

  it('should present a table with the public repositories of the user: id, name, and URL to the repository', async () => {
    const user: User = {
      id: String(faker.random.number(10000)),
      login: faker.name.firstName().toLowerCase(),
      avatar_url: faker.image.imageUrl(),
      created_at: faker.date.past().toISOString(),
    };

    const repos: Repos[] = [
      {
        id: String(faker.random.number(10000)),
        html_url: faker.internet.url(),
        name: faker.internet.userName(),
      },
    ];

    axiosGetWithFunction((url: string) => {
      if (url.includes('details')) {
        return Promise.resolve({ data: user });
      } else return Promise.resolve({ data: repos });
    });

    await act(async () => {
      ReactDOM.render(
        withRouter(<Detail />, '/detail/:login', [`/detail/${user.login}`]),
        container
      );
    });

    expect(
      document.querySelector(
        'td:nth-child(1).MuiTableCell-root.MuiTableCell-body'
      )?.textContent
    ).toBe(String(repos[0].id));
    expect(
      document.querySelector(
        'td:nth-child(2).MuiTableCell-root.MuiTableCell-body'
      )?.textContent
    ).toBe(repos[0].name);
    expect(
      document.querySelector(
        'td:nth-child(3).MuiTableCell-root.MuiTableCell-body'
      )?.textContent
    ).toBe(repos[0].html_url);
  });
});
