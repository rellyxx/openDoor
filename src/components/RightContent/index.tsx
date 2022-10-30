import { useModel } from '@umijs/max';
import { Checkbox, Space, Switch } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less';
import { flushSync } from 'react-dom';
import logo from '.././../../public/gloop.png'
export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  console.log(initialState);


  if ((navTheme === 'realDark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <Space className={className}>
      {/* <Switch onChange={(checked)=> {
        let settings: any = {}
        if(checked){

          settings = {
            ...initialState.settings,
            navTheme:'realDark',
            logo:logo
          }
        }else{
          settings = {
            ...initialState.settings,
            navTheme:'light',
          }
        }

        flushSync(() => {
          setInitialState((preInitialState) => ({
            ...preInitialState,
            settings,
          }));
        });
      }}/> */}
      {/* <SelectLang className={styles.action} /> */}
    </Space>
  );
};
export default GlobalHeaderRight;
