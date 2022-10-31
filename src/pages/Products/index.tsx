import { Col, Row, Image, Divider, Button } from 'antd';
import React from 'react';
import styles from './index.less'
import strongbox from './../../../public/icons/strongbox.svg'
import {
  useContractRead,
} from 'wagmi';

import { abi } from '../../ABI/NFTMarketplace.json'
import { addressMarketContract } from "../../static/constance"
import { BigNumber, ethers } from 'ethers';
import NftDetai from './NftDetai';

const Products: React.FC = () => {

  const listingFee = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'listingFee',
  })


  const activeItems = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'fetchActiveItems',
  })


  const MyPurchasedItems = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'fetchMyPurchasedItems',
  })


  const MyCreatedItems = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'fetchMyCreatedItems',
  })


  return (
    <div className={styles.products}>
      <h1>Market Overview</h1>
      <Row justify='space-between'>
        <Col className={styles.col} >
          <div>
            <img src={strongbox} alt="" />
            <span>List Fee</span>
            <div className={styles.num}>
              {ethers.utils.formatEther(listingFee?.data as any || 0) + "eth"}
            </div>
          </div>
        </Col>
        <Col className={styles.col} >
          <div>
            <img src={strongbox} alt="" />
            <span>active Items</span>
            <div className={styles.num}>
              {(activeItems.data as [])?.length}
            </div>
          </div>
        </Col>
        <Col className={styles.col} >
          <div>
            <img src={strongbox} alt="" />
            <span>My Purchased Items</span>
            <div className={styles.num}>
              {(MyPurchasedItems.data as [])?.length}
            </div>
          </div>
        </Col>
        <Col className={styles.col} >
          <div>
            <img src={strongbox} alt="" />
            <span>My Created Items</span>
            <div className={styles.num}>
              {(MyCreatedItems.data as [])?.length}
            </div>
          </div>
        </Col>
      </Row>

      <Divider/>

      <h1>NFT Market - all</h1>
      <Row gutter={[16, 16]} >
        {
          (activeItems?.data as any)?.map((item: any,index: React.Key | null | undefined)=>{
            return <Col key={index} span={4}>
                  <NftDetai item={item}/>
            </Col>
          }) 
        }
      </Row>
    </div>
  );
};

export default Products;
