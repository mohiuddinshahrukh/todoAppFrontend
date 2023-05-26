import {
  ActionIcon,
  BackgroundImage,
  Box,
  Button,
  Checkbox,
  Divider,
  Group,
  Image,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconCheck,
  IconChevronDown,
  IconCross,
  IconGripVertical,
  IconMenu2,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import {
  failureNotification,
  successNotification,
} from "../HelperMethods/notificationHelpers";

const DowpDownList = () => {
  try {
  } catch (e) {}
};

const dragFunction = (e, id) => {
  e.dataTransfer.setData("todoId", id);
  console.log("has started");
};

const Home = () => {
  const [AddTodoToListLoader, setAddTodoToListLoader] = useState(false);
  const [toggleAddTask, setAddToggleTask] = useState(false);
  const [toggleListItems, setToggleListItems] = useState(false);
  const [listItems, setListItems] = useState([
    {
      id: "1",
      title: "Task 1",
      completed: true,
      creationTime: Date.now(),
      completionTime: Date.now(),
    },
    {
      id: "2",
      title: "Task 2",
      completed: false,
      creationTime: Date.now(),
      completionTime: Date.now(),
    },
  ]);
  const AddTodoToList = async () => {
    try {
      setAddTodoToListLoader(true);
      // axios call with await
      successNotification();
    } catch (error) {
      console.log("Error");
      failureNotification();
    } finally {
      setAddTodoToListLoader(false);
    }
  };
  useEffect(() => {
    try {
      //axios call for initial getting of to do list
    } catch (error) {
      console.log("Error");
      notifications.show({
        title: "",
        color: "red",
        message: "",
      });
    }
  });

  return (
    <Paper
      radius={0}
      h={"90%"}
      component={BackgroundImage}
      src="https://images.unsplash.com/photo-1588421357574-87938a86fa28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    >
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
        <Box>
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
                <ActionIcon variant="transparent">
                  <IconMenu2 color="white"></IconMenu2>
                </ActionIcon>
                <Text color="white">To do Today</Text>
              </Group>
              <ActionIcon
                variant="transparent"
                onClick={() => {
                  setToggleListItems(!toggleListItems);
                }}
              >
                <IconChevronDown color="white" size={20}></IconChevronDown>
              </ActionIcon>
            </Group>
          </Box>

          <DragDropContext
            onDragEnd={(param) => {
              console.log(param);
            }}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => {
                return (
                  <Box
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    hidden={toggleListItems}
                    mt={"1rem"}
                    style={{
                      transition: "ease-in-out",
                      transitionDuration: "1s",
                      borderRadius: "5px",
                      overflow: "hidden",
                    }}
                  >
                    {listItems.map((item, index) => {
                      return (
                        <Box>
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  w={350}
                                  h={55}
                                  style={{
                                    background: "rgba(255, 255, 255, 0.463)",
                                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                    backdropFilter: "blur(5.2px)",
                                    WebkitBackdropFilter: "blur(5.2px)",
                                  }}
                                >
                                  <Group
                                    align="center"
                                    h={"100%"}
                                    position="apart"
                                    px={"0.9rem"}
                                  >
                                    <Checkbox
                                      styles={{
                                        root: {
                                          width: "86%",
                                        },
                                        label: {
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
                                      label={
                                        <TextInput
                                          p={0}
                                          m={0}
                                          weight={500}
                                          size={"xs"}
                                          value={item.title}
                                          onChange={() => {}}
                                        />
                                      }
                                    />

                                    <ActionIcon
                                      variant="transparent"
                                      onClick={() => {}}
                                    >
                                      <IconGripVertical
                                        stroke={0}
                                        fill="white"
                                        color="white"
                                        size={20}
                                      ></IconGripVertical>
                                    </ActionIcon>
                                  </Group>
                                </Box>
                              );
                            }}
                          </Draggable>
                          <Divider
                            hidden={
                              index === listItems.length - 1 ? true : false
                            }
                          />
                        </Box>
                      );
                    })}
                    {provided.placeholder}
                  </Box>
                );
              }}
            </Droppable>
          </DragDropContext>
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

          <Box hidden={toggleAddTask}>
            <Textarea
              rows={2}
              maxLength={80}
              styles={{
                label: {
                  color: "white",
                },
              }}
              placeholder="Your to do"
              label="Your To do"
            />
            <Group w={"100%"} position="right" mt={3} spacing={3}>
              <Button
                loading={AddTodoToListLoader}
                compact
                color="green"
                rightIcon={<IconPlus size={20} onClick={AddTodoToList} />}
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
