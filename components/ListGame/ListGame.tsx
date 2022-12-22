import { Title, SimpleGrid, Text, Button, ThemeIcon, Grid, Col } from '@mantine/core';
import { IconReceiptOff, IconFlame, IconCircleDotted, IconFileCode } from '@tabler/icons';
import useStyles from './ListGame.styles';

const features = [
    {
      icon: IconReceiptOff,
      title: 'Gratis dan terbuka',
      description: 'Semua permainan dapat diakses tanpa biaya apapun dan tanpa harus masuk.',
    },
    {
      icon: IconFileCode,
      title: 'Berbasis web',
      description: 'Permainan dapat diakses secara daring melalui web. Tidak perlu meng-install aplikasi apapun.',
    },
    {
      icon: IconCircleDotted,
      title: 'Tanpa iklan yang mengganggu',
      description:
        'Permainan kami tidak terganggu oleh iklan yang ada di layar. Kamu dapat bermain dengan fokus.',
    },
    {
      icon: IconFlame,
      title: 'Fleksibel',
      description:
        'Sesuaikan permainan dan banyak pengaturan lainnya sesuai dengan kebutuhan guru.',
    },
  ];

export function ListGame() {
    const { classes } = useStyles();
  
    const items = features.map((feature) => (
      <div key={feature.title}>
        <ThemeIcon
          size={44}
          radius="md"
          variant="gradient"
          gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
        >
          <feature.icon size={26} stroke={1.5} />
        </ThemeIcon>
        <Text size="lg" mt="sm" weight={500}>
          {feature.title}
        </Text>
        <Text color="dimmed" size="sm">
          {feature.description}
        </Text>
      </div>
    ));
  
    return (
      <div className={classes.wrapper}>
        <Grid gutter={80}>
          <Col span={12} md={5}>
            <Title className={classes.title} order={2}>
              Sebuah permainan Matematika interaktif untuk mengasah kemampuanmu.
            </Title>
            <Text color="dimmed">
            Dengan permainan Matematika kami, guru dan orang tua dapat melihat laporan data dan menyesuaikan konten permainan. Permainan kami dapat dimainkan di mana saja dan kapan saja.
            </Text>
  
            <Button
              variant="gradient"
              gradient={{ deg: 133, from: 'blue', to: 'cyan' }}
              size="lg"
              radius="md"
              mt="xl"
            >
              Mulai sekarang
            </Button>
          </Col>
          <Col span={12} md={7}>
            <SimpleGrid cols={2} spacing={30} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
              {items}
            </SimpleGrid>
          </Col>
        </Grid>
      </div>
    );
  }