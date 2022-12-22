import { useState } from 'react';
import { Header, Container, Group, Burger, Paper, Transition, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import useStyles from './CustomHeader.styles';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

  interface LinkProps {
    label: string;
    link: string;
    isLoggedin : boolean
  }

  const HEADER_HEIGHT = 84;
  
  export function CustomHeader() {
    const { data: session, status } = useSession()

    const links : LinkProps[] = [
      {
        label : "Masuk",
        link: "/login",
        isLoggedin: false
      },
      {
        label : "Daftar",
        link: "/register",
        isLoggedin: false
      },
      {
        label : "Dashboard",
        link: "/user",
        isLoggedin: true
      },
      {
        label : "Keluar",
        link: "/logout",
        isLoggedin: true
      }
    ]

    const router = useRouter()
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(links[0].link);
    const { classes, cx } = useStyles();
  
    const items = links.map((link) => (
      <a
        key={link.label}
        href={link.link}
        className={cx(classes.link, { [classes.linkActive]: router.pathname === link.link })}
        onClick={(event) => {
          event.preventDefault();
          close();
          link.label === "Keluar" ? signOut({ callbackUrl: '/login' }) : router.push(link.link);
        }}
        style={{display: link.isLoggedin == (status === "authenticated") ? 'block' : 'none' }}
      >
        { link.label }
      </a>
    ));
  
    return (
      <Header height={HEADER_HEIGHT} mb={120} className={classes.root}>
        <Container className={classes.header}>
        <a
          onClick={(event) => {
            event.preventDefault();
            close();
            router.push("/","_self");
          }}
        >
          <Text size="xl" weight={700}>Sukma Game</Text>
        </a>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
  
          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
  
          <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
        </Container>
      </Header>
    );
  }