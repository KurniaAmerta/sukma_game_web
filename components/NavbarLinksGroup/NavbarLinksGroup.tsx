import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton } from '@mantine/core';
import { TablerIcon, IconCalendarStats, IconChevronLeft, IconChevronRight } from '@tabler/icons';
import useStyles from './NavbarLinksGroup.styles';
import { useRouter } from 'next/router'

export function LinksGroup({ icon: Icon, label, initiallyOpened, links }: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const router = useRouter()
  // const hasLinks = Array.isArray(links);
  // const [opened, setOpened] = useState(initiallyOpened || false);
  // const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
  // const items = (hasLinks ? links : []).map((link) => (
  //   <Text<'a'>
  //     component="a"
  //     className={classes.link}
  //     href={link.link}
  //     key={link.label}
  //     onClick={(event) => event.preventDefault()}
  //   >
  //     {link.label}
  //   </Text>
  // ));

  function OpenLink(){
    router.push(links)
  }

  return (
    <>
      <UnstyledButton onClick={() => {OpenLink()}} className={classes.control}>
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size={18} />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {/* {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size={14}
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
              }}
            />
          )} */}
        </Group>
      </UnstyledButton>
      {/* {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null} */}
    </>
  );
}

interface LinksGroupProps {
    icon: TablerIcon;
    label: string;
    initiallyOpened?: boolean;
    links: string;
  }
