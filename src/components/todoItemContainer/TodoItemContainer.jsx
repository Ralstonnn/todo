import { TodoItem } from "../todoItem/TodoItem";
import "./style.scss";

export function TodoItemContainer({
  className,
  data,
  border,
  btnText1,
  btnCallback1,
  btnText2,
  btnCallback2,
  deleteCallback,
}) {
  return (
    <div
      className={`todo-item-container-component
        flex-item flex-item-1 flex flex-o-vertical ${className}`}
    >
      {data.map((item, i) => (
        <TodoItem
          text={item.text}
          key={i}
          border={border}
          btnText1={btnText1}
          btnCallback1={() => btnCallback1(item.id)}
          btnText2={btnText2}
          btnCallback2={() => btnCallback2(item.id)}
          deleteCallback={() => deleteCallback(item.id)}
        />
      ))}
    </div>
  );
}
