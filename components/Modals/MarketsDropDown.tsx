import React from 'react';
import * as IoIcons from 'react-icons/io5';
import * as St from './MarketsDropDown.styled';

interface Props {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MarketsDropDown: React.FC<Props> = ({ setShowModal }) => {
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <St.DropDownContainer>
        <St.TopButtonContainer>
          <IoIcons.IoCaretUpCircleOutline
            className="up-arrow"
            onClick={handleCloseModal}
          />
          <a
            href="https://testnets.opensea.io/collection/chainlife"
            target="_blank"
            rel="noreferrer"
          >
            <St.Button id="opensea">OPENSEA</St.Button>
          </a>
        </St.TopButtonContainer>
        <a
          href="https://goerli.looksrare.org/collections/0x04c9E99D134565eB0F0Fef07FB70741A5b615075"
          target="_blank"
          rel="noreferrer"
        >
          <St.Button>LOOKSRARE</St.Button>
        </a>
        <a
          href="https://goerli.x2y2.io/collection/0x04c9E99D134565eB0F0Fef07FB70741A5b615075/items"
          target="_blank"
          rel="noreferrer"
        >
          <St.Button>X2Y2</St.Button>
        </a>
        {/* <a href="https://artacle.io" target="_blank" rel="noreferrer">
          <St.Button id="coinbase">ARTACLE</St.Button>
        </a> */}
      </St.DropDownContainer>
    </>
  );
};

export default MarketsDropDown;
