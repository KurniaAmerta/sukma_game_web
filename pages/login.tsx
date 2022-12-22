import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Button, Container, TextInput, PasswordInput, Center, Title } from '@mantine/core';
import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import { InferGetStaticPropsType, GetServerSideProps } from 'next';
import { getCsrfToken } from "next-auth/react";
import { CustomFooter } from '../components/CustomFooter/CustomFooter';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { Space  } from '@mantine/core';

export default function InputTooltip({ csrfToken  } : InferGetStaticPropsType<typeof getServerSideProps>) {
  const form = useForm({
      initialValues: {username: '', password: ''},

      // functions will be used to validate values at corresponding key
      validate: {
          username: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
          password: (value) => (value.length < 6 ? 'Name must have at least 6 letters' : null),
      },
  }); 
  
  const [openedPass, setOpenedPass] = useState(false);

  return (
    <>
      <CustomHeader/>
      {/* <Welcome/> */}
      {/* <ColorSchemeToggle/> */}
      <Container size={500}>
      <Center style={{ bottom:100 }}>
        <Title order={1}>Login</Title>
      </Center>
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <TextInput required label="Username" placeholder="Username" name="username" {...form.getInputProps('username')} />
          <PasswordInput
            label="Password"
            required
            placeholder="Your password"
            onFocus={() => setOpenedPass(true)}
            onBlur={() => setOpenedPass(false)}
            mt="md"
            name="password"
            {...form.getInputProps('password')}
          />
          <Center style={{ height: 100 }}>
              <Button type="submit">
                  Login
              </Button>
          </Center>
        </form>
      </Container>
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