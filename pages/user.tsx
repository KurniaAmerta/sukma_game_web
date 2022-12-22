import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { UserNavbar } from '../components/UserNavbar/UserNavbar';
import { Center, Container, AppShell, Space, Avatar, Button, Alert, Grid  } from '@mantine/core';
import React from "react";
import { IconAlertCircle } from '@tabler/icons';
import { CustomFooter } from '../components/CustomFooter/CustomFooter';

export default function HomePage() {
    
  return (
    <>
        <CustomHeader/>
        <Grid gutter="xs">
            <Grid.Col md={12} lg={3}>
                <UserNavbar/>
            </Grid.Col>
            <Grid.Col md={12} lg={6}>
                <Center>
                    <Avatar radius="xl" size="xl" />
                </Center>
                <Space h="xl" />
                <Container>
                    <Center>
                        <Button component='a' target="_blank" href="user/avatar" >Lihat Avatar Saya</Button>
                    </Center>
                </Container>
                <Space h="xl" />
                <Container>
                    <Alert icon={<IconAlertCircle size={16} />} title="Avatar!">
                        Kamu dapat mengubah avatarmu saat bermain nanti, ada berbagai jenis pilihan untuk mengubah avarmu. Mulai dari rambut, pakaian, dan sebagainya.
                        Ayo buat avatarmu terlihat berbeda!
                    </Alert>
                </Container>
            </Grid.Col>
        </Grid>
        <CustomFooter/>
    </>
  );
}