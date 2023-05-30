import { Button, Group, Modal, Textarea } from "@mantine/core";
import { IconEdit, IconX } from "@tabler/icons-react";
import React, { useState } from "react";

const EditTodoModal = ({
  todoObject,
  opened,
  setOpened,
  updateTodoApiRequest,
}) => {
  const [todoTitle, setTodoTitle] = useState(todoObject?.title);
  return (
    <Modal
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title="Edit Todo"
    >
      <Textarea
        rows={2}
        maxLength={80}
        description={80 - todoTitle?.length + " characters left"}
        defaultValue={todoObject?.title}
        onKeyDown={(e) => {
          const keyPressed = e.key;
          console.log(keyPressed);
          if (keyPressed === "Enter") {
            e.preventDefault();
            updateTodoApiRequest(
              todoObject._id,
              todoObject.completed,
              todoTitle
            );
            setOpened(!opened);
            setTodoTitle("");
          }
        }}
        onChange={(e) => {
          setTodoTitle(e.target.value);
        }}
      />
      <Group position="right" mt={10}>
        <Button
          color="green"
          size="xs"
          rightIcon={<IconEdit />}
          onClick={() => {
            updateTodoApiRequest(
              todoObject._id,
              todoObject.completed,
              todoTitle
            );
            setOpened(!opened);
          }}
        >
          Update
        </Button>
        <Button
          size="xs"
          color="red"
          rightIcon={<IconX />}
          onClick={() => {
            setOpened(!opened);
          }}
        >
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default EditTodoModal;
