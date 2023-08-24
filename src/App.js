import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import { FiShoppingCart } from "react-icons/fi";
import Web3 from "web3";
import { usdtAb } from "./Componantes/usdtAbi";
import { usdcABI } from "./Componantes/usdcAbi";
import { preSaleAbi } from "./Componantes/preSaleAbi";
import "./css/ArrowAnimation.css";
import { Tilt } from "react-tilt";
import Marquee from "react-fast-marquee";
import CountUp from "react-countup";
import { BsArrowRight, BsArrowRightCircle } from "react-icons/bs";

function App() {
  const [balance, setBalance] = useState(0);
  const [selectedToken, setSelectedToken] = useState("");
  const [status, setStatus] = useState("");
  const [usdtAmount, setUsdtAmount] = useState();
  // const [usdcAmount, setUsdcAmount] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [isTokenImported, setIsTokenImported] = useState(false);
  const tokenValue = 0.13; // 13 cents
  const [walletAddress, setWalletAddress] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const images = [
    "crypto-image-1.png",
    "crypto-image-2.png",
    "crypto-image-3.png",
    "crypto-image-4.png",
    "crypto-image-5.png",
  ];
  const defaultOptions = {
    reverse: false, // reverse the tilt direction
    max: 35, // max tilt rotation (degrees)
    perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
    scale: 1.1, // 2 = 200%, 1.5 = 150%, etc..
    speed: 1000, // Speed of the enter/exit transition
    transition: true, // Set a transition on enter/exit.
    axis: null, // What axis should be disabled. Can be X or Y.
    reset: true, // If the tilt effect has to be reset on exit.
    easing: "cubic-bezier(.03,.98,.52,.99)", // Easing on enter/exit.
  };

  const handleToggleExpand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.tronWeb != "undefined") {
      try {
        /* TronWeb is installed */

        const accounts = window.tronWeb.defaultAddress.base58;
        setWalletAddress(accounts);
        console.log(accounts);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* TronLink is not installed */
      console.log("Please install TronLink");
      window.open("https://www.tronlink.org/dlDetails/", "_blank");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.tronWeb != "undefined") {
      try {
        const accounts = window.tronWeb.defaultAddress.base58;
        if (accounts.length > 0) {
          setWalletAddress(accounts);
          console.log(accounts);
        } else {
          console.log("Connect to TronLink using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* TronLink is not installed */
      console.log("Please install TronLink");
      window.open("https://www.tronlink.org/dlDetails/", "_blank");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.tronWeb != "undefined") {
      window.tronWeb.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* TronLink is not installed */
      setWalletAddress("");
      console.log("Please install TronLink");
      window.open("https://www.tronlink.org/dlDetails/", "_blank");
    }
  };

  // const handleAmountChange = (e) => {
  //   const amount = parseFloat(e.target.value);
  //   const minAmoutValue = 5000;
  //   setUsdtAmount(amount);

  //   if (e.target.value < minAmoutValue) {
  //     const amount_record_input = document.getElementById("amount_record");
  //     amount_record_input.value = minAmoutValue;

  //     const errorDiv = document.querySelector(".amount_record_error");

  //     // Set the error message
  //     const errorMessage = "Amount should greater than 5000"; // Replace this with your desired error message
  //     errorDiv.textContent = errorMessage;
  //     // setUsdtAmount(minAmoutValue);
  //   } else {
  //     const errorDiv = document.querySelector(".amount_record_error");

  //     // Make the content empty
  //     errorDiv.textContent = "";
  //     // setUsdtAmount(amount);
  //   }
  // };

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value);
    const maxAmoutValue = 999;

    if (e.target.value > maxAmoutValue) {
      const amount_record_input = document.getElementById("amount_record");
      amount_record_input.value = maxAmoutValue;

      const errorDiv = document.querySelector(".amount_record_error");

      // Set the error message
      const errorMessage = "Amount should not be greater than 999"; // Replace this with your desired error message
      errorDiv.textContent = errorMessage;

      setUsdtAmount(maxAmoutValue);
    } else {
      const errorDiv = document.querySelector(".amount_record_error");

      // Make the content empty
      errorDiv.textContent = "";
      setUsdtAmount(amount);
    }
  };

  const calculateTokenAmount = () => {
    const calculatedValue = (usdtAmount / tokenValue).toFixed(8);
    if (Number(calculatedValue) === 0 || calculatedValue === "NaN") return 0;
    else {
      return calculatedValue;
    }
  };
  const preSaleAddress = "TRBMTYBh6wTYr2pEkWkicWNTLL8UCDgXTC";

  const approve = async () => {
    /* const tokenvalueElement = document.getElementById("amount_token_value");
    const tokenNumber = tokenvalueElement.value; */

    const buttonElement = document.getElementById("approve_connect_btn");

    // Get the data-id attribute value
    const tokenNumber = buttonElement.getAttribute("data-id");

    console.log(tokenNumber);
    if (typeof window != "undefined" && typeof window.tronWeb != "undefined") {
      try {
        console.log("Inside Try");
        // const web3 = new Web3(window.ethereum);
        // await window.ethereum.enable();
        // const accounts = await web3.eth.getAccounts();
        // console.log("accounts", accounts);

        // const radio_button = document.getElementById("USDT");

        //   if (tokenNumber == 1) {
        //      const tronWeb = window.tronWeb;

        // // Contract address of the TRC20 token (e.g., USDT)
        // const usdcContractAddress = 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8';

        // // const senderAddress = await tronWeb.defaultAddress.base58;
        // const senderAddress = window.tronWeb.defaultAddress.base58;

        // // Create a contract instance using the token address and ABI
        // const tokenContract = tronWeb.contract(usdcABI, usdcContractAddress);

        // // Convert the amount to approve to token units (considering token decimals)
        // const amountInTokenUnits = tronWeb.toSun(usdtAmount);

        // // Call the approve function on the token contract
        // const response = await tokenContract.approve(preSaleAddress, amountInTokenUnits).send({
        //   // shouldPollResponse: true,
        //   feeLimit: 100000000, // Adjust the fee limit as needed
        //   callValue: 0,
        //   from: senderAddress,
        // });
        // setStatus("Approval successful!");
        // setIsApproved(true);
        // console.log('Transaction successful:', response);
        //   } else if (tokenNumber == 2) {
        const tronWeb = window.tronWeb;

        // Contract address of the TRC20 token (e.g., USDT)
        const usdtContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

        // const senderAddress = await tronWeb.defaultAddress.base58;
        const senderAddress = window.tronWeb.defaultAddress.base58;

        // Create a contract instance using the token address and ABI
        const tokenContract = tronWeb.contract(usdtAb, usdtContractAddress);

        // Convert the amount to approve to token units (considering token decimals)
        const amountInTokenUnits = tronWeb.toSun(usdtAmount);

        // Call the approve function on the token contract
        const response = await tokenContract
          .approve(preSaleAddress, amountInTokenUnits)
          .send({
            // shouldPollResponse: true,
            feeLimit: 100000000, // Adjust the fee limit as needed
            callValue: 0,
            from: senderAddress,
          });
        setStatus("Approval successful!");
        setIsApproved(true);
        console.log("Transaction successful:", response);
        // } else {
        //   console.error("No Token Selected");
        // }
      } catch (error) {
        console.error(error);
        setStatus("Approval failed!");
      }
    } else {
      /* TronLink is not installed */
      console.log("Please install TronLink");
      window.open("https://www.tronlink.org/dlDetails/", "_blank");
    }
  };

  const callPresaleContractFunction = async () => {
    try {
      const buttonElement = document.getElementById("approve_connect_btn");

      // Get the data-id attribute value
      const tokenNumber = buttonElement.getAttribute("data-id");

      // if (tokenNumber == 1) {
      // const tronWeb = window.tronWeb
      // const contractInstance = tronWeb.contract(preSaleAbi, preSaleAddress);
      // const usdtAmountInSun = window.tronWeb.toSun(usdtAmount);
      // const senderAddress = window.tronWeb.defaultAddress.base58;
      // console.log("usdtAmountInSun", usdtAmountInSun)
      // const result = await contractInstance.buyWithUSDC(usdtAmountInSun).send({
      //   feeLimit: 100000000, // Adjust the fee limit accordingly
      //   callValue: 0, // For buying with USDT, you might need to send TRX, set the value in SUN
      //   from: senderAddress,
      // });
      // console.log('Transaction successful:', result);
      // setStatus('Buy successfully!');
      // } else if (tokenNumber == 2) {
      const tronWeb = window.tronWeb;
      const contractInstance = tronWeb.contract(preSaleAbi, preSaleAddress);
      const usdtAmountInSun = window.tronWeb.toSun(usdtAmount);
      const senderAddress = window.tronWeb.defaultAddress.base58;
      const result = await contractInstance.buyWithUSDT(usdtAmountInSun).send({
        feeLimit: 100000000, // Adjust the fee limit accordingly
        callValue: 0, // For buying with USDT, you might need to send TRX, set the value in SUN
        from: senderAddress,
      });
      console.log("Transaction successful:", result);
      setStatus("Buy successfully!");
      // } else {
      //   console.error("ERROR in Contract");
      // }
    } catch (error) {
      console.error(error);
      setStatus("Failed to Buy Token");
    }
  };

  const handleButtonClick = async () => {
    //   if(usdtAmount>5000){
    if (!isApproved) {
      await approve();
    } else {
      callPresaleContractFunction();
    }
    //  }
  };

  const importToken = async () => {
    if (window.tronWeb && window.tronWeb.ready) {
      const tronweb = window.tronLink; // Updated: Access window.tronLink instead of tronLink
      try {
        tronweb.request({
          method: "wallet_watchAsset",
          params: {
            type: "contract",
            options: {
              address: "TY8hfFKj3pcA8EiNjZT5tjzHwfYStF88G6",
            },
          },
        });
      } catch (e) {
        console.error("Error requesting to watch token:", e);
      }
    }
  };

  function getUSDTValue() {
    // Replace this with your actual API call to fetch the USDT value
    // For demonstration purposes, let's assume the value is retrieved as 100 USDT.
    return 100;
  }

  function updateBalance(selectedToken) {
    const usdtValue = getUSDTValue();
    setBalance(usdtValue);
    setSelectedToken(selectedToken);
  }
  function truncateAddress(address) {
    const start = address.slice(0, 5);
    const end = address.slice(-4);
    return `${start}.....${end}`;
  }

  function selectToken(tokenNumber) {
    const buttons = document.getElementsByClassName("token-select");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    buttons[tokenNumber - 1].classList.add("active");

    // Update the button text with the USDT value when clicked
    let tokenValue = "";
    if (tokenNumber === 1) {
      tokenValue = "USDC";

      // Get the button element by its className name
      const buttonElement = document.getElementById("approve_connect_btn");

      // Set the data-id attribute value
      const dataIdValue = 1; // Replace 'some_value' with the desired value
      buttonElement.setAttribute("data-id", dataIdValue);
    } else if (tokenNumber === 2) {
      tokenValue = "USDT";

      // Get the button element by its className name
      const buttonElement = document.getElementById("approve_connect_btn");

      // Set the data-id attribute value
      const dataIdValue = 2; // Replace 'some_value' with the desired value
      buttonElement.setAttribute("data-id", dataIdValue);
    }
    console.log(tokenValue);
    console.log(tokenNumber);

    /* const token_btn = document.getElementById("amount_token_value");

    if(tokenNumber == 1){
      token_btn.value = tokenNumber;
    }else if(tokenNumber == 2){
    token_btn.value = tokenNumber;
    }
    else{
      tokenNumber = 2;
      token_btn.value = tokenNumber;
    } */
    // Update the content of the <p> tag with the selected token value
    const balanceElements = document.getElementsByClassName("balance");
    for (const element of balanceElements) {
      element.textContent = `Your Balance: 0 ${tokenValue}`;
    }
    // Call selectToken with token number 2 by default
    // selectToken(2);
  }
  // selectToken(1)
  useEffect(() => {
    selectToken(1);
  }, []);

  return (
    <div className="container-fluid overflow-hidden banner-sec px-0 mx-0" id="">
      <div className="container px-0 ">
        <div
          className="head px-[2rem] md:px-0"
          style={{ paddingTop: "2rem", paddingBottom: "1.5rem" }}
        >
          <div className="row mx-0 ">
            <div className="px-0 z-30 col-lg-8 col-md-8 col justify-content-start">
              <div className="md:px-[2.5rem]">
                <div className="w-fit">
                  <a href="http://pointzap.ae/">
                    <img
                      href="http://pointzap.ae/"
                      className="logo cursor-pointer min-w-[50px] w-[60px] min-h-fit md:w-[80px]"
                      src="pointzap-logo.png"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="p-0 col-lg-4 col-md-4 col text-end align-self-center">
              <button
                className="wallet-button text-[14px] md:text-[16px]"
                onClick={connectWallet}
              >
                <span className="whitespace-nowrap is-link has-text-weight-bold">
                  {walletAddress && walletAddress.length > 0
                    ? `${truncateAddress(walletAddress)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="container-fluid px-0 mt-5">
          <div className="row mx-0 px-0">
            <div
              className="part1 font-gilroy mx-0  px-[1rem] md:mx-[1rem]  col-lg-7 col-md-6 col-12 content-sec"
              style={{ zIndex: "2" }}
            >
              <div className="px-[1.5rem] md:px-[0.7rem]">
                <div className="row mx-0 px-0 about-section-title">
                  <h5 className="font-semibold">About Pointzap</h5>
                  <h2 className="text-[24px] lg:text-[48px]">
                    Revolutionizing Investment Through{" "}
                    <span className="text-[#ff3c00]"> Web3 </span> Technology
                  </h2>
                  <p className="font-[600]" style={{ fontSize: 18 }}>
                    Pointzap Capital is a revolutionary investment and funding
                    platform at the forefront of innovation, powered by
                    cutting-edge web3 technology. It leverages the BEP20 and
                    TRC20 blockchain standards to provide a seamless experience.
                    Here's how Pointzap Capital functions:
                  </p>
                  <ul className="flex font-[600] flex-col gap-y-[0.5rem]">
                    <li className="flex gap-x-[1rem] ">
                      <BsArrowRightCircle className="text-2xl min-w-fit text-[#ff3c00]" />{" "}
                      <span className="text-white">
                        {" "}
                        Operates via a DAO for collective decisions.{" "}
                      </span>
                    </li>
                    <li className="flex gap-x-[1rem] ">
                      <BsArrowRightCircle className="text-2xl min-w-fit text-[#ff3c00]" />{" "}
                      <span className="text-white">
                        {" "}
                        Connects disruptive startups and SMEs in search of
                        capital.{" "}
                      </span>
                    </li>
                    <li className="flex gap-x-[1rem] ">
                      <BsArrowRightCircle className="text-2xl min-w-fit text-[#ff3c00]" />{" "}
                      <span className="text-white">
                        {" "}
                        Offers Venture Capital and Private Equity prospects via
                        the PZAP token.{" "}
                      </span>
                    </li>
                  </ul>
                </div>
                <div class="lines py-[2rem]">
                  <div class="line"></div>
                </div>

                {/* <div class="btn_wrap">
                  <span className="flex font-[600] items-center justify-end whitespace-nowrap">
                    Join Now{" "}
                    
                    <BsArrowRight className="w-20 h-[20px] mx-[-15px] text-white" />
                  </span>
                  <div class="social-container">
                    <a
                      className="flex items-center social-icon-color  mr-[15px]"
                      href="https://www.facebook.com/pointzap/"
                    >
                      <FontAwesomeIcon
                        className="text-2xl text-[#187DFF]"
                        icon={faFacebook}
                      />
                    </a>
                    <a
                      className="flex items-center mr-[15px]"
                      href="https://twitter.com/point_zap"
                    >
                      <FontAwesomeIcon
                        className="text-2xl text-[#219ff9] social-icon-single"
                        icon={faTwitter}
                      />
                    </a>
                    <a
                      className="flex items-center mr-[15px]"
                      href="https://in.pinterest.com/pointzap/"
                    >
                      <FontAwesomeIcon
                        className="text-2xl text-[#F70102] social-icon-single"
                        icon={faPinterest}
                      />
                    </a>
                  </div>
                </div> */}
                <div className="flex items-center gap-x-4 flex-row">
                  <div className=" w-fit  px-[1rem]">
                    <h1 className="text-[#fff] social-title my-0 font-semibold text-[18px]">
                      Join us now
                    </h1>
                  </div>

                  <div class="follow-company-icon flex m">
                    <a
                      class="social-icon-color flex justify-center "
                      style={{ justifyContent: "center", display: "flex" }}
                      href="https://www.facebook.com/pointzap/"
                    >
                      {" "}
                      <FontAwesomeIcon
                        className=" text-xl flex m-auto"
                        icon={faFacebook}
                      />
                    </a>
                    <a
                      class="social-icon-color1 flex justify-center "
                      style={{ justifyContent: "center", display: "flex" }}
                      href="https://twitter.com/point_zap"
                    >
                      {" "}
                      <FontAwesomeIcon
                        className=" text-xl flex m-auto"
                        icon={faTwitter}
                      />
                    </a>

                    <a
                      class="social-icon-color3 flex justify-center "
                      style={{ justifyContent: "center", display: "flex" }}
                      href="https://in.pinterest.com/pointzap/"
                    >
                      {" "}
                      <FontAwesomeIcon
                        className=" text-xl flex m-auto"
                        icon={faPinterest}
                      />
                    </a>
                  </div>
                </div>
              </div>

              <div className="partner-container">
                <div style={{ overflow: "hidden" }}>
                  <Marquee pauseOnHover autoFill={true} speed={60}>
                    <div className="my-auto" style={{ position: "relative" }}>
                      <div className="image_wrapper  my-auto">
                        <img
                          src="/crypto-image-1.png"
                          alt=""
                          width="150px"
                          height={"150px"}
                        />
                      </div>
                    </div>
                    <div className="my-auto" style={{ position: "relative" }}>
                      <div className="image_wrapper">
                        <img src="/crypto-image-2.png" alt="" width="100px" />
                      </div>
                    </div>
                    <div className="my-auto" style={{ position: "relative" }}>
                      <div className="image_wrapper">
                        <img src="/crypto-image-3.png" alt="" width="100px" />
                      </div>
                    </div>
                    <div className="my-auto" style={{ position: "relative" }}>
                      <div className="image_wrapper">
                        <img src="/crypto-image-4.png" alt="" width="100px" />
                      </div>
                    </div>
                    <div className="my-auto" style={{ position: "relative" }}>
                      <div className="image_wrapper">
                        <img src="/crypto-image-5.png" alt="" width="100px" />
                      </div>
                    </div>
                  </Marquee>
                </div>
              </div>
            </div>

            <div className="part2 font-gilroy p-0 col-lg-5 sm:rounded-xl overflow-hidden col-md-6 col-12 content-sec2 align-self-center text-center right-banner pb-4">
              <div className="join-presale ">
                <div className="row relative overflow-hidden mx-0 bg-[#FF3C00] w-full pt-4 ">
                  <h3 className="font-gilroy-bold presale-title-text font-extrabold text-[24px] md:text-[32px] text-white">
                    Join the Presale
                  </h3>
                  <p className=" whitespace-nowrap ">
                    <span className="italic text-[#fff3df]">Goal:</span>{" "}
                    <span className="font-bold text-[20px] text-[#fff3df] ">
                      {" "}
                      <CountUp end={200000} />{" "}
                      <span className="text-base">USD</span>
                    </span>
                  </p>
                  <div class="preSale-shape">
                    <div class="preSale-thumb1">
                      <img src="/big-dot.png" alt="" />
                    </div>
                  </div>
                </div>
                <div className="px-3">
                  <div className="amount-box flex gap-x-3">
                    <div className="sale-supply">
                      <h6 className="text-black/70 font-semibold md:text-[18px]">
                        Sale Supply
                      </h6>
                      <p className="font-[600]">550 million PZAP</p>
                    </div>
                    <div className="price-per">
                      <h6 className="text-black/70 font-semibold md:text-[18px]">
                        Price Per Token
                      </h6>
                      <p className="font-[600]">0.1300 USD</p>
                    </div>
                  </div>

                  <div class="addToken_button">
                    <button class="btn" onClick={importToken} type="submit">
                      {" "}
                      Add Token{" "}
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center flex-row gap-x-4">
                    <Tilt options={defaultOptions}>
                      <img
                        className="brand-logos"
                        src="/pointzap-logo.png"
                        width={"30px"}
                      />
                    </Tilt>
                    <Tilt options={defaultOptions}>
                      <img
                        className="brand-logos"
                        src="/usdt-logo.png"
                        width={"30px"}
                      />
                    </Tilt>
                    <Tilt options={defaultOptions}>
                      <img
                        className="brand-logos"
                        src="/tron-logo.png"
                        width={"30px"}
                      />
                    </Tilt>
                  </div>

                  <div className="token-text">
                    <div class="chooseToken-title relative ">
                      <h3>
                        {" "}
                        <div className="flex font-semibold mx-auto relative z-10 px-2 bg-[#f5f5f5] w-fit">
                          Choose Token
                        </div>
                      </h3>
                    </div>
                    <div className="token-main-container">
                      {/* <button
                        value="USDC"
                        id="usdc_btn"
                        className="token-select rounded-full"
                        onClick={() => selectToken(1)}
                      >
                        <img src="token1.png" alt="" width="18px" />{" "}
                        <span style={{ fontSize: "0.8rem" }}>USDC TRC20</span>
                      </button> */}

                      <button
                        value="USDT"
                        id="usdt_btn"
                        className="token-select rounded-full"
                        // onClick={() => selectToken(2)}
                      >
                        <img src="token3.png" alt="" width="18px" />{" "}
                        <span style={{ fontSize: "0.8rem" }}>USDT TRC20</span>
                      </button>
                    </div>
                  </div>

                  <div className="amount-box flex flex-col md:flex-row gap-y-4 mt-[1rem]">
                    <div className="enter-amount w-full md:w-[45%]">
                      <label
                        className="font-[700] lg:text-[16px] text-black/70"
                        htmlFor=""
                      >
                        Enter Amount
                      </label>
                      {/* <input type="text" className="bottom-border" /> */}

                      <div class="form_box ">
                        <input
                          type="number"
                          id="amount_record"
                          placeholder="0"
                          name="name"
                          value={usdtAmount}
                          onChange={handleAmountChange}
                        />
                      </div>

                      <div
                        className="amount_record_error"
                        style={{ color: "#d01212" }}
                      ></div>
                    </div>
                    <div className="token-cong w-full md:w-[45%]">
                      <label
                        className="font-[700] lg:text-[16px] text-black/70"
                        htmlFor=""
                      >
                        PZAP Tokens
                      </label>
                      {/* <input type="text" className="bottom-border" /> */}
                      <div class="form_box">
                        <input
                          type="text"
                          name="name"
                          placeholder="Name*"
                          value={calculateTokenAmount()}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="connect-now">
                    <div className="connect-now-text">
                      <p className="text-sm font-semibold">
                        Please click the button twice. <br /> First time to
                        approve and second time to buy.
                      </p>
                    </div>
                    <div class="addToken_button w-[40%]">
                      <button
                        class="btn"
                        data-id=""
                        id="approve_connect_btn"
                        onClick={handleButtonClick}
                        type="submit"
                      >
                        {isApproved ? "Buy Now" : "Approve"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid" id="">
        <div className="top-header-shape"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12"></div>
            <div className="col-lg-6 col-md-6 col-12"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
