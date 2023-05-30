import axios from "axios";

// Get Api Request
export const getTodosApiRequest = async () => {
  try {
    let apiResponse = await axios.get("http://localhost:5001/api/todos");
    console.log(apiResponse);
    return apiResponse;
  } catch (error) {
    console.log(error);
  }
};

// Create Api Request
export const createTodoApiRequest = async (todoTitle) => {
  let apiResponse;
  try {
    apiResponse = await axios.post("http://localhost:5001/api/todos", {
      title: todoTitle,
    });
    console.log("api response", apiResponse);
    return apiResponse.data;
  } catch (error) {
    console.log("Error");
  } finally {
    return apiResponse;
  }
};

// Update Api Request
export const updateTodoApiRequest = async (id, checkValue, title) => {
  let completionTimeinMS = null;
  if (checkValue) {
    completionTimeinMS = new Date();
  }
  let apiResponse = await axios.put(`http://localhost:5001/api/todos/${id}`, {
    title: title,
    completed: checkValue,
    completedTime: completionTimeinMS,
  });
  return apiResponse;
};

// Delete Api Request
export const deleteTodoApiRequest = async (id) => {
  let apiResponse = await axios.delete(`http://localhost:5001/api/todos/${id}`);
  return apiResponse;
};
