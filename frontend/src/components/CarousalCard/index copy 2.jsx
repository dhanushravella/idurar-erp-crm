import React, { useState, useEffect, useRef } from 'react';
import { Space, Divider, Row, Col, Popover, Tag, Empty } from 'antd';
import { DashboardLayout } from '@/layout';
import { Column, Pie } from '@ant-design/plots';

const PopOverData = ({
  item,
  borderColor,
  payData,
  info,
  colSize,
  midSize,
  chartData,
  chartType,
}) => {
  return (
    item &&
    item.breakDown &&
    item.breakDown.length > 0 &&
    item.breakDown.map((item) => (
      <div className="pad5">
        <Row gutter={[0, 0]}>
          <Col span={14}>{item.title}</Col>
          <Col span={2}>-</Col>
          <Col span={8}>
            <Tag
              color={item.tagColor}
              style={{
                margin: '0 auto',
                justifyContent: 'center',
              }}
            >
              {item.value}
            </Tag>
          </Col>
        </Row>
      </div>
    ))
  );
};

const ChartData = ({ payItem, title, chartType }) => {
  console.log(payItem);
  const data = payItem.breakDown.map((item) => {
    return {
      type: item.title,
      value: parseFloat(item.value === 'YES' ? 1 : item.value.replace(/,/g, '')) || 0,
    };
  });

  const chartConfig = {
    data,
    xField: 'type',
    yField: 'value',
    angleField: 'value',
    colorField: 'type',
    label: {
      type: 'inner',
      offset: '-30%',
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
      {
        type: 'element-selected',
      },
    ],
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };

  return <div>{chartType === 'pie' ? <Pie {...chartConfig} /> : <Column {...chartConfig} />}</div>;
};

