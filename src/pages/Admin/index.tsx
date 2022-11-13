import React, { useState } from 'react';
import { Col, Row, Image, Divider, Button, Input, Space } from 'antd';
import styles from './index.less'
import {
    chainId,
    useAccount,
  useContractRead,
  useProvider,
  useSigner,
} from 'wagmi';

import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import { abi as marketABI } from "../../ABI/NFTMarketplace.json";
import { abi as marketUpgradeABI } from "../../ABI/NFTMarketplaceUpgrade.json";

import { addressMarketContract } from '@/static/constance';
import { BigNumber, Contract, ethers } from 'ethers';

const Admin: React.FC = () => {
    const { address: account, isConnecting, isDisconnected } = useAccount();
	const { data: signer, isError, isLoading } = useSigner({ chainId: chainId.goerli })
	const provider = useProvider({
		chainId: chainId.goerli,
	  })
	const [contractAddress, setContractAddress] = useState('')
	const [upgradeAddress, setUpgradeAddress] = useState('0xA15cA4D7E3f5D4Be041C6137e35B7A157486Eb28')

	const handleWithdraw = async () => {
		console.log(contractAddress);
		const nftContract = new Contract(contractAddress, nftAbi, signer as any);
		const data = await nftContract.withdraw();
		console.log(data);
	}

	const handleUpgrade = async()=>{
		const contract = new Contract(addressMarketContract, marketABI, signer as any);
		const data = await contract.upgrade(upgradeAddress);
		console.log(data);
	}

	const getImplementation = async()=>{
		const contract = new Contract(addressMarketContract, marketABI, signer as any);
		//获取函数选择器
		const param1 = contract.interface.encodeFunctionData(
			"implementation",
		);
		console.log(param1);
		// 创建交易
		const tx1 = {
			to: addressMarketContract,
			data: param1
		}
		// 发起交易，可读操作（view/pure）可以用 provider.call(tx)
		const data = await provider.call(tx1)
		console.log(data);
	}

	const withdrawMarket = async()=>{
		const contract = new Contract(addressMarketContract, marketUpgradeABI, signer as any);
		// // 编码calldata
		const param2 = contract.interface.encodeFunctionData(
			"withdraw"
		);
		// console.log(`编码结果： ${param2}`)
		// 创建交易
		const tx2 = {
			to: addressMarketContract,
			data: param2,
			gasLimit: BigNumber.from('80000')
		}
		// 发起交易，写入操作需要 wallet.sendTransaction(tx)
		const data = await signer?.sendTransaction(tx2)
		// console.log(data)
	}


  return (
    <div className={styles.admin}>
        <h1>Admin</h1>
        <Row justify='space-between' style={{ height: 'inherit' }}>
					<Col span={24}>
					{
						account==='0x255418669257091e8f0Ad37a12B1D5b72C04b43a'&&
						<Space>
							<Input style={{width:400}} value={upgradeAddress} onChange={(e) => setUpgradeAddress(e.target.value)} placeholder='Upgrade address' />
							<Button onClick={handleUpgrade}>Upgrade</Button>
							<Button onClick={getImplementation}>getImplementation</Button>
							<Button onClick={withdrawMarket}>withdrawMarket</Button>
						</Space>
					}
					</Col>
                    <Divider/>
					<Col span={24}>
					{
						account==='0x255418669257091e8f0Ad37a12B1D5b72C04b43a'&&
						<Space>
							<Input style={{width:400}} onChange={(e) => setContractAddress(e.target.value)} placeholder='contract address' />
							<Button onClick={handleWithdraw}>withdraw</Button>
						</Space>
					}

					</Col>
				</Row>
    </div>
  );
};

export default Admin;
