import React from 'react';
import { Space, Divider, Row, Col, Popover } from 'antd';

import { Layout, Breadcrumb, Statistic, Progress, Tag } from 'antd';

import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { DashboardLayout } from '@/layout';
import PayCard from '@/components/CarousalCard';
import PayData from '@/data/PayData.json';
import PayMonths from '@/data/PayMonths.json';
import { Carousel } from '@trendyol-js/react-carousel';

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
  console.log(chartData);
  return (
    <>
      <DashboardLayout>
        <Row gutter={[12, 12]}>
          <Carousel show={3} slide={1} swiping={true}>
            {PayMonths.map((month) => (
              <PayCard
                title={month.title}
                chartType={'pie'}
                colSize={24}
                payData={month.payData}
                borderColor={month.active && '2px solid lightblue'}
                chartData={chartConfig}
              ></PayCard>
            ))}
          </Carousel>
        </Row>
        <Divider style={{ padding: 0, margin: 10 }}></Divider>
        <Row gutter={[24, 24]}>
          <PayCard
            title={
              <div className="strong">
                Payslip for the period of <Tag color={'cyan'}>{PayData.Period}</Tag>{' '}
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
        <Row gutter={[8, 8]}>
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
    </>
  );
}
