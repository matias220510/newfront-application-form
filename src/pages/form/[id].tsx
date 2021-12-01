import React from 'react';
import { FlowBody, FlowWrapper } from '@/ui';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FormBuilder } from '@/form-builder';
import formData from '@/data/data';

export default function Form({ sectionData, totalSections }): JSX.Element {
  return (
    <FlowWrapper>
      <FlowBody>
        <FormBuilder sectionData={sectionData} totalSections={totalSections} />
      </FlowBody>
    </FlowWrapper>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = formData.sections.map((section) => ({
    params: { id: section.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { sections, totalSections } = formData;
  const sectionList = sections.filter((p) => p.id.toString() === params.id);
  return {
    props: {
      sectionData: sectionList[0],
      totalSections,
    },
  };
};
