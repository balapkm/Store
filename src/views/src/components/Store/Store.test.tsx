import { render, cleanup, act } from '@testing-library/react';

import { Provider } from 'react-redux';
import React from 'react'
import Store  from './Store';
import { createStore } from 'redux';
import 'mutationobserver-shim';
import storeReducer from '../../reducers/store';

global.MutationObserver = window.MutationObserver;

function renderWithProviders(ui: any, reduxState: any) {
  const store = createStore(storeReducer, reduxState);
  return render(<Provider store={store}>{ui}</Provider>);
}

afterEach(cleanup);

test('Check init data', async () => {
  const { getByText, getAllByTestId } = renderWithProviders(<Store />, {
    storeReducer: {
      loading: false,
      store: [
        {
          'id': 1,
          'name': 'Jaya store',
          'phone': '123-123-1234',
          'domain': 'http://domain.com',
          'street': 'street',
          'state': 'state',
          'updatedAt': '2020-10-13T10:08:08.000Z',
          'status': 'N'
        },
        {
          'id': 17,
          'name': 'Cracker',
          'phone': '123-123-1234',
          'domain': 'http://tamil.com',
          'street': 'bazeer',
          'state': 'Delhi',
          'updatedAt': '2020-10-12T17:38:01.000Z',
          'status': 'Y'
        }
      ],
      singleStore: []
    }
  });

  expect(getByText('List of store')).toBeInTheDocument();
  expect(getAllByTestId('store')).toHaveLength(2);
  expect(getByText('Jaya store')).toBeInTheDocument();
  expect(getByText('Cracker')).toBeInTheDocument();
});

test('Check with empty data', async () => {
  const { getByText } = renderWithProviders(<Store />, {
    storeReducer: {
      loading: false,
      store: [],
      singleStore: []
    }
  });

  expect(getByText('List of store')).toBeInTheDocument();
  expect(getByText('Store data is empty')).toBeInTheDocument();
});