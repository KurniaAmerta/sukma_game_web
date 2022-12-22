import { Text, Container, ActionIcon, Group } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons';
// import { MantineLogo } from '@mantine/ds';
import useStyles from './CustomFooter.styles';

interface FooterLinksProps {
    title: string;
    links: { label: string; link: string }[];
  }

export function CustomFooter() {
    const { classes } = useStyles();

    const dataFooter : FooterLinksProps[] = [
        {
            title : "Tautan Berguna",
            links  : [
                { label: "FAQ", link: "faq" },
                { label: "Cara Kerja", link: "how-it-works" },
                { label: "Kurikulum", link: "standard" },
                { label: "Hubungi Kami", link: "contact-us" },
            ]
        },
        {
            title : "Perusahaan",
            links  : [
                { label: "Tentang Kami", link: "about-us" },
                { label: "Afiliasi", link: "affiliates" },
                { label: "Peraturan Privasi", link: "privacy-policy" },
                { label: "Syarat dan Ketentuan", link: "terms-of-service" },
            ]
        },
        {
            title : "Ikuti Kami",
            links  : [
                { label: "Facebook", link: "https://facebook.com" },
                { label: "Instagram", link: "https://twitter.com" },
                { label: "Youtube", link: "https://youtube.com" },
            ]
        },
      ]
  
    const groups = dataFooter.map((group) => {
      const links = group.links.map((link, index) => (
        <Text<'a'>
          key={index}
          className={classes.link}
          component="a"
          href={link.link}
          onClick={(event) => event.preventDefault()}
        >
          {link.label}
        </Text>
      ));
  
      return (
        <div className={classes.wrapper} key={group.title}>
          <Text className={classes.title}>{group.title}</Text>
          {links}
        </div>
      );
    });
  
    return (
      <footer className={classes.footer}>
        <Container className={classes.inner}>
          <div className={classes.logo}>
            {/* <MantineLogo size={30} /> */}
            <Text size="xs" color="dimmed" className={classes.description}>
              Dapatkan pengalaman belajar Matematika yang baru secara menyenangkan dan terukur. Dengan permainan Matematika kami, guru dan orang tua dapat melihat laporan data dan menyesuaikan konten permainan. Permainan kami dapat dimainkan di mana saja dan kapan saja.
            </Text>
          </div>
          <div className={classes.groups}>{groups}</div>
        </Container>
        <Container className={classes.afterFooter}>
          <Text color="dimmed" size="sm">
            © 2022 Sukma Belajar. Syarat dan ketentuan berlaku.
          </Text>
  
          <Group spacing={0} className={classes.social} position="right" noWrap>
            <ActionIcon size="lg">
              <IconBrandTwitter size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandYoutube size={18} stroke={1.5} />
            </ActionIcon>
            <ActionIcon size="lg">
              <IconBrandInstagram size={18} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Container>
      </footer>
    );
  }