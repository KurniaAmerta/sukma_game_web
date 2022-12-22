import { Welcome } from '../components/Welcome/Welcome';
import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { CustomFooter } from '../components/CustomFooter/CustomFooter';
import { ListGame } from '../components/ListGame/ListGame';
import { Faq } from '../components/Faq/Faq';
import {CardCustom}  from '../components/Card/CardCustom';
import { Center, Container, Grid, Button, Space  } from '@mantine/core';

export default function HomePage() {
  return (
    <>
      <CustomHeader />
      <Welcome />
      <ColorSchemeToggle />
      <Container size={2000}>
        <ListGame/>

      </Container>
      <Container size={1800}>
        <Center>
          <Grid grow gutter="xl">
            <Grid.Col md={6} lg={4}>
              <CardCustom id={1} name={"Lomba Lari Hero"} />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <CardCustom id={2} name={"Panjatan Hero"} />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <CardCustom id={3} name={"Panahan Hero"} />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <CardCustom id={4} name={"Tebasan Hero"} />
            </Grid.Col>
            <Grid.Col md={6} lg={4}>
              <CardCustom id={5} name={"Pukulan Hero"} />
            </Grid.Col>
          </Grid>
        </Center>
      </Container>
      <Space h={100} />
      <Space h="xl" />
      {/* <Faq/> */}
      <CustomFooter />
    </>
  );
}