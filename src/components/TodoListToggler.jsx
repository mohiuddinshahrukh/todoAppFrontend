import { ActionIcon, Box, Group, Menu, Select, Text } from "@mantine/core";
import { IconChevronDown, IconMenu2 } from "@tabler/icons-react";
import React from "react";

const TodoListToggler = ({
  setFilterType,
  toggleListItems,
  setToggleListItems,
  listItems,
}) => {
  const todoListToggler = (
    <Box
      w={350}
      h={55}
      style={{
        background: "rgba(255, 255, 255, 0.19)",
        borderRadius: "5px",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5.2px)",
        WebkitBackdropFilter: "blur(5.2px)",
      }}
    >
      <Group align="center" h={"100%"} position="apart" px={"0.9rem"}>
        <Group>
          <Menu withArrow withinPortal position="top-end">
            <Menu.Target>
              <ActionIcon variant="transparent">
                <IconMenu2 color="white"></IconMenu2>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Select
                onChange={setFilterType}
                placeholder="Select a category to view"
                defaultValue={"all"}
                data={[
                  {
                    value: "all",
                    label: "All",
                  },
                  {
                    value: "true",
                    label: "Completed to-do's",
                  },
                  {
                    value: "false",
                    label: "Pending to-do's",
                  },
                ]}
              />
            </Menu.Dropdown>
          </Menu>
          <Text color="white">To do Today</Text>
        </Group>
        <ActionIcon
          disabled={listItems?.length === 0 ? true : false}
          variant="transparent"
          onClick={() => {
            setToggleListItems(!toggleListItems);
          }}
        >
          <IconChevronDown
            color={listItems?.length === 0 ? "grey" : "white"}
            size={20}
          ></IconChevronDown>
        </ActionIcon>
      </Group>
    </Box>
  );
  return <>{todoListToggler}</>;
};

export default TodoListToggler;
