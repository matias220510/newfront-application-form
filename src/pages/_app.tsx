import React from 'react';
import { FormProvider } from '@/contexts/form';

const CustomApp = ({ Component, pageProps }): JSX.Element => (
  <FormProvider>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </FormProvider>
);

export default CustomApp;
