import { TodoItemContainer } from "../../todoItemContainer/TodoItemContainer";
import { Devider } from "../../devider/Devider";
import "./style.scss";
import { AddItem } from "../../addItem/AddItem";
import { useState } from "react";
import { Api } from "../../../api/api";

export function TodoColumn({ data, forceUpdate }) {
  const [showAddField, setShowAddField] = useState();

  const moveToInProgressCallback = (id) => {
    new Api({ id }).moveToInProgress().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  const moveToDoneCallback = (id) => {
    new Api({ id }).moveToDone().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  const deleteCallback = (id) => {
    new Api({ id }).deleteTodo().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  const addTodoCallback = (todo = "") => {
    new Api({ text: todo }).addTodo().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  return (
    <div
      className="todo-column-component-container flex-item flex-item-3 
        flex-item-768-1 p-5"
    >
      <div
        className="todo-column-component flex flex-o-vertical p-25 
          border-r-10 bg-prm-b"
      >
        <div className="text-s5">To do: {data.length}</div>
        <Devider className={"m-t-20"} />
        <TodoItemContainer
          className={"m-t-20"}
          data={data}
          btnText1={"Move to InProgress"}
          btnCallback1={moveToInProgressCallback}
          btnText2={"Move to done"}
          btnCallback2={moveToDoneCallback}
          deleteCallback={deleteCallback}
        />
        <AddItem
          className={"m-t-20"}
          addTodo={(todo) => addTodoCallback(todo)}
          setShowAddField={() => setShowAddField(!showAddField)}
          showAddField={showAddField}
        />
      </div>
    </div>
  );
}
