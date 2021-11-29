import React from 'react';
import { createContext, useState } from 'react';

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});

  const addFormData = (values) => setFormData({ ...formData, ...values });

  return <FormContext.Provider value={[formData, addFormData]}>{children}</FormContext.Provider>;
};

export default FormContext;
