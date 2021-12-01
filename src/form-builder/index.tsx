import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import styled from 'styled-components';
import { Box, Button, Divider, Flexbox, FlexCell, Padding, Text } from '@/ui';
import { useContext } from 'react';
import FormContext from '@/contexts/form';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionData: any;
  title: string;
  totalSections: number;
}

const Input = styled.input`
  border: 1px solid #dbdbdb;
  box-sizing: border-box;
  border-radius: 3px;
  height: 40px;
  width: 542px;
  border-radius: 3px;
`;

const BackButton = styled.a`
  background: #ffffff;
  display: inline-block;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  height: 32px;
  width: 91px;
  border-radius: 3px;
  color: #000000;
  cursor: pointer;
  padding-top: 8px;
`;

const NextButton = styled.a`
  background: #0957c3;
  display: inline-block;
  border-radius: 3px;
  height: 32px;
  width: 91px;
  border-radius: 3px;
  color: #ffffff;
  cursor: pointer;
  padding-top: 8px;
  pointer-events: ${(props) => (props.isFormValid ? '' : 'none')};
`;

export function FormBuilder({ sectionData, title, totalSections }: Props): JSX.Element {
  const [formData, addFormData] = useContext(FormContext);
  const [shouldSubmitForm, setShouldSubmitForm] = useState(false);
  const [showBackButton, setShowBackButton] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setShouldSubmitForm(sectionData.currentSection === totalSections);
    setShowBackButton(sectionData.currentSection <= totalSections && sectionData.currentSection > 1);
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

      setIsFormValid(!Object.keys(errors).length);
      return errors;
    },
    onSubmit: (values) => {
      addFormData(values);
      if (shouldSubmitForm) {
        // eslint-disable-next-line no-console
        console.log('FORM VALUES:', values);
        return;
      }

      router.push(`/form/${sectionData.currentSection + 1}`);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box width={640} border={1} borderRadius={10}>
        <Padding size={24}>
          <Text specificSize={20} weight={400} color="#000000" marginBottom={8}>
            {sectionData.label}
          </Text>
          <Text specificSize={14} color="#546A83">
            {sectionData.description}
          </Text>
          {sectionData.questions.map((question) => {
            switch (question.type) {
              case 'text':
                return (
                  <Padding key={question.id} size={0} top={20} left={0}>
                    <Text size="regular" color="#000000" marginBottom={12}>
                      <strong>{question.label}</strong>
                    </Text>
                    <Input
                      id={question.id}
                      name={question.apiName}
                      width="542px"
                      placeholder={question.placeholder}
                      type="text"
                      value={formik.values[question.id]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {(formik.errors[question.apiName] && formik.touched[question.apiName]) ||
                    (!formik.isValid && formik.errors[question.apiName]) ? (
                      <div className="error">{formik.errors[question.apiName]}</div>
                    ) : null}
                  </Padding>
                );
              case 'phoneNumber':
              case 'number':
                return (
                  <Padding key={question.id} size={0} top={20} left={0}>
                    <Text size="regular" color="#000000" marginBottom={12}>
                      <strong>{question.label}</strong>
                    </Text>
                    <Input
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
                    {(formik.errors[question.apiName] && formik.touched[question.apiName]) ||
                    (!formik.isValid && formik.errors[question.apiName]) ? (
                      <div className="error">{formik.errors[question.apiName]}</div>
                    ) : null}
                  </Padding>
                );
              default:
                return 'NO FIELD DETECTED';
            }
          })}
        </Padding>
        <Padding y={5}>
          <Divider />
          <Flexbox alignItems="center" justifyContent="space-between" padding={24}>
            <FlexCell>
              {showBackButton && (
                <Link href={`/form/${sectionData.currentSection - 1}`}>
                  <BackButton>
                    <Text size="regular" color="#000000" textAlign="center" weight={600}>
                      Back
                    </Text>
                  </BackButton>
                </Link>
              )}
            </FlexCell>
            <FlexCell>
              <Button size="primary" type="submit">
                {shouldSubmitForm ? 'Submit' : 'Next'}
              </Button>
            </FlexCell>
          </Flexbox>
        </Padding>
      </Box>
    </form>
  );
}
