import React from 'react';
import { Row, Col, Select, Divider, Tabs } from 'antd';
import { Column, Pie } from '@ant-design/plots';
import MUIDataTable from 'mui-datatables';
import { DashboardLayout } from '@/layout';
import { request } from '@/request';
import useFetch from '@/hooks/useFetch';
import { useState, useEffect } from 'react';

import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';

const sampleData = {
  success: true,
  result: [
    {
      PayCycle: '50',
      EmpCode: '1110007',
      PayheadName: 'BASIC',
      CTC: 0,
      LastPay: 13444,
      MinValue: 13444,
      AvgValue: 13444,
      MaxValue: 13444,
      IQRange: -20166,
      LowerBound: 33610,
      UpperBound: -20166,
      FirstQuartile: 13444,
      SecondQuartile: 13444,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '13444.00, 13444.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
    {
      PayCycle: '50',
      EmpCode: '1110007',
      PayheadName: 'ERN_SPLALL',
      CTC: 0,
      LastPay: 1325,
      MinValue: 1325,
      AvgValue: 1325,
      MaxValue: 1325,
      IQRange: -1987.5,
      LowerBound: 3312.5,
      UpperBound: -1987.5,
      FirstQuartile: 1325,
      SecondQuartile: 1325,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '1325.00, 1325.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
    {
      PayCycle: '50',
      EmpCode: '1110007',
      PayheadName: 'GPAY',
      CTC: 0,
      LastPay: 21691,
      MinValue: 21691,
      AvgValue: 21691,
      MaxValue: 21691,
      IQRange: -32536.5,
      LowerBound: 54227.5,
      UpperBound: -32536.5,
      FirstQuartile: 21691,
      SecondQuartile: 21691,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '21691.00, 21691.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
    {
      PayCycle: '50',
      EmpCode: '1110026',
      PayheadName: 'ERN_BASIC',
      CTC: 0,
      LastPay: 124111,
      MinValue: 124111,
      AvgValue: 126179.5,
      MaxValue: 128248,
      IQRange: -186166.5,
      LowerBound: 310277.5,
      UpperBound: -186166.5,
      FirstQuartile: 124111,
      SecondQuartile: 128248,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '128248.00, 124111.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
    {
      PayCycle: '50',
      EmpCode: '1110026',
      PayheadName: 'ERN_CTC_PF',
      CTC: 0,
      LastPay: 1742,
      MinValue: 1742,
      AvgValue: 1771,
      MaxValue: 1800,
      IQRange: -2613,
      LowerBound: 4355,
      UpperBound: -2613,
      FirstQuartile: 1742,
      SecondQuartile: 1800,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '1800.00, 1742.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
    {
      PayCycle: '50',
      EmpCode: 'SQ0001',
      PayheadName: 'YTD_TELRIM',
      CTC: 0,
      LastPay: -792,
      MinValue: -792,
      AvgValue: -378.5,
      MaxValue: 35,
      IQRange: 1188,
      LowerBound: -1980,
      UpperBound: 1188,
      FirstQuartile: -792,
      SecondQuartile: 35,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '35.00, -792.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
    {
      PayCycle: '50',
      EmpCode: 'SQ0001',
      PayheadName: 'YTD_TOTAL_TAX',
      CTC: 0,
      LastPay: 1361,
      MinValue: 1307,
      AvgValue: 1334,
      MaxValue: 1361,
      IQRange: -1960.5,
      LowerBound: 3267.5,
      UpperBound: -1960.5,
      FirstQuartile: 1307,
      SecondQuartile: 1361,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '1307.00, 1361.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
    {
      PayCycle: '50',
      EmpCode: 'SQ0001',
      PayheadName: 'YTD_VEHRIM',
      CTC: 0,
      LastPay: -152,
      MinValue: -152,
      AvgValue: -72.5,
      MaxValue: 7,
      IQRange: 228,
      LowerBound: -380,
      UpperBound: 228,
      FirstQuartile: -152,
      SecondQuartile: 7,
      ThirdQuartile: 0,
      FourthQuartile: 0,
      PayCount: 2,
      PayArray: '7.00, -152.00',
      CreatedBy: 'SMS1018',
      CreatedOn: '2023-06-18T09:29:15.613Z',
    },
  ],
};

const getMuiTheme = () =>
  createTheme({
    overrides: {
      MuiTableCell: {
        root: {
          '@media (max-width:959.95px)': {
            borderBottom: 'none',
            padding: '1px',
          },
        },
      },
      MUIDataTableBodyCell: {
        stackedCommon: {
          '@media (max-width:959.95px)': {
            whiteSpace: 'normal',
            height: '100%',
            paddingLeft: '5px',
            display: 'inherit',
          },
        },
        cellHide: {
          fontWeight: 'bold',
          paddingTop: '15px',
        },
      },
      MuiTableRow: {
        root: {
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
      },
    },
  });

const muiOptions = {
  search: true,
  download: true,
  print: true,
  viewColumns: true,
  filter: true,
  filterType: 'dropdown',
  responsive: 'vertical',
  setTableProps: () => ({ size: 'small' }),
};

const ChartData = ({ payItem, title, chartType }) => {
  console.log(title);
  const data =
    payItem &&
    payItem.result &&
    payItem.result.length > 0 &&
    payItem.result.map((item) => {
      return {
        type: item.EmpCode || item.Emp_Code,
        value: item.LastPay || item.Region_Name,
        payType: item.PayheadName || item.Designation_Name,
      };
    });

  const chartConfig = {
    data,
    isStack: true,
    //isGroup: true,
    xField: 'type',
    yField: 'value',
    seriesField: 'payType',
    groupField: 'payType',
    angleField: 'value',
    colorField: 'type',
    label: {
      position: 'middle',
      layout: [
        {
          type: 'interval-adjust-position',
        },
        {
          type: 'interval-hide-overlap',
        },
        {
          type: 'adjust-color',
        },
      ],
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return <div>{chartType === 'pie' ? <Pie {...chartConfig} /> : <Column {...chartConfig} />}</div>;
};

const RenderData = ({ data, cmbType, loading }) => {
  /* Object Structure
  AvgValue:13444
  CTC:0
  CreatedBy:"SMS1018"
  CreatedOn:"2023-06-18T09:29:15.613Z"
  EmpCode:"1110007"
  FirstQuartile: 13444
  FourthQuartile: 0
  IQRange: -20166
  LastPay: 13444
  LowerBound: 33610
  MaxValue: 13444
  MinValue: 13444
  PayArray: "13444.00, 13444.00"
  PayCount: 2
  PayCycle: "50"
  PayheadName: "BASIC"
  SecondQuartile: 13444
  ThirdQuartile: 0
  UpperBound: -20166
  */
  // Loop through the data and create two objects named columns and data for the MUIDataTable. columns is an array of strings and data is an array of arrays.
  // Columns are arrays of strings from the keys of the first object in the data array.
  // Data is an array of arrays from the values of the objects in the data array.

  var columns = [];
  var tableData = [];
  console.log('RENDERDATA', data);
  if (data && data.result && data.result.length > 0) {
    columns = Object.keys(data.result[0]);
    tableData = data.result.map((item) => Object.values(item));
  }
  return (
    <Row>
      <Col span={24}>
        <MuiThemeProvider theme={getMuiTheme()}>
          <MUIDataTable
            loading={loading}
            title={cmbType === 'payroll' ? 'Payroll Details' : 'Employee List'}
            data={tableData}
            columns={columns}
            options={muiOptions}
            responsive={'vertical'}
          />
        </MuiThemeProvider>
      </Col>
    </Row>
  );
};

const Turbo = () => {
  let entity = 'payrolls';
  let options = {
    PayHeadName: 'Basic',
  };
  const [tabData, setTabData] = useState([]);
  const [cmbData, setCmbData] = useState([]);
  const [cmbStore, setCmbStore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChange = (value) => {
    console.log(value);
    setCmbData(value);
    const asyncList = async () => {
      options = value.value === 'employee' ? (options = {}) : (options = { PayHeadName: 'Basic' });
      let queryData =
        value.value === 'employee'
          ? request.fetch({ entity, options })
          : request.list({ entity, options });
      return queryData;
    };
    asyncList().then((res) => {
      setTabData(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    // Combo Data
    const cmbList = async () => {
      options = {};
      let queryData = request.master({ entity, options });
      return queryData;
    };
    cmbList().then((res) => {
      setCmbStore(res);
    });

    // Table Data
    const asyncList = async () => {
      options = cmbData === 'employee' ? (options = {}) : (options = { PayHeadName: 'Basic' });
      let queryData = request.fetch({ entity, options });
      return queryData;
    };
    asyncList().then((res) => {
      setTabData(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <DashboardLayout>
        <Row>
          <Select
            labelInValue
            defaultValue={{
              value: 'employee',
              label: 'Employee Details',
            }}
            style={{
              width: 250,
            }}
            onChange={handleChange}
            options={cmbStore.result}
          />
        </Row>
        <Row>
          <Col span={24}>
            <Divider style={{ padding: 0, margin: 5 }}></Divider>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  label: 'Table Data',
                  key: '1',
                  children: (
                    <RenderData
                      loading={isLoading}
                      data={tabData}
                      cmbType={cmbData.value}
                    ></RenderData>
                  ),
                },
                {
                  label: 'Graph / Chart',
                  key: '2',
                  children: (
                    <ChartData payItem={tabData} title="Employee Table" chartType="bar"></ChartData>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </DashboardLayout>
    </>
  );
};
export default Turbo;
