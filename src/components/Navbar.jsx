import {
  ActionIcon,
  Avatar,
  Group,
  Menu,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconArrowsLeftRight,
  IconLogout,
  IconMessageCircle,
  IconMoonStars,
  IconPhoto,
  IconSearch,
  IconSettings,
  IconSun,
  IconTrash,
} from "@tabler/icons-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let navigate = useNavigate();
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

        {location.pathname.includes("home") && (
          <Menu shadow="md" withArrow>
            <Menu.Target>
              <ActionIcon>
                <Avatar variant="gradient" size={"md"} radius={"sm"} src={""} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              {[
                {
                  label: "Profile",
                  items: [
                    {
                      icon: <IconLogout />,
                      item: "Logout",
                      onClick: () => {
                        navigate("/");
                      },
                    },
                  ],
                },
              ].map((element, index) => {
                return (
                  <React.Fragment key={index}>
                    <Menu.Label>{element.label}</Menu.Label>
                    {element.items.map((item, index) => {
                      return (
                        <Menu.Item
                          onClick={item.onClick}
                          key={index}
                          icon={item.icon}
                        >
                          {item.item}
                        </Menu.Item>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </Menu.Dropdown>
          </Menu>
        )}
      </Group>
    </Group>
  );
};

export default Navbar;
