import { Button, Col, Row, Image, Divider, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { chainId, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
import styles from './index.less'
import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import { BigNumber, Contract, ethers, utils } from 'ethers';
import { Network, Alchemy } from "alchemy-sdk";
import { abi } from '../../ABI/NFTMarketplace.json'
import { addressMarketContract } from "../../static/constance"
import { BulbOutlined, InfoOutlined } from '@ant-design/icons';

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

    const { data: signer, isError, isLoading } = useSigner({ chainId: chainId.goerli })

    const createMarketSale = async (contractAddress: string, itemId: BigNumber, price:BigNumber) => {
        const market = new Contract(addressMarketContract, abi, signer as any);
        await market.createMarketSale(contractAddress, itemId.toString(), { value: price })
    }

    const deleteMarketItem = async (itemId: any) => {
        console.log(itemId);

        const market = new Contract(addressMarketContract, abi, signer as any);
        await market.deleteMarketItem(itemId)
    }

    console.log(item);
    console.log(itemInfo);



    return (
        <div className={styles.imgCard}>
            <div className={styles.header}>
                <span>{itemInfo?.name}</span>
                <Popover content={itemInfo?.description} >
                <BulbOutlined style={{ fontSize: '20px', color: '#08c', cursor:'pointer' }} />
                </Popover>
            </div>
            <Divider />
            <div style={{padding:'0px 20px 20px 20px'}}>
                <Image width={'100%'} height={200} src={itemInfo?.svg} />
                {/* <Row justify='space-between'>
                    <span>{itemInfo?.name}</span>
                    <span>{ethers.utils.formatEther(item.price.toString())}eth</span>
                </Row> */}
                <Row style={{marginTop:20}}>
                    {((item.seller == account && item.buyer == ethers.constants.AddressZero) || (item.buyer == account))
                        ? <Button style={{ width: '100%' }} onClick={() => deleteMarketItem(item.id)}>Cancel listing</Button>
                        : ''
                    }

                    {
                        (item.seller != account && item.state == 0)
                            ? <Button style={{ width: '100%' }} onClick={() => createMarketSale(item.nftContract,item.id,item.price)}>Buy this {ethers.utils.formatEther(item.price.toString())}eth</Button>
                            : ''
                    }
                </Row>
            </div>

        </div>
    );
};

export default NftDetai;
