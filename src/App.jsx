import Home from "./pages/home/home";
import { Navigate, Route, Routes } from "react-router-dom";
import { SkeletonTheme } from "react-loading-skeleton";

import { useAccount } from 'wagmi';
import { Message } from './components/message/message';
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/header/header";
import Footer from './components/footer/footer';
import Categories from "./pages/categories/categories";
import Auth from './pages/auth/auth';
import Explore from './pages/explore/explore';
import Merchant from "./pages/merchant/merchant";
import Collection from "./pages/collection/collection";
import Item from './components/product/item/item';
import Auctionpop from "./components/popup/auction/auctionpop";
import Checkout from './components/popup/checkout/checkout';
import Shippingpop from "./components/popup/shipping/shippingpop";
import Profile from "./pages/profile/profile";
import Admin from "./pages/admin/admin";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal, useWeb3ModalTheme } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import Ratepop from "./components/popup/rate/rate";
import Paypop from "./components/popup/pay/paypop";
import Moonpay from "./components/popup/pay/moonpay";
import { useEffect } from "react";
import ConnectionPop from "./components/popup/connect/connect";
import { popActions } from "./store/pops/pops";
import { ethers } from 'ethers';

const chains = [goerli]
const projectId = "4d1d3340ce52db49bbe842f3aa385ab1";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

function App() {
  const { setTheme } = useWeb3ModalTheme();

  // Set modal theme
  setTheme({
    themeMode: "dark",
    themeVariables: {
      "--w3m-font-family": "Mulish, sans-serif",
      "--w3m-accent-color": "#1A3034",
      "--w3m-text-medium-regular-size": "12px",
      "--w3m-accent-fill-color": "#fff",
      "--w3m-button-border-radius": "8px",
      "--w3m-text-medium-regular-weight": "400",
    },
  });


  const AppJSX = () => {
    const { notify, message, loading } = useSelector(
      (state) => state.notification
    );

    const { dark } = useSelector(
      (state) => state.mode
    );

    const dispatch = useDispatch()

    useEffect(() => {
      const element = document.getElementsByTagName("BODY")[0];
      if (dark) {
        element.style.cssText = 'background-color: black';
      } else {
        element.style.cssText = 'background-color: #FCFCFC';

      }

    }, [dark])

    const { isConnected } = useAccount()



    useEffect(() => {
      let abortcontroller;
      let int;
      (async function () {
        abortcontroller = new AbortController()
        int = setInterval(async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const { chainId } = await provider.getNetwork()
          if (isConnected && chainId != 5) {
            //pop
            dispatch(popActions.setConnection(true))
          } else {
            //remove pop
            dispatch(popActions.setConnection(false))
          }
        }, 500);

      })()
      return () => {
        clearInterval(int)
        abortcontroller.abort()
      };
    }, [isConnected, dispatch])





    return (
      <section className={`buy ${dark ? "dark" : ""}`}>
        {notify && <Message message={message} loading={loading} />}
        <Checkout />
        <Auctionpop />
        <Shippingpop />
        <Ratepop />
        <Paypop />
        <ConnectionPop />

        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="category/*" element={<Categories />} />
          <Route path="auth/*" element={<Auth />} />
          <Route path="explore" element={<Explore />} />
          <Route path="merchants/*" element={<Merchant />} />
          <Route path="collection" element={<Collection />} />
          <Route path="item/:id" element={<Item />} />
          <Route path="myadmin/*" element={<Admin />} />
          <Route path="profile/*" element={<Profile />} />
          <Route path="moonpay" element={<Moonpay />} />
          <Route path={"*"} element={<Navigate replace to="" />} />
        </Routes>

        <Footer />
      </section>
    );
  };


  return (
    <>
      <SkeletonTheme baseColor="#E9040405" highlightColor="#E9040430">

        <WagmiConfig config={wagmiConfig}>

          <AppJSX />

        </WagmiConfig>
      </SkeletonTheme>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
