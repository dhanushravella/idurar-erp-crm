import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-icon.png';
import logoText from '@/style/images/logo-text.png';

import { SettingOutlined, DashboardOutlined, BugOutlined, BankOutlined } from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);

  const updateActivity = (key) => {
    navMenu.click(window.location.pathname);
  };

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <>
      <Sider collapsible collapsed={isNavMenuClose} onCollapse={onCollapse} className="navigation">
        <div className="logo">
          <img
            src={logoIcon}
            alt="Logo"
            // style={{ margin: "0 auto 40px", display: "block" }}
          />

          {!showLogoApp && (
            <img src={logoText} alt="Logo" style={{ marginTop: '3px', marginLeft: '10px' }} />
          )}
        </div>
        <Menu mode="inline">
          <Menu.Item key={'Dashboard'} icon={<DashboardOutlined />}>
            <Link to={'/'} />
            Dashboard
          </Menu.Item>
          <Menu.Item key={'Turo'} icon={<BugOutlined />}>
            <Link to={'/turbo'} />
            Ask Jeeves
          </Menu.Item>
          <SubMenu key={'Payroll'} icon={<BankOutlined />} title={'Payroll'}>
            <Menu.Item key={'Manage Payroll'}>
              <Link to={'/payroll'} />
              Manage Payroll
            </Menu.Item>
            <Menu.Item key={'Authorize Payroll'}>
              <Link to={'/payroll'} />
              Authorize Payroll
            </Menu.Item>
            <Menu.Item key={'Manage Bank Details'}>
              <Link to={'/payroll'} />
              Manage Bank Details
            </Menu.Item>
            <Menu.Item key={'View Payslip'}>
              <Link to={'/payroll'} onClick={updateActivity} />
              View Payslip
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={'Settings'} icon={<SettingOutlined />} title={'Settings'}>
            <Link to={'/settings'} />
            Settings
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
