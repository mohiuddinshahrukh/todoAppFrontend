import {
  ActionIcon,
  Box,
  Checkbox,
  Divider,
  Group,
  LoadingOverlay,
  Menu,
  Text,
} from "@mantine/core";
import { IconEdit, IconGripVertical, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import React from "react";

const Todos = ({
  opened,
  setOpened,
  listItems,
  todoLoader,
  currentLoadingID,
  updateTodoApiRequest,
  deleteTodoApiRequest,
  setUpdateTodoObject,
}) => {
  const todos = listItems?.map((item, index) => {
    return (
      <Box key={index} pos={"relative"}>
        <LoadingOverlay
          visible={item._id === currentLoadingID ? todoLoader : false}
        />
        <Box
          w={350}
          pt={
            item?.completedTime !== null && item?.completedTime !== undefined
              ? 0
              : 10
          }
          pb={10}
          style={{
            background: "rgba(255, 255, 255, 0.463)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5.2px)",
            WebkitBackdropFilter: "blur(5.2px)",
          }}
        >
          {item?.completedTime !== null && item?.completedTime !== undefined ? (
            <Text
              color="black"
              align="right"
              fw={"bold"}
              size={12}
              m={0}
              p={0}
              mr={"1.5rem"}
            >
              Completed in :{" "}
              {moment(item.completedTime).diff(item.createdAt, "seconds") < 60
                ? "less than a minute"
                : moment(item.completedTime).diff(item.createdAt, "minutes") <
                  60
                ? moment(item.completedTime).diff(item.createdAt, "minutes") +
                  "mins"
                : moment(item.completedTime).diff(item.createdAt, "hours") < 24
                ? moment(item.completedTime).diff(item.createdAt, "hours") +
                  "hours"
                : moment(item.completedTime).diff(item.createdAt, "days") < 7
                ? moment(item.completedTime).diff(item.createdAt, "days") +
                  "days"
                : moment(item.completedTime).diff(item.createdAt, "weeks") < 4
                ? moment(item.completedTime).diff(item.createdAt, "weeks") +
                  "weeks"
                : moment(item.completedTime).diff(item.createdAt, "months") < 12
                ? moment(item.completedTime).diff(item.createdAt, "months") +
                  "months"
                : moment(item.completedTime).diff(item.createdAt, "years") +
                  "Years"}
            </Text>
          ) : null}
          <Group m={0} align="center" h={"100%"} position="apart" px={"0.9rem"}>
            <Checkbox
              checked={item?.completed === true ? true : false}
              onChange={(e) => {
                updateTodoApiRequest(item._id, e.target.checked, item.title);
              }}
              styles={{
                root: {
                  width: "86%",
                },
                label: {
                  color: "black",
                  width: "100%",
                  wordWrap: "break-word",
                },
                labelWrapper: {
                  width: "100%",
                },
                input: {
                  borderRadius: "50%",
                  background: "transparent",
                  ":checked": {
                    backgroundColor: "#0272b6",
                  },
                },
              }}
              label={item.title}
            />

            <Menu withinPortal withArrow position="right-start">
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <IconGripVertical
                    stroke={0}
                    fill="white"
                    color="white"
                    size={20}
                  ></IconGripVertical>
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    setUpdateTodoObject(item);
                    setOpened(!opened);
                  }}
                  icon={<IconEdit size={20} color="green" />}
                  title="Edit"
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  onClick={() => {
                    deleteTodoApiRequest(item._id);
                  }}
                  icon={<IconTrash size={20} color="red" />}
                  title="Delete"
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Box>
        <Divider hidden={index === listItems?.length - 1 ? true : false} />
      </Box>
    );
  });
  return <>{todos}</>;
};

export default Todos;
