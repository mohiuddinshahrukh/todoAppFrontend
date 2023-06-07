import {
  Box,
  Image,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import {
  failureNotification,
  successNotification,
} from "../HelperMethods/notificationHelpers";
import EditTodoModal from "./EditTodoModal";
import {
  createTodoApiRequest,
  deleteTodoApiRequest,
  getTodosApiRequest,
  updateTodoApiRequest,
} from "../HelperMethods/axiosRequests";
import Todos from "./Todos";
import AddTodoSection from "./AddTodoSection";
import TodoListToggler from "./TodoListToggler";

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

  // A use effect that renders the UI based on state change of filterType
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
  }, [filterType, filteredTodos]);

  // Get method
  const getTodos = async () => {
    let apiResponse = await getTodosApiRequest();
    if (apiResponse?.status === 200) {
      successNotification("To-do's fetched successfully");
      setFilteredTodos(apiResponse.data.todos);
      return apiResponse.data.todos;
    } else {
      failureNotification(apiResponse?.message);
    }
  };

  // Create method
  const createTodo = async () => {
    setAddTodoToListLoader(true);
    let apiResponse = await createTodoApiRequest(todoTitle);
    //console.log("API REQ RES: ", apiResponse);
    if (apiResponse.status === 201) {
      setTodoTitle("");
      successNotification("To-do added successfully");
      setReRunUseEffect(!reRunUseEffect);
    } else {
      failureNotification(apiResponse.message);
    }
    setAddTodoToListLoader(false);
  };

  // Update method
  const updateTodo = async (id, checkValue, title) => {
    currentLoadingID = id;
    setTodoLoader(true);
    let apiResponse = await updateTodoApiRequest(id, checkValue, title);
    if (apiResponse.status === 200) {
      successNotification("To-do updated successfully");
      setReRunUseEffect(!reRunUseEffect);
    } else {
      failureNotification(apiResponse?.message);
    }
    setTodoLoader(false);
    currentLoadingID = null;
  };

  // Delete method
  const deleteTodo = async (id) => {
    currentLoadingID = id;
    setTodoLoader(true);
    let apiResponse = await deleteTodoApiRequest(id);
    if (apiResponse.status === 200) {
      successNotification("To-do deleted successfully!");
      setReRunUseEffect(!reRunUseEffect);
    } else {
      failureNotification(apiResponse?.message);
    }
    setTodoLoader(false);
    currentLoadingID = null;
  };

  //Use effect for fetching todo list on page load && on refresh's as necessary in CUD operations
  useEffect(() => {
    let isCancelled = false;
    setFilterType("all");
    try {
      //axios call for initial getting of to do list
      if (!isCancelled) {
        getTodos().then(setListItems);
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
        updateTodoApiRequest={updateTodo}
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
        {filterType === "all" ? (
          listItems.length > 0 ? (
            <Title color="white" my={"md"} align="center">
              Total{" "}
              {listItems.length > 1
                ? listItems.length + " Todos"
                : listItems.length + " Todo"}
            </Title>
          ) : (
            <Title align="center" color="white" my={"md"}>
              No Todos
            </Title>
          )
        ) : filterType === "true" ? (
          listItems.length > 0 ? (
            <Title color="white" my={"md"} align="center">
              Total{" "}
              {listItems.length > 1
                ? listItems.length + " Completed Todos"
                : listItems.length + " Completed Todo"}
            </Title>
          ) : (
            <Title align="center" color="white" my={"md"}>
              No completed Todos
            </Title>
          )
        ) : listItems.length > 0 ? (
          <Title color="white" my={"md"} align="center">
            Total{" "}
            {listItems.length > 1
              ? listItems.length + " Uncompleted Todos"
              : listItems.length + " Uncompleted Todo"}
          </Title>
        ) : (
          <Title align="center" color="white" my={"md"}>
            No uncompleted Todos
          </Title>
        )}
        <Box pos={"relative"}>
          <LoadingOverlay visible={todosLoader} />
          <TodoListToggler
            setFilterType={setFilterType}
            toggleListItems={toggleListItems}
            setToggleListItems={setToggleListItems}
            listItems={listItems}
          />
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
            <Todos
              opened={opened}
              setOpened={setOpened}
              listItems={listItems}
              todoLoader={todoLoader}
              currentLoadingID={currentLoadingID}
              updateTodoApiRequest={updateTodo}
              deleteTodoApiRequest={deleteTodo}
              setUpdateTodoObject={setUpdateTodoObject}
            />
          </Box>
        </Box>

        <AddTodoSection
          toggleAddTask={toggleAddTask}
          setAddToggleTask={setAddToggleTask}
          AddTodoToListLoader={AddTodoToListLoader}
          todoTitle={todoTitle}
          setTodoTitle={setTodoTitle}
          createTodo={createTodo}
        />
      </Stack>
    </Paper>
  );
};

export default Home;