const DrillChartData = ({ payItem, title, chartType }) => {
  console.log(payItem);
  const data = payItem.map((item) => {
    return {
      type: item.title,
      value: parseFloat(item.value === 'YES' ? 1 : item.value.replace(/,/g, '')) || 0,
      children: item.breakDown.map((item) => {
        return {
          type: item.title,
          value: parseFloat(item.value === 'YES' ? 1 : item.value.replace(/,/g, '')) || 0,
        };
      }),
    };
  });

  const chartConfig = {
    data,
    xField: 'type',
    yField: 'value',
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      position: 'middle',
      type: 'inner',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
        fontSize: 14,
        textAlign: 'center',
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

export default function PayCard({
  title,
  borderColor,
  payData,
  info,
  colSize,
  midSize,
  chartType,
  titleAlign,
  consolidated,
}) {
  return chartType !== 'onlychart' ? (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: midSize || 12 }}
      lg={{ span: colSize || 8 }}
      xl={{ span: colSize || 8 }}
      xxl={{ span: colSize || 8 }}
    >
      <div
        className="whiteBox shadow"
        style={{ color: '#595959', fontSize: 13, height: 'auto', border: borderColor }}
      >
        {title && (
          <div
            className="strong"
            style={{ textAlign: titleAlign || 'center', justifyContent: 'center' }}
          >
            <h3 className="mrg10" style={{ color: '#22075e', marginBottom: 0 }}>
              {title}
            </h3>
          </div>
        )}
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        {payData &&
          payData.length > 0 &&
          payData.map((item) =>
            item.title === '' ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <>
                <div className="pad5">
                  <Row gutter={[0, 0]}>
                    <Col className="gutter-row" span={11} style={{ textAlign: 'left' }}>
                      <div className="left">{item.title}</div>
                    </Col>
                    <Col className="gutter-row" span={2}>
                      <Divider
                        style={{
                          padding: '10px 0',
                          justifyContent: 'center',
                        }}
                        type="vertical"
                      ></Divider>
                    </Col>
                    <Col
                      className="gutter-row"
                      span={11}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Popover
                        /*color={item.tagColor}*/
                        overlayStyle={{
                          width: '40vw',
                        }}
                        content={
                          item && item.breakDown && item.breakDown.length > 0 ? (
                            <Row gutter={[0, 0]}>
                              <Col
                                xs={{ span: 24 }}
                                sm={{ span: 24 }}
                                md={{ span: 24 }}
                                lg={{ span: 12 }}
                              >
                                <PopOverData item={item}></PopOverData>
                              </Col>
                              <Col md={{ span: 24 }} lg={{ span: 12 }}>
                                {/*<Column {...chartData} />*/}
                                {/*<ChartData
                                  payItem={item}
                                  title={item.title}
                                  chartType={chartType}
                          ></ChartData>*/}
                              </Col>
                            </Row>
                          ) : (
                            <>
                              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            </>
                          )
                        }
                        title={<h3 className="mrg10">{item.title}</h3>}
                      >
                        <Tag
                          color={item.tagColor}
                          style={{
                            margin: '0 auto',
                            justifyContent: 'center',
                          }}
                        >
                          {item.value}
                        </Tag>
                      </Popover>
                    </Col>
                  </Row>
                </div>
              </>
            )
          )}
        {consolidated && consolidated.length > 0 && (
          <div className="pad5">
            <Row gutter={[24, 4]}>
              {consolidated &&
                consolidated.length > 0 &&
                consolidated.map((item) =>
                  item.title === '' ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  ) : (
                    <>
                      <Col
                        className="gutter-row"
                        xs={{ span: 24 }}
                        sm={{ span: 12 }}
                        md={{ span: 6 }}
                        lg={{ span: 6 }}
                        xl={{ span: 4 }}
                        style={{ textAlign: 'center' }}
                      >
                        <Popover
                          /*color={item.tagColor}*/
                          overlayStyle={{
                            width: '40vw',
                          }}
                          content={
                            item && item.breakDown && item.breakDown.length > 0 ? (
                              <Row gutter={[0, 0]}>
                                <Col
                                  xs={{ span: 24 }}
                                  sm={{ span: 24 }}
                                  md={{ span: 24 }}
                                  lg={{ span: 12 }}
                                >
                                  <PopOverData item={item}></PopOverData>
                                </Col>
                                <Col md={{ span: 24 }} lg={{ span: 12 }}>
                                  {/*<Column {...chartData} />*/}
                                  <ChartData
                                    payItem={item}
                                    title={item.title}
                                    chartType={chartType}
                                  ></ChartData>
                                </Col>
                              </Row>
                            ) : (
                              <>
                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                              </>
                            )
                          }
                          title={<h3 className="mrg10">{item.title}</h3>}
                        >
                          <Tag
                            color={item.tagColor}
                            style={{
                              margin: '0 auto',
                              justifyContent: 'center',
                              textAlign: 'center',
                              width: '100%',
                            }}
                          >
                            <h2 className="mrg10">{item.value}</h2> {item.title}
                          </Tag>
                        </Popover>
                      </Col>
                    </>
                  )
                )}
            </Row>
          </div>
        )}
        <Row gutter={[8, 8]}>
          {info &&
            Object.keys(info).length !== 0 &&
            Object.keys(info).map((item) => {
              if (item === 'payData' || item === 'consolidatedData') return null;
              return (
                <>
                  <Col
                    xs={{ span: 24 }}
                    sm={{ span: 24 }}
                    md={{ span: 24 }}
                    lg={{ span: 12 }}
                    xl={{ span: 8 }}
                  >
                    <div className="pad8">
                      <Row gutter={[0, 24]}>
                        <Col className="gutter-row" span={1}></Col>
                        <Col className="gutter-row" span={10} style={{ textAlign: 'left' }}>
                          <div className="left strong">{item}</div>
                        </Col>
                        <Col className="gutter-row" span={1}>
                          :
                        </Col>
                        <Col
                          className="gutter-row"
                          span={12}
                          style={{
                            display: 'flex',
                          }}
                        >
                          {info[item]}
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </>
              );
            })}
        </Row>
      </div>
    </Col>
  ) : (
    <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }}>
      {/*<DrillChartData
        payItem={payData.payData}
        title={payData.title}
        chartType={'pie'}
  ></DrillChartData>*/}
    </Col>
  );
}
