import { Button, Center, Container, Space, Text ,LoadingOverlay, ActionIcon } from "@mantine/core";
import { Unity, useUnityContext, IUnityProps } from "react-unity-webgl";
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { useSession } from "next-auth/react"
import React, { useState } from 'react'
import { SpeakerOffIcon, SpeakerLoudIcon } from '@modulz/radix-icons';

export default function App() {
    const [active, setActive] = useState(false);
    const [mute, setMute] = useState(true);
    const { data: session } = useSession()

    const { unityProvider, sendMessage, isLoaded} = useUnityContext({
        loaderUrl: "/gaame1/Build/gaame1.loader.js",
        dataUrl: "/gaame1/Build/gaame1.data",
        frameworkUrl: "/gaame1/Build/gaame1.framework.js",
        codeUrl: "/gaame1/Build/gaame1.wasm",
    });

    function SetUsername(username : any){
        console.log("setusername", username);
        sendMessage("DataManager", "SetUsername", username)
        sendMessage("Starter", "StartGame", 0)
    }

    if(!active && isLoaded){
        SetUsername(session?.user?.name);
        setActive(true);
    }

    function SetSound(){
        setMute(!mute);

        let isMute : string  = mute ? "muted" : "";

        sendMessage("DataManager", "SetSound", isMute);
    }

    return (
        <>
            <Container>
                <ColorSchemeToggle/>
            </Container>
            <Space h="lg" />
            <Container>
                <Center>
                    <Text>Login sebagai {session?.user?.name}</Text>
                </Center>
                <Center>
                    <ActionIcon color="blue" size="lg" variant="filled">
                        {
                            mute ?
                            <SpeakerOffIcon width={20} height={20} onClick={SetSound} />
                            :
                            <SpeakerLoudIcon width={20} height={20} onClick={SetSound} />
                        }
                    </ActionIcon>
                </Center>
            </Container>
            <img
                src="/gameImg/ukiran.png"
                alt="game"
                style={{left:"auto", width:"30%"}}
            />
            <Center>
                
                {isLoaded === false && (
                    // We'll conditionally render the loading overlay if the Unity
                    // Application is not loaded.
                    <LoadingOverlay visible={true} overlayBlur={2} />
                )}
                <Unity unityProvider={unityProvider} style={{ width: 960, height: 540 }} />
            </Center>
            <img
                src="/gameImg/ukiranDown.png"
                alt="game"
                style={{marginLeft:"auto", width:"30%", display:"-webkit-box"}}
            />
        </>
    );
}