import { useEffect, useRef } from "react";
import { Devider } from "../devider/Devider";
import "./style.scss";

export function TodoItem({
  text,
  border = "ntr-r",
  btnText1,
  btnText2,
  btnCallback1,
  btnCallback2,
  deleteCallback,
}) {
  const todoItem = useRef(null);
  const expandable = useRef(null);
  const expand = useRef(null);

  const fadeOutAnim = () => {
    const item = todoItem.current;
    item.dataset.fadeIn = "false";
    setTimeout(() => {
      item.dataset.active = "false";
    }, 300);
  };

  useEffect(() => {
    setTimeout(() => {
      todoItem.current.dataset.fadeIn = "true";
    }, 10);
  }, []);

  return (
    <div
      className={`todo-item-component flex flex-o-vertical p-20 border-r-5 
        border-color-${border}`}
      onClick={() => {
        const isExpanded = expandable.current.dataset.expanded === "true";
        expandable.current.dataset.expanded = isExpanded ? "false" : "true";
        expand.current.dataset.expanded = isExpanded ? "false" : "true";
      }}
      ref={todoItem}
    >
      <div className="flex-item flex-item-1 flex">
        <div>{text}</div>
        <div
          className="todo-item-component-expand flex-item flex-item-j-s-end"
          ref={expand}
          data-expanded="false"
        >
          <div></div>
        </div>
      </div>
      <div
        className="todo-item-component-expandable"
        ref={expandable}
        data-expanded="false"
      >
        <Devider className={"m-v-15"} bg={"prm-sd"} />
        <div>
          <button
            className="flex-item flex-item-1 text-smaller p-5"
            onClick={() => {
              fadeOutAnim();
              btnCallback1();
            }}
          >
            {btnText1}
          </button>
          <button
            className="flex-item flex-item-1 m-t-5 p-5"
            onClick={() => {
              fadeOutAnim();
              btnCallback2();
            }}
          >
            {btnText2}
          </button>

          {deleteCallback !== null && (
            <button
              className="flex-item flex-item-1 m-t-5 p-5"
              onClick={() => {
                fadeOutAnim();
                deleteCallback();
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
