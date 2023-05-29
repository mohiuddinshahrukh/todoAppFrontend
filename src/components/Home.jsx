import {
  ActionIcon,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Image,
  LoadingOverlay,
  Menu,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import {
  IconChevronDown,
  IconEdit,
  IconGripVertical,
  IconMenu2,
  IconPlus,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";

import {
  failureNotification,
  successNotification,
} from "../HelperMethods/notificationHelpers";
import axios from "axios";
import moment from "moment/moment";
import EditTodoModal from "./EditTodoModal";

var currentLoadingID = null;
const Home = () => {
  const [AddTodoToListLoader, setAddTodoToListLoader] = useState(false);
  const [toggleAddTask, setAddToggleTask] = useState(false);
  const [toggleListItems, setToggleListItems] = useState(false);
  const [listItems, setListItems] = useState([]);
  const [reRunUseEffect, setReRunUseEffect] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoLoader, setTodoLoader] = useState(false);
  const [todosLoader, setTodosLoader] = useState(true);
  const [opened, setOpened] = useState(false);
  const [updateTodoObject, setUpdateTodoObject] = useState({});
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    if (filterType === "all") {
      console.log(filteredTodos);
      setListItems(filteredTodos);
    } else if (filterType === "true") {
      let completedTodosList = filteredTodos.filter((item) => {
        if (item.completed === true) {
          return item;
        } else {
          return null;
        }
      });
      console.log("completed", completedTodosList);
      setListItems(completedTodosList);
    } else {
      let pendingTodosList = filteredTodos.filter((item) => {
        if (item.completed === false) {
          return item;
        } else {
          return null;
        }
      });
      console.log("pending", pendingTodosList);
      setListItems(pendingTodosList);
    }
  }, [filterType]);
  const updateTodoApiRequest = async (id, checkValue, title) => {
    let completionTimeinMS = null;
    if (checkValue) {
      completionTimeinMS = new Date();
    }
    currentLoadingID = id;
    setTodoLoader(true);
    let apiResponse = await axios.put(`http://localhost:5001/api/todos/${id}`, {
      title: title,
      completed: checkValue,
      completedTime: completionTimeinMS,
    });
    if (apiResponse.status === 200) {
      successNotification();
      setReRunUseEffect(!reRunUseEffect);
    } else {
      failureNotification();
    }
    setTodoLoader(false);
    currentLoadingID = null;
  };
  const deleteTodoApiRequest = async (id) => {
    currentLoadingID = id;
    setTodoLoader(true);
    let apiResponse = await axios.delete(
      `http://localhost:5001/api/todos/${id}`
    );
    if (apiResponse.status === 200) {
      successNotification();
      setReRunUseEffect(!reRunUseEffect);
    } else {
      failureNotification();
    }
    setTodoLoader(false);
    currentLoadingID = null;
  };
  const createTodoApiRequest = async () => {
    try {
      setAddTodoToListLoader(true);
      // axios call with await
      let apiResponse = await axios.post("http://localhost:5001/api/todos", {
        title: todoTitle,
      });
      console.log("api response", apiResponse);
      if (apiResponse.status === 201) {
        setTodoTitle("");
        successNotification();
        setListItems(apiResponse.data.data);
        setReRunUseEffect(!reRunUseEffect);
      }
    } catch (error) {
      console.log("Error");
      failureNotification();
    } finally {
      setAddTodoToListLoader(false);
    }
  };
  const getMyTodos = async () => {
    console.log("calling the api");

    let apiResponse = await axios.get("http://localhost:5001/api/todos");
    console.log(apiResponse);
    if (apiResponse?.status === 200) {
      successNotification();
      setFilteredTodos(apiResponse.data);
      return apiResponse.data;
    } else {
      failureNotification();
    }
  };
  useEffect(() => {
    let isCancelled = false;
    try {
      //axios call for initial getting of to do list
      if (!isCancelled) {
        getMyTodos().then(setListItems);
      }
    } catch (error) {
      console.log("Error");
      failureNotification();
    }
    setTodosLoader(false);
    return () => {
      isCancelled = true;
    };
  }, [reRunUseEffect]);

  return (
    <Paper
      py={10}
      radius={0}
      h={"90%"}
      component={ScrollArea}
      style={{
        backgroundRepeat: "repeat-y",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        backgroundSize: "100%",
      }}
    >
      <EditTodoModal
        reRunUseEffect={reRunUseEffect}
        setReRunUseEffect={setReRunUseEffect}
        todoObject={updateTodoObject}
        opened={opened}
        setOpened={setOpened}
        updateTodoApiRequest={updateTodoApiRequest}
      />
      <Stack
        justify="flex-start"
        h={"100%"}
        w={"100%"}
        align="center"
        pt={"3rem"}
      >
        <div
          style={{
            height: "150px",
            width: "150px",
            border: "5px solid #b2c8ed",
            borderRadius: "50%",
            overflow: "hidden",
            borderWidth: "2px",
            flexShrink: 0,
          }}
        >
          <Image
            fit="cover"
            src={
              "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80"
            }
          />
        </div>
        <Box pos={"relative"}>
          <LoadingOverlay visible={todosLoader} />
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
          <Box
            hidden={toggleListItems}
            mt={"1rem"}
            style={{
              transition: "ease-in-out",
              transitionDuration: "1s",
              borderRadius: "5px",
              overflow: "hidden",
            }}
          >
            {listItems?.map((item, index) => {
              return (
                <Box key={index} pos={"relative"}>
                  <LoadingOverlay
                    visible={item._id === currentLoadingID ? todoLoader : false}
                  />
                  <Box
                    w={350}
                    pt={
                      item?.completedTime !== null &&
                      item?.completedTime !== undefined
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
                    {item?.completedTime !== null &&
                    item?.completedTime !== undefined ? (
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
                        {moment(item.completedTime).diff(
                          item.createdAt,
                          "seconds"
                        ) < 60
                          ? "less than a minute"
                          : moment(item.completedTime).diff(
                              item.createdAt,
                              "minutes"
                            ) < 60
                          ? moment(item.completedTime).diff(
                              item.createdAt,
                              "minutes"
                            ) + "mins"
                          : moment(item.completedTime).diff(
                              item.createdAt,
                              "hours"
                            ) < 24
                          ? moment(item.completedTime).diff(
                              item.createdAt,
                              "hours"
                            ) + "hours"
                          : moment(item.completedTime).diff(
                              item.createdAt,
                              "days"
                            ) < 7
                          ? moment(item.completedTime).diff(
                              item.createdAt,
                              "days"
                            ) + "days"
                          : moment(item.completedTime).diff(
                              item.createdAt,
                              "weeks"
                            ) < 4
                          ? moment(item.completedTime).diff(
                              item.createdAt,
                              "weeks"
                            ) + "weeks"
                          : moment(item.completedTime).diff(
                              item.createdAt,
                              "months"
                            ) < 12
                          ? moment(item.completedTime).diff(
                              item.createdAt,
                              "months"
                            ) + "months"
                          : moment(item.completedTime).diff(
                              item.createdAt,
                              "years"
                            ) + "Years"}
                      </Text>
                    ) : null}
                    <Group
                      m={0}
                      align="center"
                      h={"100%"}
                      position="apart"
                      px={"0.9rem"}
                    >
                      <Checkbox
                        defaultChecked={item?.completed === true ? true : false}
                        onChange={(e) => {
                          updateTodoApiRequest(
                            item._id,
                            e.target.checked,
                            item.title
                          );
                        }}
                        styles={{
                          root: {
                            width: "86%",
                          },
                          label: {
                            color: "black",
                            width: "100%",
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
                  <Divider
                    hidden={index === listItems.length - 1 ? true : false}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box w={350}>
          <Divider mb={"md"} />
          <Button
            color="green"
            fullWidth
            leftIcon={<IconPlus />}
            variant="filled"
            onClick={() => {
              setAddToggleTask(!toggleAddTask);
            }}
          >
            Add To do
          </Button>

          <Box hidden={toggleAddTask} pos={"relative"}>
            <LoadingOverlay visible={AddTodoToListLoader} />
            <Textarea
              description={80 - todoTitle?.length + " characters left"}
              value={todoTitle}
              rows={2}
              maxLength={80}
              styles={{
                label: {
                  color: "white",
                },
                description: {
                  color: "white",
                },
              }}
              placeholder="Your to do"
              label="Your To do"
              onKeyDown={(e) => {
                const keyPressed = e.key;
                console.log(keyPressed);
                if (keyPressed == "Enter") {
                  e.preventDefault();
                  createTodoApiRequest();
                }
              }}
              onChange={(e) => {
                setTodoTitle(e.target.value);
              }}
            />
            <Group w={"100%"} position="right" mt={10} spacing={3}>
              <Button
                loading={AddTodoToListLoader}
                onClick={() => {
                  console.log("Calling the method");
                  createTodoApiRequest();
                }}
                compact
                color="green"
                rightIcon={<IconPlus size={20} />}
              >
                Add
              </Button>
              <Button
                compact
                color="red"
                rightIcon={<IconX size={20} />}
                onClick={() => {
                  setAddToggleTask(true);
                }}
              >
                Cancel
              </Button>
            </Group>
          </Box>
        </Box>
      </Stack>
    </Paper>
  );
};

export default Home;
