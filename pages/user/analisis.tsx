import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { UserNavbar } from '../../components/UserNavbar/UserNavbar';
import { Center, Container, AppShell, Space, Avatar, Button, Alert, Grid  } from '@mantine/core';
import React from "react";
import { IconAlertCircle } from '@tabler/icons';
import { CustomFooter } from '../../components/CustomFooter/CustomFooter';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { useSession } from "next-auth/react"
import axios from 'axios';

export default function HomePage() {

    const [peringkat, setPeringkat] = useState<any>([]);
    const { data: session } = useSession()

    function ChoosePeringkat(event: any, index:number){
        event.preventDefault();

        console.log("peringkat", index);

        let username = session?.user?.name;

        console.log(username);

        var data = JSON.stringify({
            "username"  : username,
          });
          
          var config = {
            method: 'post',
            url: window.location.origin+'/api/user/get_analisis',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };

          let allData = [0,0,0,0];
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            for(var i=0; i<response.data.length; i++){
                
                if((index == 0 || response.data[i].tipe == index) && response.data[i].winner){
                    let indexWinner = 0;
                    for(var j =0; j<response.data[i].winner.length; j++){
                        if(response.data[i].winner[j]===username){ 
                            indexWinner = j;
                            break;
                        }
                    }
                    allData[indexWinner]++;
                }
            }

            let datas = [
                {
                    "Peringkat 1": allData[0],
                    "Peringkat 2": allData[1],
                    "Peringkat 3": allData[2],
                    "Peringkat 4": allData[3],
                },
            ]

            setPeringkat(datas);

          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
  return (
    <>
        <CustomHeader/>
        <Grid gutter="xs">
            <Grid.Col md={12} lg={3}>
                <UserNavbar/>
            </Grid.Col>
            
            <Grid.Col md={12} lg={9}>
                <Container>
                    <Center>
                        <Grid grow gutter="xl" justify="center" align="center">
                            <Grid.Col md={12} lg={1}>
                                <Button onClick={(event :any) => { ChoosePeringkat(event, 0) }} >
                                    Seluruh Permainan
                                </Button>
                            </Grid.Col>
                            <Grid.Col md={12} lg={1}>
                                <Button onClick={(event :any) => { ChoosePeringkat(event, 1) }} >
                                    Lomba lari hero
                                </Button>
                            </Grid.Col>
                            <Grid.Col md={12} lg={1}>
                                <Button onClick={(event :any) => { ChoosePeringkat(event, 2) }}>
                                    Panjatan hero
                                </Button>
                            </Grid.Col>
                            <Grid.Col md={12} lg={1}>
                                <Button onClick={(event :any) => { ChoosePeringkat(event, 3) }}>
                                    Panahan hero
                                </Button>
                            </Grid.Col>
                            <Grid.Col md={12} lg={1}>
                                <Button onClick={(event :any) => { ChoosePeringkat(event, 4) }}>
                                    Tebasan hero
                                </Button>
                            </Grid.Col>
                            <Grid.Col md={12} lg={1}>
                                <Button onClick={(event :any) => { ChoosePeringkat(event, 5) }}>
                                    Pukulan hero
                                </Button>
                            </Grid.Col>
                        </Grid>
                    </Center>
                    <Space h={100} />
                    <ResponsiveContainer width="100%" height="100%">
                        <Center>
                            <BarChart
                                width={500}
                                height={300}
                                data={peringkat}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Peringkat 1" fill="#8884d8" />
                                <Bar dataKey="Peringkat 2" fill="#82ca9d" />
                                <Bar dataKey="Peringkat 3" fill="#FDDA0D" />
                                <Bar dataKey="Peringkat 4" fill="#FF5733" />
                            </BarChart>
                        </Center>
                    </ResponsiveContainer>
                </Container>
            </Grid.Col>
        </Grid>
        <CustomFooter/>
    </>
  );
}