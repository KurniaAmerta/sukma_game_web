import { Navbar, Group, Text, ScrollArea, createStyles } from '@mantine/core';
import {
  IconDeviceGamepad,
  IconGauge,
  IconPresentationAnalytics,
  IconArticle
} from '@tabler/icons';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import useStyles from './UserNavbar.styles';
import { useSession } from "next-auth/react"
import { ColorSchemeToggle } from '../ColorSchemeToggle/ColorSchemeToggle';

export function UserNavbar() {
const mockdata = [
    { 
      label: 'Dashboard', 
      links: '/user',
      icon: IconGauge, 
    },
    {
      label: 'Permainan',
      links: '/user/room',
      icon: IconDeviceGamepad,
    },
    { 
      label: 'Analisis', 
      links: '/user/analisis',
      icon: IconPresentationAnalytics 
    },
    { 
      label: 'Sertifikat', 
      links: '/user/sertifikat',
      icon:  IconArticle
    },
];

const { data: session } = useSession()

    const { classes } = useStyles();
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
  
    return (
      <>
        <Navbar height={450} width={{ sm: 300 }} p="md" className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group position="apart">
              <Text fw={700}>Menu Utama</Text>
            </Group>
            <Text fz="sm">Login sebagai 
              <Text span c="blue" inherit> {session?.user?.name}</Text>
            </Text>
            <ColorSchemeToggle/>
          </Navbar.Section>
    
          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>
        </Navbar>
      </>
    );
}
  