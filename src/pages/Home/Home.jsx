import { useEffect, useState, useReducer } from "react";
import { TodoColumn } from "../../components/todoColumns/todo/TodoColumn";
import { InProgressColumn } from "../../components/todoColumns/inProgress/InProgressColumn";
import { DoneColumn } from "../../components/todoColumns/done/DoneColumn";
import { Api } from "../../api/api";

export function Home() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  const moveToToDoCallback = (id) => {
    new Api({ id }).moveToTodo().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
        // forceUpdate();
      }
    });
  };

  const moveToInProgressCallback = (id) => {
    new Api({ id }).moveToInProgress().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
        // forceUpdate();
      }
    });
  };

  const moveToDoneCallback = (id) => {
    new Api({ id }).moveToDone().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
        // forceUpdate();
      }
    });
  };

  const deleteCallback = (id) => {
    new Api({ id }).deleteTodo().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
        // forceUpdate();
      }
    });
  };

  const addTodoCallback = (todo = "") => {
    new Api({ text: todo }).addTodo().then(async (data) => {
      if (data.response === "y") {
        setIsLoading(true);
        await fetchData();
        // forceUpdate();
      }
    });
  };

  const fetchData = async () => {
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

      console.log("data fetched");
      setData(temp);
      if (isLoading) setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isLoading) fetchData();
  }, []);

  if (isLoading) return;
  return (
    <div className="home-component-container container-1344 flex">
      {console.log("update")}
      <div className="flex-item flex-item-1 flex flex-wrap m-ng-5">
        <TodoColumn
          data={data.todo}
          moveToInProgressCallback={moveToInProgressCallback}
          moveToDoneCallback={moveToDoneCallback}
          deleteCallback={deleteCallback}
          addTodoCallback={addTodoCallback}
        />
        <InProgressColumn
          data={data.inProgress}
          moveToToDoCallback={moveToToDoCallback}
          moveToDoneCallback={moveToDoneCallback}
          deleteCallback={deleteCallback}
        />
        <DoneColumn
          data={data.done}
          moveToToDoCallback={moveToToDoCallback}
          moveToInProgressCallback={moveToInProgressCallback}
          deleteCallback={deleteCallback}
        />
      </div>
    </div>
  );
}
