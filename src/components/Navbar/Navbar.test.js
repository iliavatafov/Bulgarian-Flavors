import React from 'react';
import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

import {Navbar} from './Navbar';
import {MyLinks, MyLinksAdmin, MyLinksLoggedIn} from './MyLinks';

const mockReducer = (state = {}, action) => state;

const store = configureStore({
  reducer: mockReducer,
  preloadedState: {
    auth: {
      currentUser: null,
    },
  },
});

describe('Navbar - MyLinks (Guest User)', () => {
  beforeEach(() => {
    render(
        <Provider store={store}>
          <Router>
            <Navbar links={MyLinks} />
          </Router>
        </Provider>,
    );
  });

  test('renders the logo link', () => {
    setTimeout(() => {
      const logoLink = screen.getByText('Bulgarian Flavors');
      expect(logoLink).toBeInTheDocument();
      expect(logoLink.getAttribute('href')).toBe('/');
    }, 1500);
  });

  test('renders all the links for guest user', () => {
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(MyLinks.length + 1);
  });

  test('renders the correct link titles and URLs for guest user', () => {
    MyLinks.forEach((link) => {
      const renderedLink = screen.getByText(link.title);
      expect(renderedLink).toBeInTheDocument();
      expect(renderedLink.getAttribute('href')).toBe(
        link.url === '#' ? '/' : link.url,
      );
    });
  });
});

describe('Navbar - MyLinks (Logged-in User)', () => {
  beforeEach(() => {
    store.getState().auth.currentUser = {currentUser: 'test@example.com'};
    render(
        <Provider store={store}>
          <Router>
            <Navbar links={MyLinksLoggedIn} />
          </Router>
        </Provider>,
    );
  });

  test('renders all the links for logged-in user', () => {
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(MyLinksLoggedIn.length + 1);
  });

  test('renders the correct link titles and URLs for logged-in user', () => {
    MyLinksLoggedIn.forEach((link) => {
      const renderedLink = screen.getByText(link.title);
      expect(renderedLink).toBeInTheDocument();
      expect(renderedLink.getAttribute('href')).toBe(
        link.url === '#' ? '/' : link.url,
      );
    });
  });
});

describe('Navbar - MyLinks (Admin User)', () => {
  test('renders all the links for admin user', () => {
    store.getState().auth.currentUser = {
      currentUser: 'iliyavatafov@gmail.com',
    };
    render(
        <Provider store={store}>
          <Router>
            <Navbar links={MyLinksAdmin} />
          </Router>
        </Provider>,
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(MyLinksAdmin.length + 1);
  });

  test('renders the correct link titles and URLs for admin user', () => {
    store.getState().auth.currentUser = {
      currentUser: 'iliyavatafov@gmail.com',
    };
    render(
        <Provider store={store}>
          <Router>
            <Navbar links={MyLinksAdmin} />
          </Router>
        </Provider>,
    );

    MyLinksAdmin.forEach((link) => {
      const renderedLink = screen.getByText(link.title);
      expect(renderedLink).toBeInTheDocument();
      expect(renderedLink.getAttribute('href')).toBe(
        link.url === '#' ? '/' : link.url,
      );
    });
  });
});
