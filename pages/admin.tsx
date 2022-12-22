import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { UserNavbar } from '../components/UserNavbar/UserNavbar';
import { CustomFooter } from '../components/CustomFooter/CustomFooter';
import { NotFoundTitle } from '../components/404/404';
import { Center, Container, AppShell, Space, Text, Button, Select, NumberInput, Table } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React, { useState } from "react";
import { useSession } from "next-auth/react"
import axios from 'axios';

export default function HomePage() {
    const [dateRoom, setDateRoom] = useState("");
    const [elements, setElements] = useState([]);
    const { data: session } = useSession()

    async function GenerateRoom(formValue:any){
        
        let values = {
            username: session?.user?.name,
            jumlah: Number(formValue.jumlah),
            tipe: Number(formValue.tipe),
            level: Number(formValue.level),
            room: formValue.room,
            dateRoom: Number(formValue.dateRoom)
        }

        console.log("generate room", values);

        const { data } = await axios.post('/api/admin/generate_room', values);
        if(data.id){ 
            setElements(data.id);
            let dateExp = new Date(data.date);
            setDateRoom(dateExp.toDateString());
        }else{
            console.log("error register:",data);
        }
    }

    const rows = elements.map((element) => (
        <tr key={element}>
          <td>{element}</td>
        </tr>
      ));

    const date = new Date();

    const formRoom = useForm({
        initialValues: {
          jumlah: '',
          tipe: '',
          level: '',
          room: 1,
          dateRoom: null
        },
    
        validate: {
          jumlah: (value) => (value ? null : 'Jumlah pemain tidak valid'),
          tipe: (value) => (value ? null : 'Tipe permainan tidak valid'),
          level: (value) => (value ? null : 'Level permainan tidak valid'),
          room: (value) => (value <= 0 ? 'Jumlah room minimal 1' : value > 10 ? 'Jumlah room maksimal 10' : null),
          dateRoom : (value) => (value ? null : 'Date room tidak valid'),
        },
    });
    
    return (
        <>
            { session?.user?.name === "admin" 
                ?
                <>
                <CustomHeader/>
                    <AppShell
                        padding="md"
                        navbar={<UserNavbar/>}
                        >
                        <Container>
                            <ColorSchemeToggle/>
                        </Container>
                        <Space h="md" />
                        <Container>
                            <Center>
                                <Text>Login sebagai {session?.user?.name}</Text>
                            </Center>
                        </Container>
                        <Space h="xl" />
                        <Container>
                            <Center>
                                <form onSubmit={formRoom.onSubmit((values) => GenerateRoom(values))}>
                                <Select
                                    label="Jumlah Pemain"
                                    placeholder="Pilih salah satu"
                                    searchable
                                    nothingFound="Opsi tidak ditemukan"
                                    data={[
                                        { value: '2', label: '2 Pemain' },
                                        { value: '3', label: '3 Pemain' },
                                        { value: '4', label: '4 Pemain' },
                                    ]}
                                    {...formRoom.getInputProps('jumlah')}
                                />
                                <Space h="md" />
                                <Select
                                    label="Tipe Permainan"
                                    placeholder="Pilih salah satu"
                                    searchable
                                    nothingFound="Opsi tidak ditemukan"
                                    data={[
                                        { value: '1', label: 'Lomba lari hero' },
                                        { value: '3', label: 'Panahan hero' },
                                        { value: '4', label: 'Tebasan hero' },
                                        { value: '5', label: 'Pukulan hero' },
                                        { value: '2', label: 'Panjatan hero' },
                                    ]}
                                    {...formRoom.getInputProps('tipe')}
                                />
                                <Space h="md" />
                                <Select
                                    label="Level Kesulitan"
                                    placeholder="Pilih salah satu"
                                    searchable
                                    nothingFound="Opsi tidak ditemukan"
                                    data={[
                                        { value: '1', label: 'Level 1' },
                                        { value: '2', label: 'Level 2' },
                                        { value: '3', label: 'Level 3' },
                                    ]}
                                    {...formRoom.getInputProps('level')}
                                />
                                <Space h="md" />
                                <NumberInput
                                    defaultValue={1}
                                    placeholder="Jumlah room"
                                    label="Jumlah room"
                                    {...formRoom.getInputProps('room')}
                                />
                                <Space h="md" />
                                <text>Room expired</text>
                                <DatePicker 
                                    placeholder="Pilih waktu room expired"
                                    minDate = { new Date( date.setDate(date.getDate() + 1) )}
                                    {...formRoom.getInputProps('dateRoom')}
                                />
                                <Space h="xl" />
                                <Button type="submit">Generate Room Name</Button>
                                </form>
                            </Center>
                        </Container>
                        {
                            dateRoom ? 
                            <Container>
                                <Center>
                                    <Text size={20}>
                                        Date expired
                                    </Text>
                                    <Text size={30}>
                                        {  dateRoom }
                                    </Text>
                                </Center>
                                    <Table>
                                        <thead>
                                            <tr>
                                            <th>Id Room</th>
                                            </tr>
                                        </thead>
                                        <tbody>{rows}</tbody>
                                    </Table>
                                <Center>
                                </Center>
                            </Container>
                            :
                            null
                        }
                    </AppShell>
                    <CustomFooter/>
                    </>
                :
                <NotFoundTitle/>
            }
        </>
    );

}