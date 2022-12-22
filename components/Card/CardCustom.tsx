import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export function CardCustom(props:any) {
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src={"/gameImg/game"+props.id.toString()+".jpg"}
          height={300}
          alt="Norway"
        />
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{props.name}</Text>
        <Badge color="pink" variant="light">
          Baru
        </Badge>
      </Group>

      <Text size="sm" color="dimmed">
      Kalahkan teman Anda dalam memecahkan rintangan Matematika dan dapatkan poinnya!
      </Text>

      <Button variant="light" color="blue" fullWidth mt="md" radius="md" component='a' target="_blank" href={"game/"+props.id.toString()}>
        Mainkan Sekarang!
      </Button>
    </Card>
  );
}
