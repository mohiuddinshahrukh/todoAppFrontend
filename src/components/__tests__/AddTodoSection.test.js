import { render, screen, fireEvent } from "@testing-library/react";
import AddTodoSection from "../AddTodoSection";

describe("AddTodoSection", () => {
  it("renders the component correctly", () => {
    render(<AddTodoSection />);

    // Assert that the Add To do button is rendered
    let addButton = screen.getByRole("button", { name: "Add To do" });
    expect(addButton).toBeInTheDocument();

    // Assert that the text area is rendered
    const textarea = screen.getByLabelText("Your To do");
    expect(textarea).toBeInTheDocument();

    // Assert that the Add and Cancel buttons are rendered
    addButton = screen.getByRole("button", { name: "Add" });
    expect(addButton).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    expect(cancelButton).toBeInTheDocument();
  });

  it("toggles the add task section when Add To do button is clicked", () => {
    render(<AddTodoSection />);

    // Get the Add To do button and click it
    const addButton = screen.getByRole("button", { name: "Add To do" });
    fireEvent.click(addButton);

    // Assert that the section is toggled (hidden property is true)
    const section = screen.getByTestId("add-task-section");
    expect(section).toHaveAttribute("hidden");
  });

  it("calls the createTodo function when Add button is clicked", () => {
    const createTodoMock = jest.fn();
    render(<AddTodoSection createTodo={createTodoMock} />);

    // Get the Add button and click it
    const addButton = screen.getByRole("button", { name: "Add" });
    fireEvent.click(addButton);

    // Assert that the createTodo function is called
    expect(createTodoMock).toHaveBeenCalledTimes(1);
  });
});
