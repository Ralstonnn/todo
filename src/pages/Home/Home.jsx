import { useEffect, useState } from "react";
import { TodoColumn } from "../../components/todoColumns/todo/TodoColumn";
import { InProgressColumn } from "../../components/todoColumns/inProgress/InProgressColumn";
import { DoneColumn } from "../../components/todoColumns/done/DoneColumn";
import { Api } from "../../api/api.ts";
import { useNavigate } from "react-router-dom";

export function Home() {
  let navigate = useNavigate();

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const moveToToDoCallback = (id) => {
    new Api({ id }).moveToTodo().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
      }
    });
  };

  const moveToInProgressCallback = (id) => {
    new Api({ id }).moveToInProgress().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
      }
    });
  };

  const moveToDoneCallback = (id) => {
    new Api({ id }).moveToDone().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
      }
    });
  };

  const deleteCallback = (id) => {
    new Api({ id }).deleteTodo().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
      }
    });
  };

  const addTodoCallback = (todo = "") => {
    new Api({ text: todo }).addTodo().then(async (data) => {
      if (data.response === "y") {
        await fetchData();
      }
    });
  };

  const fetchData = async () => {
    new Api().getTodos().then((data) => {
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
      if (isLoading) setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isLoading) fetchData();
    // eslint-disable-next-line
  }, []);

  if (isLoading) return null;
  return (
    <div className="home-component-container container-1344 flex flex-o-vertical">
      <div className="m-b-20 flex flex-j-end flex-a-center">
        <div className="text-s4">{localStorage.getItem("username")}</div>
        <button
          className="border-r-10 m-l-20 text-s4"
          onClick={() => {
            localStorage.removeItem("userId");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>
      {/* TODO: Check ng margin */}
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
