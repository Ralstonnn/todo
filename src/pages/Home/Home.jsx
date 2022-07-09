import { useEffect, useState, useReducer } from "react";
import { TodoColumn } from "../../components/todoColumns/todo/TodoColumn";
import { InProgressColumn } from "../../components/todoColumns/inProgress/InProgressColumn";
import { DoneColumn } from "../../components/todoColumns/done/DoneColumn";
import { Api } from "../../api/api";

export function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

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
      <div className="flex-item flex-item-1 flex flex-wrap m-ng-5">
        <TodoColumn data={data.todo} forceUpdate={forceUpdate} />
        <InProgressColumn data={data.inProgress} forceUpdate={forceUpdate} />
        <DoneColumn data={data.done} forceUpdate={forceUpdate} />
      </div>
    </div>
  );
}
