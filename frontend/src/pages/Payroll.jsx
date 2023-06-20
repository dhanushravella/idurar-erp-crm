import React from 'react';
import { Divider, Row, Tooltip, Button, Tag, Tour } from 'antd';

import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  PrinterOutlined,
  StockOutlined,
} from '@ant-design/icons';
import { DashboardLayout } from '@/layout';
import PayCard from '@/components/CarousalCard';
import PayData from '@/data/PayData.json';
import PayMonths from '@/data/PayMonths.json';
import { Carousel } from '@trendyol-js/react-carousel';
import { useRef, useState } from 'react';

const GroupPayData =
  PayData &&
  PayData.payData.reduce((group, payType) => {
    group[payType['prefix']] = group[payType['prefix']] ?? [];
    group[payType['prefix']].push(payType);
    return group;
  }, []);

const data = [
  {
    type: 'Mar 2023',
    value: 38,
  },
  {
    type: 'Apr 2023',
    value: 52,
  },
  {
    type: 'Feb 2023',
    value: 24,
  },
  {
    type: 'Jan 2023',
    value: 22,
  },
];

const chartConfig = {
  data,
  xField: 'type',
  yField: 'value',
  label: {
    position: 'middle',
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

function getChartData(data) {
  var chartData = [];
  data.forEach((element) => {
    chartData.push({
      type: element.type,
      value: element.value,
    });
  });

  return chartData;
}

export default function Payroll() {
  const chartData = getChartData(PayMonths);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const steps = [
    {
      title: 'Latest Payslip Records',
      description: 'This section has the latest payslip records.',
      target: () => ref1.current,
    },
    {
      title: 'Employee Details',
      description: 'This section shows employee details for the selected payslip.',
      target: () => ref2.current,
    },
    {
      title: 'Pay Details',
      description:
        'This section details all the pay components processed under the chosen payslip period.',
      target: () => ref3.current,
    },
    {
      title: 'Payslip Report',
      description:
        'To generate a payslip report, click on the print icon on the top right corner of the payslip.',
      target: () => ref4.current,
    },
  ];
  const [open, setOpen] = useState(false);

  return (
    <>
      <DashboardLayout>
        <Row gutter={[12, 12]} ref={ref1}>
          {/*<Carousel show={3} slide={1} swiping={true}>*/}
          {PayMonths.map((month) => (
            <PayCard
              title={month.title}
              chartType={'pie'}
              payData={month.payData}
              borderColor={month.active && '2px solid lightblue'}
              chartData={chartConfig}
            ></PayCard>
          ))}
          {/*</Carousel>*/}
        </Row>
        <Divider style={{ padding: 0, margin: 10 }}></Divider>
        <Row gutter={[24, 24]} ref={ref2}>
          <PayCard
            title={
              <div className="strong">
                Payslip for the period of <Tag color={'cyan'}>{PayData.Period}</Tag>{' '}
                <Tooltip title="Print Report">
                  <PrinterOutlined style={{ position: 'absolute', right: '50px' }} ref={ref4} />
                </Tooltip>
                <Tooltip title="Show Tour">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<StockOutlined />}
                    onClick={() => setOpen(true)}
                  />
                </Tooltip>
              </div>
            }
            titleAlign={'left'}
            info={PayData}
            colSize={24}
            midSize={24}
            chartData={chartConfig}
          ></PayCard>
        </Row>
        <Divider style={{ padding: 0, margin: 10 }}></Divider>
        <Row gutter={[8, 8]} ref={ref3}>
          {GroupPayData &&
            Object.keys(GroupPayData).map((payType) => {
              return (
                <PayCard
                  info=""
                  title={payType}
                  chartType={'bar'}
                  payData={GroupPayData[payType]}
                  chartData={chartConfig}
                ></PayCard>
              );
            })}
        </Row>
      </DashboardLayout>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
}
