import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Layout, Breadcrumb, Menu } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import './index.less';
import { PieChartOutlined } from '@ant-design/icons';
import { isEmpty, map } from 'lodash';
import { sideMenus, topMenus } from './config';

const { Sider, Header, Content } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

const defaultOptionIcon = <PieChartOutlined />;

function MainLayout(props: any) {
  const { children } = props;

  const buildMenus = useCallback((menus: any) => map(menus, (menuItem) => {
    const {
      title, key, icon, path, children: menuItems,
    } = menuItem;

    if (!isEmpty(menuItems)) {
      return (
        <SubMenu
          key={key}
          title={title}
          icon={icon || defaultOptionIcon}
        >
          {buildMenus(menuItems)}
        </SubMenu>
      );
    }
    return (
      <MenuItem key={key} icon={icon || defaultOptionIcon}>
        <Link to={path}>{title}</Link>
      </MenuItem>
    );
  }), []);

  return (
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark">
          {buildMenus(topMenus)}
        </Menu>
      </Header>
      <Layout>
        <Sider collapsible>
          <Menu mode="inline" theme="dark">
            {buildMenus(sideMenus)}
          </Menu>
        </Sider>
        <Layout>
          <Breadcrumb />
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default withRouter(MainLayout);
