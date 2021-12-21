import { ReactNode } from 'react';

interface MenuItem {
  key: string | number,
  title?: string,
  icon?: ReactNode
  children?: MenuItem[]
}

export const sideMenus: MenuItem[] = [
  {
    key: 'option1',
    title: 'option1',
  }, {
    key: 'option2',
    title: 'option2',
  }, {
    key: 'module1',
    title: 'module1',
    children: [{
      key: 'm1option1',
      title: 'option1',
    }, {
      key: 'm1option2',
      title: 'option2',
    }],
  }, {
    key: 'module2',
    title: 'module2',
    children: [{
      key: 'm2option1',
      title: 'option1',
    }, {
      key: 'm2option2',
      title: 'option2',
    }],
  },
];

export const topMenus = sideMenus;
