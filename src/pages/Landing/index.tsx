import { Image, Col, Row, Card, Divider, message } from 'antd';
import React, { useEffect } from 'react';
import styles from './index.less'
import logo from './../../../public/icons/gloop.svg'
import twitter from './../../../public/icons/twitter.svg'
import discord from './../../../public/icons/discord.svg'
import enterApp from './../../../public/icons/enterApp.svg'
import lorem from './../../../public/icons/lorem.png'
import startEarning from './../../../public/icons/startEarning.png'
import landingBg from './../../../public/icons/landingBg.png'
import TVL from './../../../public/icons/TVL.svg'
import totalDebt from './../../../public/icons/totalDebt.svg'
import totaluser from './../../../public/icons/totaluser.svg'
import availablevaults from './../../../public/icons/availablevaults.svg'
import gloopNoName from './../../../public/icons/gloopNoName.svg'
import gloop from './../../../public/icons/gloop.svg'

import { Link } from '@umijs/max';
import { Web3Modal } from '@web3modal/react';
import { abi, NFT_CONTRACT_ADDRESS } from "../../ABI/nft.js";
import { Contract, providers, utils } from "ethers";
import { ConnectButton, getDefaultWallets, RainbowKitProvider, darkTheme  } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
    useSigner,
    useBalance,
    useNetwork,
    useSwitchNetwork
} from 'wagmi';

import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Home from './home';

const { chains, provider } = configureChains(
    [chain.mainnet, chain.goerli,],
    [alchemyProvider({ apiKey: 'v54XKO_i8u4kDLFXG8PNQH32fJFQK6QH' }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "gloop",
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});


const Landing: React.FC = ({children}) => {




    return (
        <div>
                <WagmiConfig client={wagmiClient}>
                    <RainbowKitProvider theme={darkTheme()} appInfo={{ appName: 'gloop' }} chains={chains}>
                        <Home/>
                    </RainbowKitProvider>
                </WagmiConfig>
        </div>
    );
};

export default Landing;
