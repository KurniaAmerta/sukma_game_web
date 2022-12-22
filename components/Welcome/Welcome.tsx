import { Title, Text, Anchor } from '@mantine/core';
import useStyles from './Welcome.styles';

export function Welcome() {
  const { classes } = useStyles();

  return (
    <>
      <Title className={classes.title} align="center" mt={100}>
        Welcome to {' '}
        <Text inherit variant="gradient" component="span">
          Sukma Game
        </Text>
      </Title>
      <Text color="dimmed" align="center" size="lg" sx={{ maxWidth: 580 }} mx="auto" mt="xl">
          Dapatkan pengalaman belajar Matematika yang baru secara menyenangkan dan terukur. {' '}
        <Anchor href="/about-us" size="lg">
          Pelajari selengkapnya.
        </Anchor>
      </Text>
    </>
  );
}
