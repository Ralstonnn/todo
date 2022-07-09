import { TodoItemContainer } from "../../todoItemContainer/TodoItemContainer";
import { Devider } from "../../devider/Devider";
import { Api } from "../../../api/api";
import "./style.scss";

export function DoneColumn({ data, forceUpdate }) {
  const moveToToDo = (id) => {
    new Api({ id }).moveToTodo().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  const moveToInProgressCallback = (id) => {
    new Api({ id }).moveToInProgress().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  const deleteCallback = (id) => {
    new Api({ id }).deleteTodo().then((data) => {
      if (data.response === "y") forceUpdate();
    });
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
