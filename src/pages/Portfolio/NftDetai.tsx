import { Button, Col, Row, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from 'wagmi';
import styles from './index.less'
import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import { BigNumber, ethers } from 'ethers';
import { Network, Alchemy } from "alchemy-sdk";
import { abi } from '../../ABI/NFTMarketplace.json'

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
  const { address: account, isConnecting, isDisconnected } = useAccount()

  const [itemInfo, setItemInfo] = useState<ItemInfo>()

  const { config: deleteMarketItemConfig } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'deleteMarketItem',
    args: [item.tokenId]
  })

  const { write: deleteMarketItem } = useContractWrite(deleteMarketItemConfig as any)


  const { config: createMarketSaleconfig } = usePrepareContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: abi,
    functionName: 'createMarketSale',
    args: [item.nftContract, item.tokenId],
    overrides: {
      value: ethers.utils.parseEther("0.01")
    }
  })

  const { write: createMarketSale } = useContractWrite(createMarketSaleconfig as any)

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

      <Row>
        {((item.seller == account && item.buyer == ethers.constants.AddressZero) || (item.buyer == account))
          ? <Button style={{ width: '100%' }} onClick={() => deleteMarketItem?.()}>Cancel listing</Button>
          : ''
        }

        {
          (item.seller != account && item.state == 0)
            ? <Button style={{ width: '100%' }} onClick={() => createMarketSale?.()}>Buy this</Button>
            : ''
        }
      </Row>
    </div>
  );
};

export default NftDetai;
