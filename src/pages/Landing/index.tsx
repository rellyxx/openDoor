import React, { useEffect } from 'react';
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
import { mainnet, polygon, optimism, arbitrum, goerli, arbitrumGoerli } from 'wagmi/chains';


import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Home from './home';

const { chains, provider, webSocketProvider  } = configureChains(
    [mainnet, goerli,],
    [alchemyProvider({ apiKey: 'v54XKO_i8u4kDLFXG8PNQH32fJFQK6QH' }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "openDoor",
    chains
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});

const client = createClient({
    autoConnect: true,
    provider,
    connectors,
    webSocketProvider,
  })


const Landing: React.FC = ({children}) => {
    return (
        <div>
                <WagmiConfig client={client}>
                    <RainbowKitProvider theme={darkTheme()} appInfo={{ appName: 'openDoor' }} chains={chains}>
                        <Home/>
                    </RainbowKitProvider>
                </WagmiConfig>
        </div>
    );
};

export default Landing;
