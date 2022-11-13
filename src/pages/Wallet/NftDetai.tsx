import { Button, Col, Row, Image } from 'antd';
import { chainId, useAccount, useContractEvent, useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
import styles from './index.less'
import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import { BigNumber, Contract, ethers } from 'ethers';
import { abi } from '../../ABI/NFTMarketplace.json'
import { addressMarketContract } from "../../static/constance"
import React, { useState, memo, useEffect, useCallback } from 'react';

interface Props {
    item: any,
    account:any
}

const NftDetai = memo(({ item, account }: Props) => {


    const { data: signer, isError, isLoading } = useSigner({ chainId: chainId.goerli })

    const [approved,setApproved] = useState('')


    const operator = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi: nftAbi,
        functionName: 'getApproved',
        args:[item.tokenId]
    })
    console.log(operator);

    // useEffect(()=>{
    //    getApproved(item.contract.address,item.tokenId)
    // },[])

    useContractEvent({
        address: item.contract.address,
        abi: nftAbi,
        eventName: 'Approval',
        listener(owner, approved, tokenId) {
            console.log(owner, approved, tokenId);
            getApproved(item.contract.address,tokenId)
        },
    })

    const handleApprove = async (contractAddress: string, tokenId: BigNumber) => {
        const nftContract = new Contract(contractAddress, nftAbi, signer as any);
        const data = await nftContract.approve(addressMarketContract, tokenId);
        console.log(data);
    }



    const handleApproveAll = async (contractAddress: string, addressMarketContract: string) => {
        console.log(contractAddress, addressMarketContract);

        const nftContract = new Contract(contractAddress, nftAbi, signer as any);
        const data = await nftContract.setApprovalForAll(addressMarketContract, true);
        console.log(data);
    }

    const createMarketItem = async (contractAddress: string, tokenId: BigNumber) => {
        const auctionPrice = ethers.utils.parseUnits('1', 'ether')
        const market = new Contract(addressMarketContract, abi, signer as any);
        const listingFee = await market.getListingFee()
        console.log(contractAddress, tokenId, auctionPrice, { value: listingFee });

        await market.createMarketItem(contractAddress, tokenId, auctionPrice, { value: listingFee })
    }

    const getApproved = async (contractAddress: string, tokenId: BigNumber) => {
        console.log('监听到了');
        const nftContract = new Contract(contractAddress, nftAbi, signer as any);
        console.log(nftContract);
        const data = await nftContract.getApproved(tokenId);
        console.log('approved',data);
        setApproved(data)
    }


    const isApprovedForAll = async (contractAddress: string) => {
        const nftContract = new Contract(contractAddress, nftAbi, signer as any);
        const data = await nftContract.isApprovedForAll(account, addressMarketContract);
        console.log(contractAddress);
        console.log(data);
    }

    console.log(operator.data !== addressMarketContract,approved !== addressMarketContract);


    return (
        <div className={styles.imgCard}>
            <Image width={'100%'} height={200} src={item.rawMetadata?.image} />
            <span>{item.rawMetadata?.name}</span>

            <Row>
                {
                   (operator.data === addressMarketContract || approved === addressMarketContract )?
                   <Button style={{ width: '100%' }} onClick={() => createMarketItem(item.contract.address, item.tokenId)}> Sell </Button>

                        :
                        <Button style={{ width: '100%' }} onClick={() => handleApprove(item.contract.address, item.tokenId)}> Approve </Button>

                }

                {/* <Button style={{ width: '100%' }} onClick={() => handleApproveAll(item.contract.address,addressMarketContract)}> Approve All </Button> */}

                {/* <Button style={{ width: '100%' }} onClick={() => getApproved(item.contract.address,item.tokenId)}> getApproved</Button> */}

                {/* <Button style={{ width: '100%' }} onClick={() => createMarketItem(item.contract.address,item.tokenId)}> Sell </Button> */}

                {/* <Button style={{ width: '100%' }} onClick={() => isApprovedForAll(item.contract.address)}> isApprovedForAll </Button> */}

            </Row>
        </div>


    );
});

export default NftDetai;
