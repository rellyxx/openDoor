import { Button, Col, Row, Image } from 'antd';
import { chainId, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
import styles from './index.less'
import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import { BigNumber, Contract, ethers } from 'ethers';
import { abi } from '../../ABI/NFTMarketplace.json'
import { addressMarketContract } from "../../static/constance"

interface Props {
  address: any,
  tokenId: any,
  listingFee: any,
  item: any
}

const NftDetai = ({ address, tokenId, listingFee, item }: Props) => {

  const { data: signer, isError, isLoading } = useSigner({ chainId: chainId.goerli})

  const handleApprove= async (contractAddress:string,tokenId:BigNumber)=>{
    const nftContract = new Contract(contractAddress, nftAbi, signer as any);
    const data = await nftContract.approve(addressMarketContract, tokenId);
    console.log(data);
  }

  const handleApproveAll= async (contractAddress:string,addressMarketContract:string)=>{
    const nftContract = new Contract(contractAddress, nftAbi, signer as any);
    const data = await nftContract.setApprovalForAll(addressMarketContract, true);
    console.log(data);
  }

  const createMarketItem=async(contractAddress:string,tokenId:BigNumber)=>{
    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    const market = new Contract(addressMarketContract, abi, signer as any);
    const listingFee = await market.getListingFee()
    console.log(contractAddress, tokenId, auctionPrice, { value: listingFee });
    
    await market.createMarketItem(contractAddress, tokenId, auctionPrice, { value: listingFee })
  }
  

  return (
    <div className={styles.imgCard}>
      <Image width={'100%'} height={200} src={item.rawMetadata?.image} />
      <span>{item.rawMetadata?.name}</span>

      <Row>
        <Button style={{ width: '100%' }} onClick={() => handleApprove(address,tokenId)}> Approve </Button>
        {/* <Button style={{ width: '100%' }} onClick={() => handleApproveAll(address,addressMarketContract)}> Approve All </Button> */}

        <Button style={{ width: '100%' }} onClick={() => createMarketItem(address,tokenId)}> Sell </Button>
      </Row>
    </div>


  );
};

export default NftDetai;
