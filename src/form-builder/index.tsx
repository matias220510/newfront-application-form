import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Box, Button, Divider, Flexbox, FlexCell, Input, Padding, Text } from '@/ui';
import { useContext } from 'react';
import FormContext from '@/contexts/form';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    console.log('FORMDATA', formData, totalSections);
  }, []);

  const formik = useFormik({
    initialValues: {
      fullName: '',
      role: '',
      phoneNumber: '',
    },
    onSubmit: (values) => {
      addFormData(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      Sections: {sectionData.id}
      Total: {totalSections}
      title: {title}
      CONTEXT: {formData.info}
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
                      onChange={formik.handleChange}
                      value={formik.values[question.id]}
                      key={question.id}
                    />
                  </Padding>
                );
              case 'phoneNumber':
                return (
                  <Padding size={0} top={20} left={0}>
                    <Text size="large">{question.label}</Text>
                    <input
                      id={question.id}
                      name={question.apiName}
                      width="542px"
                      placeholder={question.placeholder}
                      type="number"
                      onChange={formik.handleChange}
                      value={formik.values[question.id]}
                      key={question.id}
                    />
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
              {sectionData.currentSection === totalSections && (
                <Button size="primary" type="submit">
                  Submit
                </Button>
              )}

              {sectionData.currentSection < totalSections && (
                <Button size="primary" type="submit">
                  Next
                </Button>
              )}
            </FlexCell>
          </Flexbox>
        </Padding>
      </Box>
    </form>
  );
}
