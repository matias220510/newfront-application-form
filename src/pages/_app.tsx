import React from 'react';
import { FormProvider } from '@/contexts/form';

const CustomApp = ({ Component, pageProps }): JSX.Element => (
  <FormProvider>
    <Component {...pageProps} />
  </FormProvider>
);

export default CustomApp;
