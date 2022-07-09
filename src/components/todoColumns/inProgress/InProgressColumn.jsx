import { TodoItemContainer } from "../../todoItemContainer/TodoItemContainer";
import { Devider } from "../../devider/Devider";
import { Api } from "../../../api/api";
import "./style.scss";

export function InProgressColumn({ data, forceUpdate }) {
  const moveToToDo = (id) => {
    new Api({ id }).moveToTodo().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  const deleteCallback = (id) => {
    new Api({ id }).deleteTodo().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  const moveToDoneCallback = (id) => {
    new Api({ id }).moveToDone().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

  return (
    <div
      className="in-progress-column-component-container flex-item flex-item-3 
      flex-item-768-1 p-5"
    >
      <div
        className="in-progress-column-component flex flex-o-vertical p-25 
          border-r-10 bg-prm-b"
      >
        <div className="text-s5">In progress: {data.length}</div>
        <Devider className={"m-t-20"} bg="ntr-y" />
        <TodoItemContainer
          className={"m-t-20"}
          data={data}
          border="ntr-y"
          btnText1={"Move to ToDo"}
          btnCallback1={moveToToDo}
          btnText2={"Move to Done"}
          btnCallback2={moveToDoneCallback}
          deleteCallback={deleteCallback}
        />
      </div>
    </div>
  );
}
