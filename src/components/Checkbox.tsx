import { Checkbox } from "antd";
import {
  Todo,
  Status,
  completeTodo,
  markUncomplete,
} from "../state/todos/todosSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../state/store";

interface Props {
  todo: Todo;
}

export const MyCheckbox = ({ todo }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  if (todo.status == Status.Completed) {
    return (
      <Checkbox
        value={true}
        onChange={() => {
          dispatch(markUncomplete(todo));
        }}>
        Done
      </Checkbox>
    );
  } else if (todo.status == Status.Pending) {
    return (
      <Checkbox
        onChange={() => {
          dispatch(completeTodo(todo));
        }}>
        Mark as complete
      </Checkbox>
    );
  } else if (todo.status == Status.Overdue) {
    return (
      <Checkbox disabled onChange={() => {}}>
        Task overdued
      </Checkbox>
    );
  }
  return <></>;
};
