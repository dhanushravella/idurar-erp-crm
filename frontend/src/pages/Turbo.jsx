import React from 'react';
import { Row, Col } from 'antd';
import { DashboardLayout } from '@/layout';

const Turbo = () => {
  return (
    <>
      <DashboardLayout>
        <Row gutter={[12, 12]}>
          <Col span={12}>123</Col>
          <Col span={12}>ABC Turbo Troubleshooter</Col>
        </Row>
        <Row gutter={[12, 12]}>
          <Col span={12}>ABC</Col>
          <Col span={12}>This Page Will Become A Screen For Turbo Troubleshooting</Col>
        </Row>
      </DashboardLayout>
    </>
  );
};
export default Turbo;
