import { TodoItemContainer } from "../../todoItemContainer/TodoItemContainer";
import { Devider } from "../../devider/Devider";
import "./style.scss";

export function DoneColumn({ data, forceUpdate }) {
  const moveToToDo = (id) => {
    fetch("/api/move-to-to-do", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    }).then(forceUpdate());
  };

  const moveToInProgressCallback = (id) => {
    fetch("/api/move-to-in-progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    }).then(forceUpdate());
  };

  const deleteCallback = (id) => {
    fetch("/api/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    }).then(forceUpdate());
  };

  return (
    <div
      className="done-column-component-container flex-item flex-item-3 
        flex-item-768-1 p-5"
    >
      <div
        className="done-column-component flex flex-o-vertical p-25 
          border-r-10 bg-prm-b"
      >
        <div className="text-s5">Done: {data.length}</div>
        <Devider className={"m-t-20"} bg="ntr-g" />
        <TodoItemContainer
          className={"m-t-20"}
          data={data}
          border="ntr-g"
          btnText1={"Move to ToDo"}
          btnCallback1={moveToToDo}
          btnText2={"Move to InProgress"}
          btnCallback2={moveToInProgressCallback}
          deleteCallback={deleteCallback}
        />
      </div>
    </div>
  );
}
