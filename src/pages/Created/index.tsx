import { Col, Row, Image, Divider, Button } from 'antd';
import React from 'react';
import styles from './index.less'
import {
  useContractRead,
} from 'wagmi';
import { abi } from '../../ABI/NFTMarketplace.json'
import { addressMarketContract } from "../../static/constance"
import NftDetai from './NftDetai';

const Products: React.FC = () => {

  const MyCreatedItems = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'fetchMyCreatedItems',
  })

  return (
    <div className={styles.products}>
      <h1>NFT Market - my created</h1>
      <Row gutter={[16, 16]} >
        {
          (MyCreatedItems?.data as any)?.map((item: any, index: number) => {
            return <Col key={index} span={4}>
              <NftDetai item={item} />
            </Col>
          })
        }
      </Row>
    </div>
  );
};

export default Products;
