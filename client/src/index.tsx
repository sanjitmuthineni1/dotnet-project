import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/layout/styles.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Route.tsx'
// import { StoreProvider } from './app/context/StoreContext.tsx';
import { Provider } from 'react-redux';
import {store} from "./app/store/configureStore.ts";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// store.dispatch(fetchProductsAsync());

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
