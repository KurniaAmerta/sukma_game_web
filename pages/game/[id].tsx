import { useState } from 'react';
import { useRouter } from 'next/router'
import { Button, Container, Center, LoadingOverlay, Flex, Image } from '@mantine/core';
import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { InferGetStaticPropsType, GetServerSideProps } from 'next';
import { getCsrfToken } from "next-auth/react";
import { CustomFooter } from '../../components/CustomFooter/CustomFooter';
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../../components/Welcome/Welcome';
import { Space  } from '@mantine/core';
import { Unity, useUnityContext, IUnityProps } from "react-unity-webgl";

export default function InputTooltip({ csrfToken  } : InferGetStaticPropsType<typeof getServerSideProps>) {
  const router = useRouter()
  const { id } = router.query

  const { unityProvider, sendMessage, isLoaded} = useUnityContext({
    loaderUrl: "/gaame1/Build/gaame1.loader.js",
    dataUrl: "/gaame1/Build/gaame1.data",
    frameworkUrl: "/gaame1/Build/gaame1.framework.js",
    codeUrl: "/gaame1/Build/gaame1.wasm",
  });

  function Play(){
    console.log("id:", Number(id));
    sendMessage("Starter", "StartGame", Number(id))
  }

  return (
    <>
      <CustomHeader/>
      {/* <Welcome/> */}
      {/* <ColorSchemeToggle/> */}
      <Container size={500}>
        <Center style={{ bottom:100 }}>
          <Button
              onClick={Play}
          >
              Play Game
          </Button>
        </Center>
      </Container>
      <img
        src="/gameImg/ukiran.png"
        alt="game"
        style={{left:"auto", width:"30%"}}
      />
      <Container size={500}>
        <Center> 
          {isLoaded === false && (
              // We'll conditionally render the loading overlay if the Unity
              // Application is not loaded.
              <LoadingOverlay visible={true} overlayBlur={2} />
          )}
          <Unity unityProvider={unityProvider} style={{ width: 960, height: 540 }} />
        </Center>
      </Container>
      <img
          src="/gameImg/ukiranDown.png"
          alt="game"
          style={{marginLeft:"auto", width:"30%", display:"-webkit-box"}}
        />
      <Space h={100} />
      <CustomFooter/>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}