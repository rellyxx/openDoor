import { Button, Col, Dropdown, Input, Menu, MenuProps, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less'
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chainId, useAccount, useProvider, useSigner } from 'wagmi';
import { BigNumber, Contract, ethers } from 'ethers';
import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import { abi as marketABI } from "../../ABI/NFTMarketplace.json";
import { abi as marketUpgradeABI } from "../../ABI/NFTMarketplaceUpgrade.json";

import { addressMarketContract } from '@/static/constance';

const Header: React.FC = () => {
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
		// const data = await contract.upgrade(upgradeAddress);
		// console.log(data);

		

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
		const privateKey = '00a5453a3fa09d978c599f94c271e365c2003e667d07a4e6c416550576f1dde5'
		const wallet = new ethers.Wallet(privateKey, provider)
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
			// value: ethers.utils.parseEther("0.001")
			gasLimit: BigNumber.from('80000')
		}
		// 发起交易，写入操作需要 wallet.sendTransaction(tx)
		// const data = await signer?.call(tx2)
		// console.log(data)
		// console.log(signer);
		
		const receipt1 = await wallet.sendTransaction(tx2)
		await receipt1.wait()
		console.log(`交易详情：`)
		console.log(receipt1)
	}

	return (
		<div style={{ height: '10rem' }}>
			<div className={styles.header}>
				<Row justify='space-between' style={{ height: 'inherit' }}>
					<Col>
					{
						account==='0x255418669257091e8f0Ad37a12B1D5b72C04b43a'&&
						<div>
							<Input value={upgradeAddress} onChange={(e) => setUpgradeAddress(e.target.value)} placeholder='Upgrade address' />
							<Button onClick={handleUpgrade}>Upgrade</Button>
							<Button onClick={getImplementation}>getImplementation</Button>
							<Button onClick={withdrawMarket}>withdrawMarket</Button>

						</div>
					}
					</Col>
					<Col>
					{
						account==='0x255418669257091e8f0Ad37a12B1D5b72C04b43a'&&
						<div>
							<Input onChange={(e) => setContractAddress(e.target.value)} placeholder='contract address' />
							<Button onClick={handleWithdraw}>withdraw</Button>
						</div>
					}
						
					</Col>
					<Col style={{ paddingRight: 20 }}>
						<ConnectButton />
					</Col>

				</Row>
			</div>
		</div>
	);
};

export default Header;
