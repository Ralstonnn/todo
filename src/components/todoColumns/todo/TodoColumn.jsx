import { TodoItemContainer } from "../../todoItemContainer/TodoItemContainer";
import { Devider } from "../../devider/Devider";
import "./style.scss";
import { AddItem } from "../../addItem/AddItem";
import { useCallback, useState } from "react";

export function TodoColumn({ data, forceUpdate }) {
  const [showAddField, setShowAddField] = useState();

  const moveToInProgressCallback = (id) => {
    fetch("/api/move-to-in-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    }).then(forceUpdate());
  };

  const moveToDoneCallback = (id) => {
    fetch("/api/move-to-done", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    }).then(forceUpdate());
  };

  const addTodoCallback = (todo = "") => {
    fetch("/api/add-todo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: todo,
      }),
    }).then(() => {
      setShowAddField(false);
      forceUpdate();
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
