import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconMessageCircle,
  IconMoonStars,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconSun,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";

const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <Group position="apart" align={"center"} h={"10%"} bg={"black"} px={"lg"}>
      <Title ff={"monospace"} pl={"xl"} color="white">
        Shahrukh's Todo App
      </Title>
      <Group>
        <ActionIcon
          size={"lg"}
          variant="outline"
          color={dark ? "yellow" : "blue"}
          onClick={() => toggleColorScheme()}
          title="Toggle color scheme"
        >
          {dark ? <IconSun /> : <IconMoonStars />}
        </ActionIcon>

        <Menu shadow="md" withArrow>
          <Menu.Target>
            <ActionIcon>
              <Avatar variant="gradient" size={"md"} radius={"sm"} src={""} />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            {[
              {
                label: "Applications",
                items: [
                  { icon: <IconSettings />, item: "Settings" },
                  { icon: <IconMessageCircle />, item: "Messages" },
                  { icon: <IconPhoto />, item: "Gallery" },
                  { icon: <IconSearch />, item: "Search" },
                ],
              },
              {
                label: "Danger zone",
                items: [
                  { icon: <IconArrowsLeftRight />, item: "Transfer my data" },
                  { icon: <IconTrash />, item: "Delete my account" },
                ],
              },
            ].map((element, index) => {
              return (
                <React.Fragment key={index}>
                  <Menu.Label>{element.label}</Menu.Label>
                  {element.items.map((item, index) => {
                    return (
                      <Menu.Item key={index} icon={item.icon}>
                        {item.item}
                      </Menu.Item>
                    );
                  })}
                </React.Fragment>
              );
            })}
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Navbar;
