import React from 'react';
import { useFormik } from 'formik';
import { Box, Button, Divider, Flexbox, FlexCell, Input, Padding, Text } from '@/ui';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sectionData: any;
}

const handleSubmitForm = () => {
  console.log('Submit!');
};

export function FormBuilder({ sectionData }: Props): JSX.Element {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      role: '',
      phoneNumber: '',
    },
    onSubmit: (values) => {
      console.log('hellooo', values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      Sections: {sectionData.id}
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
              <Button size="primary" type="submit">
                Submit
              </Button>
            </FlexCell>
          </Flexbox>
        </Padding>
      </Box>
    </form>
  );
}
