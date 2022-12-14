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
    watch:true
  })


  const MyPurchasedItems = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'fetchMyPurchasedItems',
    watch:true
  })


  const MyCreatedItems = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'fetchMyCreatedItems',
    watch:true
  })


  return (
    <div className={styles.products}>
      <h1>Market Overview</h1>
      <Row gutter={20}>
        <Col span={6} className={styles.col} >
          <div>
            <img src={strongbox} alt="" />
            <span>List Fee</span>
            <div className={styles.num}>
              {ethers.utils.formatEther(listingFee?.data as any || 0) + "eth"}
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col} >
          <div>
            <img src={strongbox} alt="" />
            <span>active Items</span>
            <div className={styles.num}>
              {(activeItems.data as [])?.length}
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col} >
          <div>
            <img src={strongbox} alt="" />
            <span>My Purchased Items</span>
            <div className={styles.num}>
              {(MyPurchasedItems.data as [])?.length}
            </div>
          </div>
        </Col>
        <Col span={6} className={styles.col} >
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
      <Row gutter={[40, 40]}  >
        {
          (activeItems?.data as any)?.map((item: any,index: React.Key | null | undefined)=>{
            return <Col key={index} >
                  <NftDetai item={item}/>
            </Col>
          })
        }
      </Row>
    </div>
  );
};

export default Products;
