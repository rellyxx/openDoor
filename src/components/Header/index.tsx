import { Button, Col, Dropdown, Menu, MenuProps, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less'
const { Option } = Select;
import ar from './../../../public/icons/ar.png'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Vector from '../../../public/icons/Vector.svg';

const Header: React.FC = () => {

   
    const [chain,setChain] = useState("0")
    const [chainName,setChainName] = useState("0")
    const [chainIcon,setChainIcon] = useState(<></>)

  return (
    <div style={{height:'10rem'}}>
    <div className={styles.header}>
        <Row justify='space-between' style={{height:'inherit'}}>
        <Col>
                    {/* <div style={{ marginLeft:40 }} onClick={() => history.go(-1)}>
                        <div style={{ height: 43, width: 43, borderRadius: 50, background: '#1B1F24', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                             <img src={Vector} /> 
                        </div>
                    </div> */}
                    </Col>
            <Col></Col>
            <Col style={{paddingRight:20}}>
              <ConnectButton/>
            </Col>

        </Row>
    </div>
    </div>
  );
};

export default Header;
