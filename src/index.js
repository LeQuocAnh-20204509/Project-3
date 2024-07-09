import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LogInPage from './pages/log-in-page';
import { Provider } from "react-redux";
import store from "./react-redux/redux-store";
import UserProfilePage from './pages/user-profile-page';
import SharePage from './pages/share-page';
import SignUpPage from './pages/sign-up-page';
import GeneratedQuestionPage from './pages/generated-question-page';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App
  },
  {
    path: "/login",
    Component: LogInPage
  },
  {
    path: "/signup",
    Component: SignUpPage
  },
  {
    path: "/user-profile",
    Component: UserProfilePage,
  },
  {
    path: "/user-profile/generated-question/:id",
    Component: GeneratedQuestionPage
  },
  {
    path: "/share",
    Component: SharePage
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
