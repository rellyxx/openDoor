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


	return (
		<div style={{ height: '10rem' }}>
			<div className={styles.header}>
				<Row justify='space-between' style={{ height: 'inherit' }}>
					<Col>
					</Col>
					<Col>
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
