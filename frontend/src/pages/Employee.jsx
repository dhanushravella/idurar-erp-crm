import React from 'react';

import CrudModule from '@/modules/CrudModule';
import EmployeeForm from '@/forms/EmployeeForm';
import dayjs from 'dayjs';
export default function Employee() {
  const entity = 'employee';
  const searchConfig = {
    displayLabels: ['name', 'surname'],
    searchFields: 'name,surname,birthday',
    outputValue: '_id',
  };
  const dataTableTitle = 'Employee Lists';
  const entityDisplayLabels = ['name', 'surname'];

  const dataTableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      render: (date) => {
        return dayjs(date).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const readColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Surname',
      dataIndex: 'surname',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      isDate: true,
    },
    {
      title: 'Birth Place',
      dataIndex: 'birthplace',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Department',
      dataIndex: 'department',
    },
    {
      title: 'Position',
      dataIndex: 'position',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
  ];

  const ADD_NEW_ENTITY = 'Add new employee';
  const DATATABLE_TITLE = 'Employees List';
  const ENTITY_NAME = 'employee';
  const CREATE_ENTITY = 'Create employee';
  const UPDATE_ENTITY = 'Update employee';
  const PANEL_TITLE = 'Employee Panel';

  const config = {
    entity,
    PANEL_TITLE,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    dataTableTitle,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<EmployeeForm />}
      updateForm={<EmployeeForm isUpdateForm={true} />}
      config={config}
    />
  );
}
