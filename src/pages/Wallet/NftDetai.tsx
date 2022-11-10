import { Button, Col, Row, Image } from 'antd';
import { chainId, useAccount, useContractRead, useContractWrite, usePrepareContractWrite, useSigner } from 'wagmi';
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

    const { address:account, isConnecting, isDisconnected } = useAccount()

  const { data: signer, isError, isLoading } = useSigner({ chainId: chainId.goerli})

  const handleApprove= async (contractAddress:string,tokenId:BigNumber)=>{
    const nftContract = new Contract(contractAddress, nftAbi, signer as any);
    const data = await nftContract.approve(addressMarketContract, tokenId);
    console.log(data);
  }

  const handleApproveAll= async (contractAddress:string,addressMarketContract:string)=>{
    console.log(contractAddress,addressMarketContract);

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

  const getApproved = async(contractAddress:string,tokenId:BigNumber)=>{
    const nftContract = new Contract(contractAddress, nftAbi, signer as any);
    const data = await nftContract.getApproved(tokenId);
    console.log(data);

  }


  const isApprovedForAll = async(contractAddress:string)=>{
    const nftContract = new Contract(contractAddress, nftAbi, signer as any);
    const data = await nftContract.isApprovedForAll(account,addressMarketContract);
    console.log(contractAddress);
    console.log(data);
  }

  const operator = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: nftAbi,
    functionName: 'getApproved',
    args:[tokenId]
})
console.log(operator);


  return (
    <div className={styles.imgCard}>
      <Image width={'100%'} height={200} src={item.rawMetadata?.image} />
      <span>{item.rawMetadata?.name}</span>

      <Row>
        {
            operator.data !== addressMarketContract?
            <Button style={{ width: '100%' }} onClick={() => handleApprove(address,tokenId)}> Approve </Button>
            :
            <Button style={{ width: '100%' }} onClick={() => createMarketItem(address,tokenId)}> Sell </Button>
        }

        {/* <Button style={{ width: '100%' }} onClick={() => handleApproveAll(address,addressMarketContract)}> Approve All </Button> */}

       {/* <Button style={{ width: '100%' }} onClick={() => getApproved(address,tokenId)}> getApproved</Button> */}

        {/* <Button style={{ width: '100%' }} onClick={() => createMarketItem(address,tokenId)}> Sell </Button> */}

        {/* <Button style={{ width: '100%' }} onClick={() => isApprovedForAll(address)}> isApprovedForAll </Button> */}

      </Row>
    </div>


  );
};

export default NftDetai;
