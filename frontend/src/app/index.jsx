import React from 'react';

import Router from '@/router';

import { Layout } from 'antd';

import Navigation from '@/app/Navigation';

import { useSelector } from 'react-redux';
import { selectAuth } from '@/redux/auth/selectors';
import HeaderContent from '@/app/HeaderContent';
// import { useNetworkState } from "react-use";

function App() {
  // const [isOnline] = useNetwork();
  // // const networkState = useNetworkState();

  // if (!isOnline) {
  //   notification.config({
  //     duration: 0,
  //   });
  //   notification.error({
  //     message: "No internet connection",
  //     description: "Cannot connect to the server, Check your internet network",
  //   });
  // }

  const { isLoggedIn } = useSelector(selectAuth);

  if (!isLoggedIn) return <Router />;
  else {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Navigation />
        <Layout style={{ minHeight: '100vh', position: 'relative' }}>
          <HeaderContent activity={''} />
          <Router isLoggedIn={true} />
        </Layout>
      </Layout>
    );
  }
}

export default App;
