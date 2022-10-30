import { Image, Col, Row, Card, Divider } from 'antd';
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
import { ConnectButton, getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
    useSigner,
    useBalance
} from 'wagmi';

import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import Landing from './index';
import moment from 'moment';

const { chains, provider } = configureChains(
    [chain.mainnet, chain.goerli, chain.arbitrum, chain.arbitrumGoerli],
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



    const symbol = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'symbol',
      })

    const tokenIds = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'tokenIds',
      })

      console.log('tokenIds',tokenIds);

      const maxTokenIds = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'maxTokenIds',
      })

      console.log('maxTokenIds',maxTokenIds);



      const presaleStarted = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'presaleStarted',
      })

      console.log('presaleStarted',presaleStarted);


      const presaleEnded = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'presaleEnded',
      })

      console.log('presaleEnded',presaleEnded.data?.toString(),moment(parseInt(presaleEnded.data as string)*1000).format('YYYY-MM-DD HH:mm:ss'));
        console.log('presaleEnded1',new Date().getTime())

        console.log('presaleEnded1',new Date().getTime() > parseInt(presaleEnded.data as string)*1000)


      const owner = useContractRead({
        address: NFT_CONTRACT_ADDRESS,
        abi,
        functionName: 'owner',
      })

      console.log('owner',owner);


    const { config } = usePrepareContractWrite({
        address: NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'mint',
        overrides:{
            value: utils.parseEther("0.01")
        }
      })

    const { write:mint } = useContractWrite(config as any)


      const { config:presaleMintConfig } = usePrepareContractWrite({
        address: NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'presaleMint',
        overrides:{
            value: utils.parseEther("0.01")
        }
      })
      const { write:presaleMint } = useContractWrite(presaleMintConfig as any)


      const { config:startPresaleConfig } = usePrepareContractWrite({
        address: NFT_CONTRACT_ADDRESS,
        abi: abi,
        functionName: 'startPresale',
      })

    const { write:startPresale } = useContractWrite(startPresaleConfig as any)


    const convert=(address:string)=>{
        return  address.slice(0, 6) + '...' + address.slice(address.length-4, address.length)
    }

    console.log(tokenIds.data);


    console.log('aa',new Array(parseInt((tokenIds.data as any).toString())).fill(1));



    return (
        <div className={styles.landing}>
            <div style={{ backgroundImage: landingBg }} className={styles.bg}>
                <Row align='middle'>
                    <Col span={6}>
                        <img className={styles.logo} src={gloopNoName} />
                    </Col>
                    <Col span={18}>
                        <Row className={styles.menus} align='middle'>
                            <Col span={4}>
                                {/* <div className={styles.menu}>Documentation</div> */}
                            </Col>
                            <Col span={4} className={styles.menu}>
                                {/* <div className={styles.menu}>Ecosystem News</div> */}
                            </Col>
                            <Col span={3}>
                                <img onClick={() => window.open('https://twitter.com/')} className={styles.menu} src={twitter} alt="twitter" />
                            </Col>
                            <Col span={3}>
                                <img onClick={() => window.open('https://discord.com/')} className={styles.menu} src={discord} alt="discord" />
                            </Col>
                            <Col span={10}>
                                    <ConnectButton />
                            </Col>
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
                                new Date().getTime() > parseInt(presaleEnded.data as string)*1000?
                                <div onClick={()=>mint?.()} className={styles.btn}>Public Mint</div>
                                :
                                <div onClick={()=>presaleMint?.()} className={styles.btn}>Presale Mint</div>
                            }
                        </Col>
                    </Row>
                    <Row className={styles.statistics}>
                        <Col className={styles.item} span={6}>
                            <div>
                                <h1>0.01</h1>
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
                    <Row justify='space-around' >
                        {
                            new Array(parseInt((tokenIds.data as any).toString())).fill(1).map((item,index)=>{
                                return <Col className={styles.loremipsumItem}>
                                            <div className={styles.strongbox}>
                                                <Image src='https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/1.png' />
                                            </div>
                                            <h1>Title</h1>
                                        </Col>
                            })
                        }


                        <Col className={styles.loremipsumItem}>
                            <div className={styles.strongbox}>
                                <Image src='https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/1.png' />
                            </div>
                            <h1>Title</h1>
                        </Col>
                        <Col className={styles.loremipsumItem}>
                            <div className={styles.strongbox}>
                                <Image src='https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/2.png' />
                            </div>
                            <h1>Title</h1>
                        </Col>
                        <Col className={styles.loremipsumItem}>
                            <div className={styles.strongbox}>
                                <Image src='https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/3.png' />
                            </div>
                            <h1>Title</h1>
                        </Col>
                        <Col className={styles.loremipsumItem}>
                            <div className={styles.strongbox}>
                                <Image src='https://ikzttp.mypinata.cloud/ipfs/QmYDvPAXtiJg7s8JdRBSLWdgSphQdac8j1YuQNNxcGE1hg/4.png' />
                            </div>
                            <h1>Title</h1>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Home;
