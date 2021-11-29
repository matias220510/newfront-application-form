import React from 'react';
import { createContext, useState } from 'react';

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({ info: 'this is info' });
  const addFormData = (values) => {
    return setFormData((data) => {
      return {
        ...data,
        ...values,
      };
    });
  };

  return <FormContext.Provider value={[formData, addFormData]}>{children}</FormContext.Provider>;
};

export default FormContext;
