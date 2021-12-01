import React, { useEffect } from 'react';
import { FlowBody, FlowWrapper } from '@/ui';
import styled from 'styled-components';
import { FormBuilder } from '@/form-builder';
import formData from '@/pages/form/data';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  display: flexbox;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export default function Form({ sectionData, title, totalSections }): JSX.Element {
  return (
    <FlowWrapper>
      <FlowBody>
        <FormBuilder sectionData={sectionData} title={title} totalSections={totalSections} />
      </FlowBody>
    </FlowWrapper>
  );
}

// This function gets called at build time
export async function getStaticPaths() {
  const paths = formData.sections.map((section) => ({
    params: { id: section.id.toString() },
  }));

  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  const { sections, title, totalSections } = formData;
  const sectionList = sections.filter((p) => p.id.toString() === params.id);
  return {
    props: {
      sectionData: sectionList[0],
      title,
      totalSections,
    },
  };
}
