import RightContent from '@/components/RightContent';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { PageLoading } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import { useState } from 'react';
import defaultSettings from '../config/defaultSettings';
import Header from './components/Header';
import { errorConfig } from './requestErrorConfig';
import noName from './../public/icons/gloopNoName.png';
import './antd.rewrite.css'
import { ConfigProvider } from 'antd';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import {
    RainbowKitProvider,
    getDefaultWallets,
    darkTheme,
} from '@rainbow-me/rainbowkit';
import { chain, createClient, configureChains, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import '@rainbow-me/rainbowkit/styles.css';

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

ConfigProvider.config({
    prefixCls: 'gloop',
    theme: {
        primaryColor: '#25b864',
    },
});

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
    settings?: Partial<LayoutSettings>;
    loading?: boolean;
}> {

    return {
        settings: defaultSettings,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
    const [collapsed, setcollapsed] = useState(false)

    return {
        iconfontUrl: defaultSettings.iconfontUrl,
        rightContentRender: () => <RightContent />,
        collapsed,
        onCollapse: (e) => {
            setcollapsed(e)
        },
        onPageChange: () => {
            const { location } = history;
        },
        menuHeaderRender: (logo, title) => (
            <div style={{ height: 60, display: 'flex', alignItems: 'center' }}>
                <div>
                          <img src={noName} width={50} alt="" />
                        </div>
            </div>

        ),
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children, props) => {
            if (initialState?.loading) return <PageLoading />;
            return (
                <>
                    <ConfigProvider prefixCls="gloop">
                        <div>
                            <WagmiConfig client={wagmiClient}>
                                <RainbowKitProvider theme={darkTheme()} appInfo={{ appName: 'gloop' }} chains={chains}>
                                    <Header />
                                    {children}
                                </RainbowKitProvider>
                            </WagmiConfig>
                        </div>
                    </ConfigProvider>

                </>
            );
        },
        ...initialState?.settings,
    };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
    ...errorConfig,
};
