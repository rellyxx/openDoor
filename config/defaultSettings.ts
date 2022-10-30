import { Settings as LayoutSettings } from '@ant-design/pro-components';

/**
 * @name
 */
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'realDark',
  colorPrimary: '#151618',
  layout: 'side',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: "",
  pwa: false,
  logo: "http://file.1024sir.com/gloop.png",
  iconfontUrl: '//at.alicdn.com/t/c/font_3734775_5w773wpfdrc.js',
};

export default Settings;
