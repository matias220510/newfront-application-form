import React from 'react';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FlowBody, FlowWrapper } from '@/ui';
import { FormBuilder } from '@/form-builder';
import formData from '@/data/data';

export default function Form({ sectionData, totalSections }): JSX.Element {
  return (
    <div>
      <Head>
        <html lang="en" />
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <FlowWrapper>
        <FlowBody>
          <FormBuilder sectionData={sectionData} totalSections={totalSections} />
        </FlowBody>
      </FlowWrapper>
    </div>
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
