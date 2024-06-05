import { BigNumber, ethers } from "ethers";
import Big from "bignumber.js";
import apiRequest from "../../../helpers/connections";
import { notificationActions } from "../../../store/notification/notification";
import { MARKETPLACE, MARKETPLACEABI, NFTABI, USDCContract, WMATICABI, WMATICContract } from "../../../config";
import { popActions } from '../../../store/pops/pops';
import { checkoutActions } from "../../../store/checkout/checkout";

const valueFee = {
    value: 0,
    gasLimit: 7920027, 
};

export const getItemById = async (id, navigate) => {
    try {
        const res = await apiRequest(
            "item/" + id,
            undefined,
            undefined,
            undefined
        );
        return res
    } catch (error) {
        navigate("/")
        console.log(error);
    }
};
export const getItemByIdAndPassword = async (password, id, navigate) => {
    try {
        const res = await apiRequest(
            "item/" + id,
            {password},
            "POST",
            undefined
        );
        return res
    } catch (error) {
        navigate("/")
        console.log(error);
    }
};

export const listNFT = async (dispatch, data, amount, address, merchant, auction, matic) => {
    const dt = new Date()
    dt.setDate(dt.getDate() + Number(auction.days))


    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MARKETPLACE, MARKETPLACEABI, signer);

        if (amount == 0) {
            dispatch(notificationActions.setMessage("Amount canno be zero"))
            return
        }
        const instance = new ethers.Contract(data.contract, NFTABI, signer);

        try {
            const walladdress = await instance.ownerOf(1);

            if (walladdress != address) {
                dispatch(notificationActions.setMessage("NFT has been burnt or does not belong to you"))

                return
            }
            const response = await contract.listItem({
                item_id: data.item_id,
                merchant_id: merchant,
                nft: data.contract,
                tokenId: 1,
                price: ethers.utils.parseEther(String(amount / matic)),
                usdcPrice: ethers.utils.parseEther(String(amount)),
                startBid: auction.amount > 0 ? ethers.utils.parseEther(String(auction.amount / matic)) : 0,
                seller: address,
                unlisted: false,
                auction: auction.amount > 0 ? true : false,
                timestamp: auction.amount ? Number(String(dt.getTime()).slice(0, 10)) : 0,
                canUnlist: false
            }, valueFee);

            await response.wait();
            setTimeout(() => {
                dispatch(notificationActions.setMessage("Listing was successful"))
                dispatch(popActions.setAuctionData({}))
            }, 6000);


        } catch (error) {

            dispatch(notificationActions.setMessage(error.message));
        }
    }

}

export const unListNFT = async (dispatch, data, amount, address, merchant, navigate) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MARKETPLACE, MARKETPLACEABI, signer);

        try {
            const response = await contract.unListItem({
                item_id: data.item_id,
                merchant_id: merchant,
                nft: data.contract,
                tokenId: 1,
                price: ethers.utils.parseEther(String(amount)),
                usdcPrice: ethers.utils.parseEther(String(data.usdcprice)),
                startBid: data.startBid > 0 ? ethers.utils.parseEther(String(data.startBid)) : 0,
                seller: address,
                unlisted: false,
                auction: data.startBid > 0 ? true : false,
                timestamp: data.startBid ? data.auction_duration : 0,
                canUnlist: false
            }, valueFee);

            await response.wait();
            setTimeout(() => {
                dispatch(notificationActions.setMessage("Unlisting was successful"))
                navigate("/profile")
            }, 6000);
        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));

        }
    }
}

export const checkApproved = async (address, nftAddress, setApproved) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftAddress, NFTABI, signer);

        try {
            const response = await contract.isApprovedForAll(address, MARKETPLACE);
            setApproved(response)
        } catch (error) {
            console.log(error);
        }
    }
}

export const ApproveNFT = async (dispatch, nftAddress) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))


        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftAddress, NFTABI, signer);


        try {
            const response = await contract.setApprovalForAll(MARKETPLACE, true);

            await response.wait();
            dispatch(notificationActions.setMessage("NFT approval completed"));

        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));

        }
    }
}

