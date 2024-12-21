import React from 'react';
import { BookOutlined, TrophyOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Link } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const { Content, Sider } = Layout;

const itemsMenu: MenuProps['items'] = [
  {
    key: 'dictionary',
    icon: React.createElement(BookOutlined),
    label: 'מילון',
    children: [
      { key: 'my-dictionary', label: <Link to="/dictionary">המילון שלי</Link> },
      { key: 'add-your-word', label: 'הוספת מילה חדשה'}, 
      { key: 'dictionary-stats', label: 'סטטיסטיקות' },
    ],
  },
  {
    key: 'games',
    icon: React.createElement(TrophyOutlined), 
    label: 'משחקים',
    children: [
      { key: 'hangman', label: 'איש תלוי' },
      { key: 'speed-game', label: 'משחק מהירות' },
      { key: 'die-der-das', label: 'die der das' },
    ],
  },
  {
    key: 'settings',
    icon: React.createElement(SettingOutlined),
    label: 'הגדרות',
    children: [
      { key: 'language', label: 'שינוי שפה' },
      { key: 'change-my-info', label: 'שינוי פרטים אישים' },
    ],
  },
];

interface MainLayoutProps {
  myComponent: React.ReactNode;
  levelName: string,
  courseName: string,
}

const MainLayout: React.FC<MainLayoutProps> = ({ myComponent, levelName, courseName }) => {
  const { name } = useParams<{ name?: string }>(); 
  const currName = name ?? 'default-level';    

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb
        items={[
          { title: 'גיל עציוני' },
          { title: 'גרמנית' },
          { title: <Link to="/main">מסך הבית</Link> },
          ...(levelName !== '' ? [{ title: currName }] : []),
          ...(courseName !== '' ? [{ title: courseName }] : []),
        ]}
        style={{ margin: '16px 0', textAlign: 'right', direction: 'rtl' }} 
      />
        <Content
          style={{
            padding: 24,
            margin: 0,
            background: 'white',
            borderRadius: borderRadiusLG,
            overflow: 'auto',
          }}
        >
          {myComponent}
        </Content>
      </Layout>
      <Sider width={200} style={{ background: 'white' }}>

      <div style={{ direction: 'ltr', textAlign: 'right'}}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['dictionary']}
          style={{ height: '100%', borderLeft: '1px solid #e8e8e8'}}
          items={itemsMenu}
        />
       </div>
      </Sider>
    </Layout>
  );
};

export default MainLayout;