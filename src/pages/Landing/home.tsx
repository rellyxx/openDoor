import { Image, Col, Row, Card, Divider, message, Space, Button } from 'antd';
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
import { BigNumber, Contract, ethers, providers, utils } from "ethers";
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
    useSigner,
    useBalance,
    chainId,
    useNetwork,
    useSwitchNetwork,
    useContractEvent
} from 'wagmi';

import { chain as chainObj, createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Landing from './index';
import moment from 'moment';

import {
    useConnectModal,
    useAccountModal,
    useChainModal,
} from '@rainbow-me/rainbowkit';

const { chains, provider } = configureChains(
    [chainObj.mainnet, chainObj.goerli, chainObj.arbitrum, chainObj.arbitrumGoerli],
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


const Home: React.FC = () => {
    const { chain, chains } = useNetwork()

    const { error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()

    useEffect(()=>{
        if(chain?.id!==5){
            switchNetwork?.(chainObj.goerli.id)
        }
    },[chain])

    const { address, isConnecting, isDisconnected } = useAccount()

    const price = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: '_price',
    })


    const symbol = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'symbol',
    })

    const tokenIds = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'tokenIds',
        watch: true,
    })

    console.log('tokenIds', tokenIds);

    const maxTokenIds = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'maxTokenIds',
    })

    console.log('maxTokenIds', maxTokenIds);



    const presaleStarted = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'presaleStarted',
    })

    console.log('presaleStarted', presaleStarted);


    const presaleEnded = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'presaleEnded',
    })

    console.log('presaleEnded', presaleEnded.data?.toString(), moment(parseInt(presaleEnded.data as string) * 1000).format('YYYY-MM-DD HH:mm:ss'));
    console.log('presaleEnded1', new Date().getTime())

    console.log('presaleEnded1', new Date().getTime() > parseInt(presaleEnded.data as string) * 1000)


    const owner = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'owner',
    })

    console.log('owner', owner);


    const { config } = usePrepareContractWrite({
        address: NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'mint',
        overrides: {
            value: utils.parseEther("0.01")
        }
    })

    const { write: mint, data, isLoading: isLoadingOfmint, isSuccess,  } = useContractWrite(config as any)


    const { config: presaleMintConfig } = usePrepareContractWrite({
        address: NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'presaleMint',
        overrides: {
            value: utils.parseEther("0.01")
        }
    })
    const { write: presaleMint } = useContractWrite(presaleMintConfig as any)


    const { config: startPresaleConfig } = usePrepareContractWrite({
        address: NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'startPresale',
    })

    const { write: startPresale } = useContractWrite(startPresaleConfig as any)


    console.log(isSuccess);

    useContractEvent({
        address: NFT_CONTRACT_ADDRESS,
        abi: abi,
        eventName: 'Transfer',
        listener(from, to, tokenId) {
          console.log(from, to, tokenId)
          console.log('from', from)
          console.log('to', to)
          console.log('tokenId', tokenId)
          message.success('success mint')

        },
      })



    return (
        <div className={styles.landing}>
            <div style={{ backgroundImage: landingBg }} className={styles.bg}>
                <Row align='middle'>
                    <Col span={6}>
                        <img className={styles.logo} src={gloopNoName} />
                    </Col>
                    <Col span={18}>
                        <Row className={styles.menus} align='middle' justify='end'>
                            <Space size={80}>
                                <Link to={'/explore'}>
                                    <div style={{background:'#19FB80'}} className={styles.btn}>Exchange</div>
                                </Link>
                                <img onClick={() => window.open('https://twitter.com/')} className={styles.menu} src={twitter} alt="twitter" />
                                <img onClick={() => window.open('https://discord.com/')} className={styles.menu} src={discord} alt="discord" />
                                <ConnectButton />
                            </Space>


                        </Row>
                    </Col>
                </Row>
                <div className={styles.content}>
                    <Row className={styles.contentRow}>
                        <div>
                            <h1>Welcome to Crypto Devs!</h1>
                            <br />
                            Its an NFT collection for developers in Crypto.
                        </div>
                    </Row>
                    <Row align='middle' className={styles.startEarning}>
                        <Col span={8}>
                            {

new Date().getTime() < parseInt(presaleEnded.data as string) * 1000 && address === owner.data ?
                                    <div onClick={() => startPresale?.()} className={styles.btn}> Presale Start </div>
                                    :
                                    new Date().getTime() > parseInt(presaleEnded.data as string) * 1000
                                        ?
                                        <div onClick={() => {
                                            if (!address) {
                                                message.info("Please connect wallet！")
                                                return
                                            }
                                            if (chain?.id !==5 ){
                                                message.info("Please select goerli")
                                                return

                                            }
                                            mint?.()
                                        }} className={styles.btn}>{isLoadingOfmint&&!isSuccess?'Minting':"Public Mint"}</div>
                                        :
                                        <div onClick={() => {
                                            console.log(address);

                                            if (!address) {
                                                message.info("Please connect wallet！")
                                                return
                                            }

                                            if (chain?.id !==5 ){
                                                message.info("Please select goerli！")
                                                return
                                            }
                                            presaleMint?.()

                                        }} className={styles.btn}>Presale Mint</div>
                            }

                        </Col>
                    </Row>
                    <Row className={styles.statistics}>
                        <Col className={styles.item} span={6}>
                            <div>
                                <h1>{address && chain?.id ===5  && ethers.utils.formatEther(BigNumber.from(price.data || 0)) + 'eth'}  </h1>
                                <div className={styles.imgName}>
                                    <img src={TVL} alt="TVL" />
                                    <span>Price</span>
                                </div>
                            </div>
                        </Col>
                        <Col className={styles.item} span={6}>
                            <div>
                                <h1>{tokenIds.data?.toString()}</h1>
                                <div className={styles.imgName}>
                                    <img src={totalDebt} alt="totalDebt" />
                                    <span>tokenIds</span>
                                </div>
                            </div>
                        </Col>
                        <Col className={styles.item} span={6}>
                            <div>
                                <h1>{maxTokenIds.data?.toString()}</h1>
                                <div className={styles.imgName}>
                                    <img src={totaluser} alt="totaluser" />
                                    <span>Total Supply</span>
                                </div>

                            </div>
                        </Col>
                        <Col className={styles.item} style={{ borderRight: 0 }} span={6}>
                            <div>
                                <h1>{symbol.data}</h1>
                                <div className={styles.imgName}>
                                    <img src={availablevaults} alt="availablevaults" /><span>Symbol</span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className={styles.loremipsum} justify='center' align='middle'>
                        <div> Have <span>Minted</span> </div>
                    </Row>
                    <Row  className='animate__animated  animate__bounceInLeft' gutter={[40,20]} >
                        {
                            new Array(parseInt((tokenIds.data as any)?.toString() || 0)).fill(1).map((item, index) => {
                                return <Col span={6} className={styles.loremipsumItem}>
                                        <div className={styles.strongbox}>
                                            <Image className='hvr-buzz' src={`https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/${index + 1}.png`} />
                                        </div>
                                        </Col>

                            })
                        }
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Home;
