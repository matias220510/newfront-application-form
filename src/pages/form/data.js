const formData = {
  title: 'Worker’s compensation application',
  totalSections: 2,
  sections: [
    {
      id: 1,
      sectionName: 'PrimaryContact',
      label: 'Who is the primary contact for this policy?',
      currentSection: 1,
      description:
        'This person will receive all communications from Newfront about this policy. You can change this contact information later. If you’re not sure, just add your contact information.',
      questions: [
        {
          id: 40580,
          apiName: 'fullName',
          label: 'Full Name',
          ordering: '0117800000',
          placeholder: '',
          isRequired: true,
          type: 'text',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: null,
          show: true,
        },
        {
          id: 40581,
          apiName: 'role',
          label: 'Role',
          ordering: '0117800001',
          placeholder: '',
          isRequired: false,
          type: 'text',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: null,
          show: true,
        },
        {
          id: 40582,
          apiName: 'phoneNumber',
          label: 'Phone Number',
          ordering: '0117800002',
          placeholder: '',
          isRequired: false,
          type: 'phoneNumber',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: 40581,
          show: false,
        },
      ],
    },
    {
      id: 2,
      sectionName: 'Company',
      label: 'Tell us about your company',
      currentSection: 2,
      description: '',
      questions: [
        {
          id: 40583,
          apiName: 'CompanyName',
          label: 'Company Name',
          ordering: '0117800000',
          placeholder: '',
          isRequired: true,
          type: 'text',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: null,
          show: true,
        },
        {
          id: 40584,
          apiName: 'FEIN',
          label: 'Role',
          ordering: '0117800001',
          placeholder: '',
          isRequired: false,
          type: 'number',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: 40580,
          show: true,
        },
        {
          id: 40585,
          apiName: 'YearsInBusiness',
          label: 'Years in business',
          ordering: '0117800003',
          placeholder: '',
          isRequired: false,
          type: 'number',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: null,
          show: true,
        },
        {
          id: 40586,
          apiName: 'NumberLocations',
          label: 'Numbers of locations',
          ordering: '0117800004',
          placeholder: '',
          isRequired: false,
          type: 'number',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: 123123,
          show: true,
        },
        {
          id: 40587,
          apiName: 'StateOperate',
          label: 'In which states do you operate?',
          ordering: '0117800005',
          placeholder: '',
          isRequired: true,
          type: 'text',
          createdAt: '2019-06-12T18:48:58.011Z',
          updatedAt: '2019-06-12T18:48:58.011Z',
          dependsOnIdQuestion: 123123,
          show: true,
        },
      ],
    },
  ],
};

export default formData;