export const buyNFTs = async (dispatch, basket, buyer_id, navigate) => {
    if (window.ethereum && basket.length > 0) {
        dispatch(notificationActions.setNotify(true))
        let total = 0
        const item = basket.map((item) => {
            total += item.price;
            return {
                item_id: item.item_id,
                merchant_id: item.merchant_id,
                nft: item.contract,
                tokenId: 1,
                price: ethers.utils.parseEther(String(item.price)),
                usdcPrice: ethers.utils.parseEther(String(item.usdcprice)),
                startBid: ethers.utils.parseEther(String(item.startBid)),
                seller: item.address,
                unlisted: false,
                auction: item.auction == 0 ? true : false,
                timestamp: item.auction_duration,
                canUnlist: false
            }
        })


        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MARKETPLACE, MARKETPLACEABI, signer);


        try {

            const response = await contract.purchaseItem(item, buyer_id, {
                value: ethers.utils.parseEther(String(total)),
                gasLimit: 7920027,
            });

            await response.wait();
            setTimeout(() => {
                dispatch(notificationActions.setMessage("Purchase was successful"))
                dispatch(checkoutActions.setPop(false))
                dispatch(popActions.setPay(false))
                dispatch(checkoutActions.setEmpty())
                navigate("/")
            }, 6000);


        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));

        }
    }
}
export const checkUSDCApproved = async (address, setApproved, amount) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(USDCContract, WMATICABI, signer);

        try {
            //debugger;
            const response = await contract.allowance(address, MARKETPLACE);
            const bal = amount * 10 ** 18;
            const num = Number(BigNumber.from(`${response._hex}`).toString());
            num >= bal ? setApproved(true) : setApproved(false);
        } catch (error) {
            console.log("error", error);
        }
    }
};

export const handleUSDCApproval = async (dispatch, setApproved, amount) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true));

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(USDCContract, WMATICABI, signer);
        
        try { 
            //debugger;
            const response = await contract.approve(
                MARKETPLACE,
                (new Big(amount.toString()).shift(18)).toFixed(), valueFee);
            await response.wait();

            setApproved(true);

            dispatch(notificationActions.setMessage("Approval Completed"));
        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));
        }
    }
};


export const buyUSDCNFTs = async (dispatch, basket, buyer_id, navigate) => {
    if (window.ethereum && basket.length > 0) {
        dispatch(notificationActions.setNotify(true))
        const item = basket.map((item) => {
            return {
                item_id: item.item_id,
                merchant_id: item.merchant_id,
                nft: item.contract,
                tokenId: 1,
                price: ethers.utils.parseEther(String(item.price)),
                usdcPrice: ethers.utils.parseEther(String(item.usdcprice)),
                startBid: item.startBid,
                seller: item.address,
                unlisted: false,
                auction: item.auction == 0 ? true : false,
                timestamp: item.auction_duration,
                canUnlist: false
            }
        })

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MARKETPLACE, MARKETPLACEABI, signer);

        try {
            const response = await contract.USDCPurchaseItem(item, buyer_id, valueFee);

            await response.wait();
            setTimeout(() => {
                dispatch(notificationActions.setMessage("Purchase was successful"))
                dispatch(checkoutActions.setPop(false))
                dispatch(popActions.setPay(false))
                dispatch(checkoutActions.setEmpty())
                navigate("/")
            }, 6000);


        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));

        }
    }
}

export const recharge = async (dispatch, data, buyer_id, duration, val) => {
    console.log(data, buyer_id, duration, val);

    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MARKETPLACE, MARKETPLACEABI, signer);

        try {
            const response = await contract.recharge({
                item_id: data.item_id,
                merchant_id: data.merchant_id,
                nft: data.contract,
                tokenId: 1,
                price: ethers.utils.parseEther(String(0)),
                usdcPrice: ethers.utils.parseEther(String(0)),
                startBid: data.startBid > 0 ? ethers.utils.parseEther(String(data.startBid)) : 0,
                seller: data.merchants,
                unlisted: false,
                auction: data.startBid > 0 ? true : false,
                timestamp: data.startBid ? data.auction_duration : 0,
                canUnlist: false
            }, duration, buyer_id, {
                value: ethers.utils.parseEther(String(val)),
                gasLimit: 7920027,
            });

            await response.wait();
            setTimeout(() => {
                dispatch(notificationActions.setMessage("Recharge was successful"))
                dispatch(popActions.setAuctionData({}))
            }, 6000);


        } catch (error) {
            console.log(error);
            dispatch(notificationActions.setMessage(error.message));
        }
    }

}

