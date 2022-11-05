import { Button, Col, Row, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less'
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
  apiKey: 'xo2RoAerQuiC0xoBAQsysVcCSVNvYTZm', // Replace with your Alchemy API Key.
  network: Network.ETH_GOERLI, // Replace with your network.

};
const alchemy = new Alchemy(settings);
interface Props {
  item: any
}

interface ItemInfo {
  name: string,
  description: string,
  svg: string
}

const NftDetai = ({ item }: Props) => {
  const [itemInfo, setItemInfo] = useState<ItemInfo>()
  useEffect(() => {
    getNFTMetadata()
  }, [])

  const getNFTMetadata = () => {
    alchemy.nft.getNftMetadata(item.nftContract as string, item.tokenId.toString()).then((response: any) => {
      console.log("response", response);
      setItemInfo({
        "name": response?.rawMetadata.name,
        "description": response?.rawMetadata.description,
        "svg": response?.rawMetadata.image
      })
    });
  }


  return (
    <div className={styles.imgCard}>
      <Image width={'100%'} height={200} src={itemInfo?.svg} />
      <span>{itemInfo?.name}</span>
    </div>
  );
};

export default NftDetai;
