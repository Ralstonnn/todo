import { useEffect, useState, useCallback } from "react";
import { TodoColumn } from "../../components/todoColumns/todo/TodoColumn";
import { InProgressColumn } from "../../components/todoColumns/inProgress/InProgressColumn";
import { DoneColumn } from "../../components/todoColumns/done/DoneColumn";

// TODO: Figure out how to force update from another component
export function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  useEffect(() => {
    fetch("/api/get-data")
      .then((resp) => resp.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  });

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
