import { TodoItemContainer } from "../../todoItemContainer/TodoItemContainer";
import { Devider } from "../../devider/Devider";
import "./style.scss";
import { AddItem } from "../../addItem/AddItem";
import { useState } from "react";

export function TodoColumn({
  data,
  moveToInProgressCallback,
  moveToDoneCallback,
  deleteCallback,
  addTodoCallback,
}) {
  const [showAddField, setShowAddField] = useState();

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
