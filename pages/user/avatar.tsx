import { Button, Center, Container, Space, Text, LoadingOverlay, ActionIcon } from "@mantine/core";
import dynamic from 'next/dynamic'
import { Unity, useUnityContext, IUnityProps } from "react-unity-webgl";
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle/ColorSchemeToggle';
import { useSession } from "next-auth/react"
import React, { useState } from 'react'
import { SpeakerOffIcon, SpeakerLoudIcon } from '@modulz/radix-icons';

export default function App() {
    const [active, setActive] = useState(false);
    const { data: session } = useSession()
    const [mute, setMute] = useState(true);

    const { unityProvider, sendMessage, isLoaded } = useUnityContext({
        loaderUrl: "/avatar/Build/avatar.loader.js",
        dataUrl: "/avatar/Build/avatar.data",
        frameworkUrl: "/avatar/Build/avatar.framework.js",
        codeUrl: "/avatar/Build/avatar.wasm",
    });

    function SetUsername(username : any){
        console.log("setusername", username);
        sendMessage("DataManager", "SetUsername", username)
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