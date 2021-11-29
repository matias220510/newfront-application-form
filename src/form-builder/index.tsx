import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFormik } from 'formik';
import { Box, Button, Divider, Flexbox, FlexCell, Padding, Text } from '@/ui';
import { useContext } from 'react';
import FormContext from '@/contexts/form';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionData: any;
  title: string;
  totalSections: number;
}

const handleSubmitForm = () => {
  console.log('Submit!');
};

export function FormBuilder({ sectionData, title, totalSections }: Props): JSX.Element {
  const [formData, addFormData] = useContext(FormContext);
  const [shouldSubmitForm, setShouldSubmitForm] = useState(false);

  useEffect(() => {
    setShouldSubmitForm(sectionData.currentSection === totalSections);
    console.log('FORMDATA', formData, totalSections);
  }, [sectionData.currentSection]);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      role: '',
      phoneNumber: '',
    },
    validate: (values) => {
      const errors = {};
      sectionData.questions.forEach((question) => {
        if (question.isRequired && !values[question.apiName]) {
          errors[question.apiName] = 'Required field';
        }
      });

      return errors;
    },
    onSubmit: (values) => {
      addFormData(values);
      console.log('FORM VALUES:', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box width={640} border={1} borderRadius={10}>
        <Padding size={24}>
          <Text size="large">{sectionData.label}</Text>
          <Text size="regular">{sectionData.description}</Text>

          {sectionData.questions.map((question) => {
            switch (question.type) {
              case 'text':
                return (
                  <Padding size={0} top={20} left={0}>
                    <Text size="large">{question.label}</Text>
                    <input
                      id={question.id}
                      name={question.apiName}
                      width="542px"
                      placeholder={question.placeholder}
                      type="text"
                      value={formik.values[question.id]}
                      key={question.id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors[question.apiName] && formik.touched[question.apiName] && (
                      <div className="error">{formik.errors[question.apiName]}</div>
                    )}
                  </Padding>
                );
              case 'phoneNumber':
              case 'number':
                return (
                  <Padding size={0} top={20} left={0}>
                    <Text size="large">{question.label}</Text>
                    <input
                      id={question.id}
                      name={question.apiName}
                      width="542px"
                      placeholder={question.placeholder}
                      type="number"
                      key={question.id}
                      value={formik.values[question.id]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors[question.apiName] && formik.touched[question.apiName] && (
                      <div className="error">{formik.errors[question.apiName]}</div>
                    )}
                  </Padding>
                );
              default:
                return 'IS ANOTHER ONE!';
            }
          })}
        </Padding>
        <Padding y={24}>
          <Divider />
          <Flexbox alignItems="center" justifyContent="flex-end" padding={24}>
            <FlexCell>
              {shouldSubmitForm ? (
                <Button size="primary" type="submit">
                  Submit
                </Button>
              ) : (
                <Link href={`/form/${sectionData.currentSection + 1}`}>
                  <a className={`${!formik.isValid ? 'disabled' : ''}`}>Next</a>
                </Link>
              )}
            </FlexCell>
          </Flexbox>
        </Padding>
        <Padding y={24}>
          <Divider />
          <Flexbox alignItems="center" justifyContent="center" padding={24}>
            <FlexCell>{sectionData.currentSection === totalSections && <div>INFO:</div>}</FlexCell>
          </Flexbox>
        </Padding>
      </Box>
    </form>
  );
}