export const checkWApproved = async (address, setApproved, amount) => {
    if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(WMATICContract, WMATICABI, signer);

        try {
            //debugger;
            const response = await contract.allowance(address, MARKETPLACE);
            const bal = amount * 10 ** 18;
            const num = Number(BigNumber.from(`${response._hex}`).toString());
            num >= bal ? setApproved(true) : setApproved(false);
        } catch (error) {
            console.log("error", error);
        }
    }
};

export const handleBidApproval = async (dispatch, setApproved, amount) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true));

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(WMATICContract, WMATICABI, signer);
        try {
            //debugger;
            const response = await contract.approve(
                MARKETPLACE,
                (new Big(amount.toString()).shift(18)).toFixed(), valueFee);
            await response.wait();

            setApproved(true);

            dispatch(notificationActions.setMessage("Approval Completed"));
        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));
        }
    }
};

export const bidItem = async (dispatch, data, amount, buyer_id) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MARKETPLACE, MARKETPLACEABI, signer);

        try {
            const response = await contract.bidItem({
                item_id: data.item_id,
                merchant_id: data.merchant_id,
                nft: data.contract,
                tokenId: 1,
                price: ethers.utils.parseEther(String(data.price)),
                usdcPrice: ethers.utils.parseEther(String(data.usdcprice)),
                startBid: data.startBid > 0 ? ethers.utils.parseEther(String(data.startBid)) : 0,
                seller: data.address,
                unlisted: false,
                auction: data.startBid > 0 ? true : false,
                timestamp: data.startBid > 0 ? data.auction_duration : 0,
                canUnlist: false
            }, ethers.utils.parseEther(String(amount)), buyer_id, valueFee);

            await response.wait();
            setTimeout(() => {
                dispatch(notificationActions.setMessage("Bid was successful"))
            }, 6000);
        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));

        }
    }
}

export const burnShip = async (dispatch, nftAddress, id, auth) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftAddress, NFTABI, signer);
        try {
            const address = await contract.ownerOf(1);

            if (address != "0x000000000000000000000000000000000000dEaD") {
                const tx = await contract.transferFrom(address, "0x000000000000000000000000000000000000dEaD", 1, valueFee)
                tx.wait()
                await apiRequest("user/redeem/" + id, undefined, undefined, auth)
                dispatch(notificationActions.setMessage("Item burn completed"));
            } else {
                await apiRequest("user/redeem/" + id, undefined, undefined, auth)
                dispatch(notificationActions.setMessage("Item already burnt"));
            }



        } catch (error) {
            if (error?.info?.error?.status === 422) {
                dispatch(notificationActions.setMessage(error?.info?.error?.message));
            } else {
                dispatch(notificationActions.setMessage(error.message));
            }

        }
    }
}


export const burn = async (dispatch, nftAddress, id, auth) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(nftAddress, NFTABI, signer);
        try {
            const address = await contract.ownerOf(1);

            if (address != "0x000000000000000000000000000000000000dEaD") {
                const tx = await contract.transferFrom(address, "0x000000000000000000000000000000000000dEaD", 1, valueFee)
                tx.wait()
                await apiRequest("user/redeem-service/" + id, undefined, undefined, auth)
                dispatch(notificationActions.setMessage("Item burn completed"));
            } else {
                await apiRequest("user/redeem-service/" + id, undefined, undefined, auth)
                dispatch(notificationActions.setMessage("Item already burnt"));
            }


        } catch (error) {
            if (error?.info?.error?.status === 422) {
                dispatch(notificationActions.setMessage(error?.info?.error?.message));
            } else {
                dispatch(notificationActions.setMessage(error.message));
            }

        }
    }
}

