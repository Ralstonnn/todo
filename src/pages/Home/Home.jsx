import { useEffect, useState, useReducer } from "react";
import { TodoColumn } from "../../components/todoColumns/todo/TodoColumn";
import { InProgressColumn } from "../../components/todoColumns/inProgress/InProgressColumn";
import { DoneColumn } from "../../components/todoColumns/done/DoneColumn";
import { Api } from "../../api/api";

export function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const moveToToDoCallback = (id) => {
    new Api({ id }).moveToTodo().then((data) => {
      if (data.response === "y") forceUpdate();
    });
  };

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

  useEffect(() => {
    const result = new Api().getTodos();
    result.then((data) => {
      let temp = {
        todo: [],
        inProgress: [],
        done: [],
      };
      data.forEach((item) => {
        if (item.todoColumn) temp.todo.push(item);
        else if (item.inProgressColumn) temp.inProgress.push(item);
        else temp.done.push(item);
      });

      setData(temp);
      setIsLoading(false);
    });
  }, [ignored]);

  if (isLoading) return;
  return (
    <div className="home-component-container container-1344 flex">
      {console.log("update")}
      <div className="flex-item flex-item-1 flex flex-wrap m-ng-5">
        <TodoColumn
          data={data.todo}
          forceUpdate={forceUpdate}
          moveToInProgressCallback={moveToInProgressCallback}
          moveToDoneCallback={moveToDoneCallback}
          deleteCallback={deleteCallback}
          addTodoCallback={addTodoCallback}
        />
        <InProgressColumn
          data={data.inProgress}
          forceUpdate={forceUpdate}
          moveToToDoCallback={moveToToDoCallback}
          moveToDoneCallback={moveToDoneCallback}
          deleteCallback={deleteCallback}
        />
        <DoneColumn
          data={data.done}
          forceUpdate={forceUpdate}
          moveToToDoCallback={moveToToDoCallback}
          moveToInProgressCallback={moveToInProgressCallback}
          deleteCallback={deleteCallback}
        />
      </div>
    </div>
  );
}
