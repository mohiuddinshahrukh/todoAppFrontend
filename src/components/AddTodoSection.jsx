import {
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Textarea,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { IconPlus } from "@tabler/icons-react";
import React from "react";

const AddTodoSection = ({
  toggleAddTask,
  setAddToggleTask,
  AddTodoToListLoader,
  todoTitle,
  setTodoTitle,
  createTodo,
}) => {
  const addTodoSection = (
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
              createTodo();
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
              createTodo();
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
  );
  return <>{addTodoSection}</>;
};

export default AddTodoSection;
