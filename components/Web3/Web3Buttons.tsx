import React, { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useEagerConnect } from 'hooks/useEagerConnect';
import { useMintDetails } from 'hooks/useMintDetails';
import { useContract } from 'hooks/useContract';
import { publicMint, presaleMint, ISuccessInfo } from './web3Helpers';
import ConnectModal from 'components/Modals/ConnectModal';
import BuyModal from 'components/Modals/BuyModal';
import ErrorModal from 'components/Modals/ErrorModal';
import SuccessModal from 'components/Modals/SuccessModal';
import * as St from '../Hero/Hero.styled';

const Web3Buttons: React.FC = () => {
  useEagerConnect();
  const { active, account } = useWeb3React();
  const { isPreSale, mintPrice, maxSupply, isMintLive } = useMintDetails();
  const { goerliContract } = useContract();

  const [showConnectModal, setShowConnectModal] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState<ISuccessInfo>();

  const [cryptoButtonText, setCryptoButtonText] = useState('CONNECT WALLET');
  const [buyButtonText, setBuyButtonText] = useState('MINT WITH CRYPTO');

  const handleError = (error: string) => {
    setErrorMessage(error);
    setShowErrorModal(true);
  };

  const handleCryptoClick = async () => {
    if (!isMintLive) {
      return handleError('MINT IS NOT LIVE YET');
    }
    if (!active) {
      setShowConnectModal(!showConnectModal);
    } else if (isPreSale) {
      handleError('MUST BE ALLOWLISTED TO MINT DURING PRESALE');
    } else {
      setBuyButtonText('MINT WITH CRYPTO');
      setShowBuyModal(true);
    }
  };

  const handleCryptoMint = async () => {
    const payableAmount = mintPrice;
    const projectNumber = 34;
    const tokenNumber = 1;
    const toAddress = '';

    try {
      if (isPreSale) {
        presaleMint(
          goerliContract,
          maxSupply,
          account as string,
          payableAmount,
          projectNumber,
          tokenNumber,
          handleError,
          handleSuccess,
          setBuyButtonText,
          setShowBuyModal,
        );
      } else {
        publicMint(
          goerliContract,
          maxSupply,
          account as string,
          payableAmount,
          toAddress,
          handleError,
          handleSuccess,
          setBuyButtonText,
          setShowBuyModal,
        );
      }
    } catch (err) {
      console.error(err);
      handleError('Error minting token');
    }
  };

  const handleSuccess = (successInfo: ISuccessInfo) => {
    setSuccessInfo(successInfo);
    setShowSuccessModal(true);
  };

  const closeAllModals = () => {
    setShowConnectModal(false);
    setShowBuyModal(false);
    setShowErrorModal(false);
    setShowSuccessModal(false);
  };

  useEffect(() => {
    if (active) {
      setCryptoButtonText('MINT');
      setTimeout(() => {
        setShowConnectModal(false);
      }, 2000);
    }

    if (!active) {
      setCryptoButtonText('CONNECT WALLET');
      closeAllModals();
    }
  }, [active]);

  return (
    <St.ButtonContainer>
      <St.Button onClick={handleCryptoClick}>{cryptoButtonText}</St.Button>

      {showConnectModal && <ConnectModal setShowModal={setShowConnectModal} />}

      {showBuyModal && (
        <BuyModal
          setShowModal={setShowBuyModal}
          handleCryptoMint={handleCryptoMint}
          handleError={handleError}
          buyButtonText={buyButtonText}
        />
      )}

      {showErrorModal && (
        <ErrorModal setShowModal={setShowErrorModal} message={errorMessage} />
      )}

      {showSuccessModal && (
        <SuccessModal
          setShowModal={setShowSuccessModal}
          successInfo={successInfo as ISuccessInfo}
        />
      )}
    </St.ButtonContainer>
  );
};

export default Web3Buttons;
