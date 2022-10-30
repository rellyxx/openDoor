import { Button, Col, Dropdown, Menu, MenuProps, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less'
const { Option } = Select;
import ar from './../../../public/icons/ar.png'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { ConnectButton, useAccount, useConnectModal, useDisconnect } from '@web3modal/react'

const Header: React.FC = () => {
    const { account } = useAccount()

    const { isOpen, open, close } = useConnectModal()
   
    const [chain,setChain] = useState("0")
    const [chainName,setChainName] = useState("0")
    const [chainIcon,setChainIcon] = useState(<></>)

    const items = [
        {
          label: 'Arbitrum one',
          key: '1',
          icon: <img src={ar}/>,
        },
      ]
      const handleMenuClick: MenuProps['onClick'] = e => {
        console.log('click', e);
        setChain(e.key)
        const selected = items.filter((item)=>item.key===e.key)[0]
        setChainName(selected.label)
        setChainIcon(selected.icon)

    };
    const menu = (
        <Menu
            onClick={handleMenuClick}
            items={items}
        />
    );
    const disconnect = useDisconnect()

    const convert=(address:string)=>{
        return  address.slice(0, 6) + '...' + address.slice(address.length-4, address.length) 
    }
  return (
    <div style={{height:'10rem'}}>
    <div className={styles.header}>
        <Row justify='space-between' style={{height:'inherit'}}>
            <Col></Col>
            <Col></Col>
            <Col style={{paddingRight:20}}>
                <Dropdown overlay={menu}>
                    <Button className={styles.selectChain}>
                        <Space>
                            {chain!=='0'?<div>{chainIcon}{chainName}</div>:'Select'}
                        <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>

                {
                    account.isConnected 
                    ?
                    <div onClick={disconnect} className={styles.connect}>{convert(account.address)}</div> 
                    : 
                    <div onClick={open} className={styles.connect}>Connect</div>
                }

                
            </Col>

        </Row>
    </div>
    </div>
  );
};

export default Header;
