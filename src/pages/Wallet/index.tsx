import { Col, Row, Image, Divider, Button } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import styles from './index.less'
import strongbox from './../../../public/icons/strongbox.svg'
import glp from './../../../public/icons/glp.svg'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useSigner,
  useBalance,
  chainId,
  useNetwork
} from 'wagmi';

import { abi } from '../../ABI/NFTMarketplace.json'
import { addressMarketContract } from "../../static/constance"
import { BigNumber, ethers } from 'ethers';
import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import NftDetai from './NftDetai';

import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: 'xo2RoAerQuiC0xoBAQsysVcCSVNvYTZm', // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.

};
const alchemy = new Alchemy(settings);

const Products: React.FC = () => {

  const listingFee = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'listingFee',
  })

  console.log(listingFee.data?.toString());

  const activeItems = useContractRead({
    address: addressMarketContract,
    abi,
    functionName: 'fetchActiveItems',
  })

  console.log(activeItems);

  const { address: account, isConnecting, isDisconnected } = useAccount()


  const [dataList, setDataList] = useState<any[]>([])
  const getNFTMetadata = () => {
    alchemy.nft.getNftsForOwner(account as string).then((res) => {
      console.log(res);
      setDataList(res.ownedNfts)
    });
  }

  useEffect(() => {
    getNFTMetadata()
  }, [])

  return (
    <div className={styles.products}>
      <h1>My NFT Wallet</h1>
      <Row gutter={[16, 16]} >
        {
          dataList?.map((item: any,index:number) => {
            return <Col key={index} >
              <NftDetai address={item.contract.address} tokenId={item.tokenId} listingFee={listingFee} item={item} />
            </Col>
          })
        }
      </Row>
    </div>
  );
};

export default Products;
