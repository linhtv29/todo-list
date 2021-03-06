import TodoService from "../services/TodoService";
import {
  ChangeInputValueType,
  GetTasksListValue,
  ChangeStatusCompleteValue,
  ChooseFavoriteTaskValue,
  LoginSucces,
  LogoutSucces,
  BeginAddTodo,
  AddTodoSuccess,
  SyncError,
  GetTodoSuccess,
  ClearScreen,
  DeleteTask,
  EditTask
} from "./ActionType";

export const ChangeInputValue = (newInputValue) => {
  return {
    type: ChangeInputValueType,
    payload: {
      newInputValue,
    },
  };
};
export const GetTasksList = (tasksList) => {
  return {
    type: GetTasksListValue,
    payload: {
      tasksList,
    },
  };
};

export const ChangeStatusComplete = (id, value) => {
  return {
    type: ChangeStatusCompleteValue,
    payload: {
      id,
      value,
    },
  };
};

export const ChooseFavoriteTask = (id, value) => {
  return {
    type: ChooseFavoriteTaskValue,
    payload: {
      id,
      value,
    },
  };
};

export const AttempLogin = () => {
  return {
    type: LoginSucces,
  };
};

export const AttempLogout = () => {
  return {
    type: LogoutSucces,
  };
};

export const AddNewTaskAsync = (inputValue) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BeginAddTodo,
    });
    await TodoService.AddTodo(inputValue);

    // Json server da co san 'id' va overide lai nen phai get lai id cua task tao moi
    const data = await TodoService.GetTodoList();
    dispatch({
      type: AddTodoSuccess,
      payload: {
        newTaskName: inputValue,
        id: data.data[data.data.length - 1]['id']
      },
    });
  } catch (ex) {
    dispatch({
      type: SyncError,
    });
  } finally {
    // END_ADD_TODO
  }
};

export const GetData = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: BeginAddTodo,
    });

    const data = await TodoService.GetTodoList();

    dispatch({
      type: GetTodoSuccess,
      payload: {
        taskList: data.data,
      },
    });
  } catch (err) {
    dispatch({
      type: SyncError,
    });
  }
};

export const ChooseFavoriteTaskAsync = (id, value) => async (
  dispatch,
  getState
) => {
  try {
    await TodoService.ChooseFavorite(id, value);
    dispatch({
      type: ChooseFavoriteTaskValue,
      payload: {
        id,
        value,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const ChangeStatusCompletedAsync = (id, value) => async (
  dispatch,
  getState
) => {
  try {
    await TodoService.ChangeStatusComplete(id, value);
    dispatch({
      type: ChangeStatusCompleteValue,
      payload: {
        id,
        value,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const ClearTask = () => {
  return {
    type: ClearScreen
  }
}

export const DeleteTaskAsync = (id) => async (
  dispatch,
  getState
) => {
  try {
    await TodoService.DeleteTask(id);
    dispatch({
      type: DeleteTask,
      payload: {
        id
      }
    })
  } catch(err) {
    console.log(err)

  }
}

export const EditTaskAsync = (id, value) => async (
  dispatch,
  getState
) => {
  try {
    await TodoService.EditTask(id, value);
    dispatch({
      type: EditTask,
      payload: {
        id,
        value
      }
    })
  } catch(err) {
    console.log(err)

  }
}