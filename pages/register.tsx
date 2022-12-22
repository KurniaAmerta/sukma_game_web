import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Button, Container, TextInput, PasswordInput, Tooltip, Center, Text, Title } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons';
import { CustomHeader } from '../components/CustomHeader/CustomHeader';
import axios from 'axios';
import { useRouter } from 'next/router'
import { CustomFooter } from '../components/CustomFooter/CustomFooter';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { Space  } from '@mantine/core';

export default function InputTooltip() {
  const rightSection = (
    <Tooltip
      label="We store your data securely"
      position="top-end"
      withArrow
      transition="pop-bottom-right"
    >
      <Text color="dimmed" sx={{ cursor: 'help' }}>
        <Center>
          <IconInfoCircle size={18} stroke={1.5} />
        </Center>
      </Text>
    </Tooltip>
  );

  const form = useForm({
      initialValues: { username: '', email: '', password: '', passwordConf: ''},

      // functions will be used to validate values at corresponding key
      validate: {
          username: (value) => (value.length < 2 ? 'Name must have at least 2 letters' : null),
          email: (value) => (/^\S+@\S+$/.test(value) || value == "" ? null : 'Invalid email'),
          password: (value) => (value.length < 6 ? 'Name must have at least 6 letters' : null),
          passwordConf: (value, values) => value !== values.password ? 'Passwords did not match' : null,
      },
  }); 
  
  const [openedPass, setOpenedPass] = useState(false);
  const [openedConfPass, setOpenedConfPass] = useState(false);
  const router = useRouter()

  async function Register(values : any){
    try {
      const { data } = await axios.post('/api/register', values);
      if(data === "User created"){ 
        router.push("/login");
      }else{
        console.log("error register:",data);
      }
    } catch (error) {
      console.log("error register:",error);
    }
  }

  return (
    <>
      <CustomHeader/>
      {/* <Welcome/> */}
      {/* <ColorSchemeToggle/> */}
      <Center style={{ bottom:100 }}>
        <Title order={1}>Register</Title>
      </Center>
      <Container size={500}>
        <form onSubmit={form.onSubmit((values) => { Register(values) })}>
          <TextInput required label="Username" placeholder="Username" name="username" {...form.getInputProps('username')} />
          <TextInput 
            rightSection={rightSection}
            mt="sm" label="Email" placeholder="Email" name="email" {...form.getInputProps('email')} 
          />
          <PasswordInput
            label="Password"
            required
            placeholder="Your password"
            onFocus={() => setOpenedPass(true)}
            onBlur={() => setOpenedPass(false)}
            mt="md"
            name = "password"
            {...form.getInputProps('password')}
          />
          <PasswordInput
            label="Confirm Password"
            required
            placeholder="Your confirmation password"
            onFocus={() => setOpenedConfPass(true)}
            onBlur={() => setOpenedConfPass(false)}
            mt="md"
            name = "confirmPassword"
            {...form.getInputProps('passwordConf')}
          />
          <Center style={{ height: 100 }}>
              <Button type="submit">
                  Register
              </Button>
          </Center>
        </form>
      </Container>
      <Space h={100} />
      <CustomFooter/>
    </>
  );
}