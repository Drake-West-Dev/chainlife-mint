/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import NavBar from 'components/NavBar/NavBar';
import DescriptionSections from 'components/DescriptionSections/DescriptionSections';
import Slider from 'components/Slider/Slider';
import Web3Buttons from 'components/Web3/Web3Buttons';
import { useMintDetails } from 'hooks/useMintDetails';
import { useWindowSize } from 'hooks/useWindowSize';
import { getGeneratorUrl, getSliderThumbnails } from 'utils/getRandomToken';
import * as St from '../styles/mint.styles';

type Token = { genUrl: string; thumbUrl?: string; id: number };

const Home: NextPage = () => {
  const { maxSupply, currentSupply } = useMintDetails();
  const { windowWidth } = useWindowSize();

  const [sliderTokens, setSliderTokens] = useState<Token[]>([]);
  const [activeToken, setActiveToken] = useState<Token>();

  useEffect(() => {
    if (currentSupply) {
      setSliderTokens(getSliderThumbnails(currentSupply));
      const { generatorUrl, thumbNailUrl, tokenId } = getGeneratorUrl(currentSupply);
      setActiveToken({ genUrl: generatorUrl, thumbUrl: thumbNailUrl, id: tokenId });
    }
  }, [currentSupply]);

  return (
    <St.AppContainer>
      <Head>
        <title>Chainlife</title>
        <meta name="description" content="Chainlife." />
      </Head>

      <>
        <NavBar />
        <St.BodyContainer>
          <St.SliderAndIframeContainer>
            {windowWidth > 1000 ? (
              <Slider>
                {sliderTokens.map((token) => (
                  <div
                    key={token.id}
                    className="tool"
                    data-tip={`Chainlife # ${token.id}`}
                    onClick={() => setActiveToken({ genUrl: token.genUrl, id: token.id })}
                  >
                    <img src={token.thumbUrl} alt="nft" />
                  </div>
                ))}
              </Slider>
            ) : null}
            <St.LeftSection>
              <St.TitleAnCryptoContainer>
                <St.TitleContainer>
                  <St.Title>
                    {currentSupply
                      ? `${currentSupply} of ${maxSupply} minted`
                      : `${maxSupply} max supply.`}
                  </St.Title>
                  {activeToken && (
                    <St.SubTitle>Showing Chainlife # {activeToken.id}</St.SubTitle>
                  )}
                </St.TitleContainer>
                {windowWidth > 750 ? <Web3Buttons /> : null}
              </St.TitleAnCryptoContainer>
              {activeToken && (
                <iframe
                  height={
                    windowWidth > 750
                      ? '650'
                      : windowWidth >= 412
                      ? '412'
                      : windowWidth >= 390
                      ? '390'
                      : '360'
                  }
                  width={windowWidth > 750 ? '650' : '390'}
                  src={activeToken.genUrl}
                  title="generator"
                  frameBorder="0"
                ></iframe>
              )}
              <St.InfoContainer>
                {windowWidth < 750 ? <Web3Buttons /> : null}
                <St.InfoText>
                  Chainlife NFTs are on-chain, generative-art, collectible and evolving
                  games, that together create an everchanging, 3D world.
                </St.InfoText>
              </St.InfoContainer>
            </St.LeftSection>
          </St.SliderAndIframeContainer>
          <St.DescriptionsContainer>
            <DescriptionSections />
          </St.DescriptionsContainer>
        </St.BodyContainer>
      </>
    </St.AppContainer>
  );
};

export default Home;
