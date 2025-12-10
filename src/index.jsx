import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR,
  APP_READY,
  initialize,
  mergeConfig,
  subscribe,
} from '@edx/frontend-platform';
import {
  AppProvider,
  ErrorPage,
} from '@edx/frontend-platform/react';

import React, { StrictMode } from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from 'react-dom/client';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '@edx/frontend-component-header';
import { SmartFooterSlot } from '@edx/frontend-component-footer';

import messages from './i18n';
import configureStore from './data/configureStore';

import './index.scss';
import Head from './head/Head';

import AppRoutes from './routes/AppRoutes';

// Create AppLayout to access Redux state
const AppLayout = () => {
  const isLoadingProfile = useSelector(state => state.profilePage.isLoadingProfile);
  
  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      <Header />
      <main className="flex-grow-1" id="main">
        <AppRoutes />
      </main>
      <SmartFooterSlot loading={isLoadingProfile} />
    </div>
  );
};

const rootNode = createRoot(document.getElementById('root'));
subscribe(APP_READY, () => {
  rootNode.render(
    <StrictMode>
      <AppProvider store={configureStore()}>
        <Head />
        <AppLayout />
      </AppProvider>
    </StrictMode>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  rootNode.render(<ErrorPage message={error.message} />);
});

initialize({
  messages,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        COLLECT_YEAR_OF_BIRTH: process.env.COLLECT_YEAR_OF_BIRTH,
        ENABLE_SKILLS_BUILDER_PROFILE: process.env.ENABLE_SKILLS_BUILDER_PROFILE,
      }, 'App loadConfig override handler');
    },
  },
});