export const handleBidClaim = async (dispatch, data) => {
    if (window.ethereum) {
        dispatch(notificationActions.setNotify(true))

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(MARKETPLACE, MARKETPLACEABI, signer);

        try {
            const response = await contract.claimBid({
                item_id: data.item_id,
                merchant_id: data.merchant_id,
                nft: data.contract,
                tokenId: 1,
                price: ethers.utils.parseEther(String(data.price)),
                usdcPrice: ethers.utils.parseEther(String(data.usdcprice)),
                startBid: data.startBid > 0 ? ethers.utils.parseEther(String(data.startBid)) : 0,
                seller: data.address,
                unlisted: false,
                auction: data.startBid > 0 ? true : false,
                timestamp: data.startBid > 0 ? data.auction_duration : 0,
                canUnlist: false
            }, valueFee);

            await response.wait();
            setTimeout(() => {
                dispatch(notificationActions.setMessage("Claim was successful"))
            }, 6000);
        } catch (error) {
            dispatch(notificationActions.setMessage(error.message));

        }
    }
}

export const getSearch = async () => {
    try {
        const res = await apiRequest("item/search", undefined, undefined, undefined)
        return res
    } catch (error) {
        console.log(error);
    }
}

export const reportListing = async (dispatch, id, auth) => {
        dispatch(notificationActions.setNotify(true))

        try {
                await apiRequest("item/report/" + id, undefined, undefined, auth)
                dispatch(notificationActions.setMessage("Report Sent"));

        } catch (error) {
            if (error?.info?.error?.status === 422) {
                dispatch(notificationActions.setMessage(error?.info?.error?.message));
            } else {
                dispatch(notificationActions.setMessage(error.message));
            }

        }
}

function blobToBase64(blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

export const getVideoCover = async (file, seekTo = 0.1) => {
    return new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
            reject("error when loading video file", ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
            // seek to user defined timestamp (in seconds) if possible
            if (videoPlayer.duration < seekTo) {
                reject("video is too short.");
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
              videoPlayer.currentTime = seekTo;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener('seeked', () => {
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement("canvas");
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext("2d");
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob
                ctx.canvas.toBlob(
                    async blob => {
                        resolve(await blobToBase64(blob));
                    },
                    "image/png",
                    0.75 /* quality */
                );
            });
        });
    });
}

// const extractMessageAndHash = async (burnTx, library) => {
//     // Extract the message from the emitted MessageSent event
//     const { logs } = await library.getTransactionReceipt(transactionHash)
//     const eventTopic = id('MessageSent(bytes)')
//     const log = logs.filter((l) => l.topics[0] === eventTopic)[0]
//     const messageBytes = defaultAbiCoder.decode(['bytes'], log.data)[0]
//     const messageHash = web3.utils.keccak256(messageBytes);
//     // Fetch the attestation from Circle's API
//     let attestationResponse = { status: 'pending' };
//     while (attestationResponse.status != 'complete') {
//         attestationResponse = (await fetch(`https://iris-api-sandbox.circle.com/attestations/${messageHash}`)).json();
//         // Wait 2 seconds in between calls
//         await new Promise(r => setTimeout(r, 2000));
//     }
// }

//export const circle = async (amount, destinationAddress, ethTokenMessengerContract, MATIC_DESTINATION_DOMAIN, USDC_ETH_CONTRACT_ADDRESS) => {
    // //approve usdt to be burnt
    // //
    // // Deposit USDC tokens for burn and obtain transaction hash
    // const burnUsdcTx = await ethTokenMessengerContract.depositForBurn(amount, MATIC_DESTINATION_DOMAIN, destinationAddress, USDC_ETH_CONTRACT_ADDRESS).send();
    // // Extract message from burn transaction and calculate messageHash
    // const { messageBytes, messageHash } = extractMessageAndHash(burnUsdcTx);
    // // Retrieve attestation for message hash and mint USDC on AVAX tokens on the destination chain
    // // Mint the USDC on AVAX tokens on the destination chain using the burn transaction message and attestation
    // const receiveTx = await avaxMessageTransmitterContract.receiveMessage(receivingMessageBytes, signature);
//}