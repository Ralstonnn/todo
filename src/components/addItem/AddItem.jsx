import { useEffect, useState } from "react";
import "./style.scss";

export function AddItem({ setShowAddField, addTodo, className, showAddField }) {
  const [todo, setTodo] = useState("");

  useEffect(() => {
    if (!showAddField) setTodo("");
  }, [showAddField]);

  return (
    <div className={`add-item-component flex-item flex-item-1 ${className}`}>
      <div
        className="add-item-component-add"
        data-active={showAddField ? "true" : "false"}
        onClick={setShowAddField}
      ></div>
      <div
        className="add-item-component-form flex flex-wrap m-t-20"
        data-active={showAddField ? "true" : "false"}
      >
        <input
          className="flex-item flex-item-1 border-color-prm-sd border-r-5"
          type="text"
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <button
          className="flex-item flex-item-1 m-t-10"
          onClick={() => {
            addTodo(todo);
            setTodo("");
            setShowAddField(false);
          }}
        >
          Add To do
        </button>
      </div>
    </div>
  );
}
