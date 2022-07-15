import { TodoItemContainer } from "../../todoItemContainer/TodoItemContainer";
import { Devider } from "../../devider/Devider";
import "./style.scss";

export function DoneColumn({
  data,
  moveToToDoCallback,
  moveToInProgressCallback,
  deleteCallback,
}) {
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
          btnCallback1={(id) => moveToToDoCallback(id)}
          btnText2={"Move to InProgress"}
          btnCallback2={(id) => moveToInProgressCallback(id)}
          deleteCallback={(id) => deleteCallback(id)}
        />
      </div>
    </div>
  );
}
