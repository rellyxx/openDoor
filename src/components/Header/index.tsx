import { Button, Col, Dropdown, Input, Menu, MenuProps, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import styles from './index.less'
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { chainId, useAccount, useSigner } from 'wagmi';
import { Contract } from 'ethers';
import { abi as nftAbi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";

const Header: React.FC = () => {
	const { address: account, isConnecting, isDisconnected } = useAccount();
	const { data: signer, isError, isLoading } = useSigner({ chainId: chainId.goerli })
	const [contractAddress, setContractAddress] = useState('')
	const handleWithdraw = async () => {
		console.log(contractAddress);

		const nftContract = new Contract(contractAddress, nftAbi, signer as any);
		const data = await nftContract.withdraw();
		console.log(data);
	}

	return (
		<div style={{ height: '10rem' }}>
			<div className={styles.header}>
				<Row justify='space-between' style={{ height: 'inherit' }}>
					<Col>
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
