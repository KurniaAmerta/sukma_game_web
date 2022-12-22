import { CustomHeader } from '../../components/CustomHeader/CustomHeader';
import { UserNavbar } from '../../components/UserNavbar/UserNavbar';
import { Center, Container, AppShell, Space, Avatar, Button, Alert, Grid, Table, Text } from '@mantine/core';
import React from "react";
import { IconAlertCircle } from '@tabler/icons';
import { CustomFooter } from '../../components/CustomFooter/CustomFooter';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSession } from "next-auth/react"
import { PDFFile } from '../../components/pdf/PDFComponent';
import { PDFDownloadLink } from "@react-pdf/renderer";

export default function HomePage() {
    const [dataElement, setDataElement] = useState<any>();
    const { data: session } = useSession()
    // const dataElement = useRef<any>();
    //let dataElement:any;

    // if(typeof window !== "undefined") DataElement();

    function DataElement(){
        if(dataElement || window === undefined) return;

        let username = session?.user?.name;

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

        axios(config)
          .then(function (response) {
            console.log(response.data);
            
            let elementsData = [];
            let indexData = 0;

            for(var i=0; i<response.data.length; i++){
                let index = elementsData.findIndex(x => 
                    x.tipe == response.data[i].tipe && 
                    x.level == response.data[i].level &&
                    x.jumlah == response.data[i].jumlah);
                if(index == -1 && response.data[i].winner && response.data[i].winner[0] === username){
                    indexData++;
                    
                    let namaMain = "";

                    switch(Number(response.data[i].tipe)){
                        case 1:
                            namaMain = "Lomba lari hero";
                            break;
                        case 2:
                            namaMain = "Panjatan hero";
                            break;
                        case 3:
                            namaMain = "Panahan hero";
                            break;
                        case 4:
                            namaMain = "Tebasan hero";
                            break;
                        case 5:
                            namaMain = "Pukulan hero";
                            break;
                    }

                    let data = {
                        "no": indexData,
                        "name": namaMain,
                        "jumlah":response.data[i].jumlah,
                        "tipe":response.data[i].tipe,
                        "level": response.data[i].level,
                    }
                    elementsData.push(data);
                }
            }
        
            const rows = elementsData.map((element) => (
            <tr key={element.no}>
                <td>{element.no}</td>
                <td>{element.name}</td>
                <td>{element.jumlah}</td>
                <td>{element.level}</td>
                <td>
                    <PDFDownloadLink document={<PDFFile name={username} game={element.name} jumlah={element.jumlah} level={element.jumlah} />} fileName={element.name+"_"+username}>
                        {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
                    </PDFDownloadLink>
                </td>
            </tr>
            ));
    
            setDataElement(rows);
            // dataElement.current = rows;
            // dataElement = rows;
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    useEffect(() => {
        DataElement();
    }, []);

  return (
    <>
        <CustomHeader/>
        <Grid gutter="xs">
            <Grid.Col md={12} lg={3}>
                <UserNavbar/>
            </Grid.Col>
            <Grid.Col md={12} lg={9}>
                <Table>
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Permainan</th>
                        <th>Jumlah Permainan</th>
                        <th>Level</th>
                        <th>Unduh Sertifikat</th>
                    </tr>
                    </thead>
                    <tbody>{dataElement}</tbody>
                </Table>
            </Grid.Col>
        </Grid>
        <CustomFooter/>
    </>
  );
}