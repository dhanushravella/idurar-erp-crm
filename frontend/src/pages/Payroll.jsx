import React from 'react';
import { Divider, Collapse, Row, Col, Tooltip, Button, Tag, Tour } from 'antd';

import { PrinterOutlined, StockOutlined } from '@ant-design/icons';
import { DashboardLayout } from '@/layout';
import PayCard from '@/components/CarousalCard';
import PayData from '@/data/PayData.json';
import PayMonths from '@/data/PayMonths.json';
import { useRef, useState } from 'react';

const GroupPayData =
  PayData &&
  PayData.payData.reduce((group, payType) => {
    group[payType['prefix']] = group[payType['prefix']] ?? [];
    group[payType['prefix']].push(payType);
    return group;
  }, []);

const Payroll = () => {
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
          {PayMonths.map((month) => (
            <PayCard
              title={month.title}
              chartType={'pie'}
              payData={month.payData}
              colSize={6}
              borderColor={month.active && '2px solid lightblue'}
            ></PayCard>
          ))}
        </Row>
        <Divider style={{ padding: 0, margin: 10 }}></Divider>
        <Row gutter={[24, 24]}>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 24 }}
            xl={{ span: 24 }}
            xxl={{ span: 24 }}
          >
            <Collapse
              size="small"
              items={[
                {
                  key: '1',
                  label: (
                    <div className="strong">
                      Payslip for the period of <Tag color={'cyan'}>{PayData.period}</Tag>{' '}
                      <Tooltip title="Print Report">
                        <PrinterOutlined
                          style={{ fontSize: '16px', position: 'absolute', right: '50px' }}
                          ref={ref4}
                          onClick={(event) => {
                            event.stopPropagation();
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Show Tour">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<StockOutlined />}
                          onClick={(event) => {
                            setOpen(true);
                            event.stopPropagation();
                          }}
                          style={{ position: 'absolute', right: '100px' }}
                        />
                      </Tooltip>
                    </div>
                  ),
                  children: (
                    <PayCard
                      title=""
                      titleAlign={'left'}
                      info={PayData.info}
                      colSize={24}
                      midSize={24}
                    ></PayCard>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
        <Divider style={{ padding: 0, margin: 10 }}></Divider>
        <Row gutter={[24, 24]} ref={ref2}>
          <PayCard
            titleAlign={'left'}
            consolidated={PayData.consolidatedData}
            colSize={24}
            midSize={24}
          ></PayCard>
        </Row>
        <Divider style={{ padding: 0, margin: 10 }}></Divider>
        <Row>
          <Col
            className="gutter-row"
            xs={{ span: 24 }}
            sm={{ span: 24 }}
            md={{ span: 24 }}
            lg={{ span: 16 }}
            xl={{ span: 16 }}
            xxl={{ span: 16 }}
          >
            <Row gutter={[8, 8]} ref={ref3}>
              {GroupPayData &&
                Object.keys(GroupPayData).map((payType) => {
                  return (
                    <PayCard
                      info=""
                      title={payType}
                      chartType={'bar'}
                      payData={GroupPayData[payType]}
                    ></PayCard>
                  );
                })}
            </Row>
          </Col>
          <PayCard
            title={PayMonths[0].title}
            chartType={'onlychart'}
            payData={PayMonths[0]}
            colSize={6}
            borderColor={PayMonths[0].active && '2px solid lightblue'}
          ></PayCard>
        </Row>
      </DashboardLayout>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </>
  );
};

export default Payroll;
