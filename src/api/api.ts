import Parse from "parse";

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID || "", PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL || "";

type TodoItem = {
  readonly id: string;
  text: string;
  todoColumn: boolean;
  inProgressColumn: boolean;
  doneColumn: boolean;
  readonly updatedAt: Date;
};

type TodoItems = TodoItem[];

export class Api {
  objectId: string | undefined;
  text: string | undefined;

  constructor(
    data: { id?: string; text?: string } = {
      id: "",
      text: "",
    }
  ) {
    this.objectId = data.id;
    this.text = data.text;
  }

  async addTodo(): Promise<{ response: string; error?: any }> {
    const todo = new Parse.Object("todo");
    todo.set("text", this.text);

    try {
      await todo.save();
      return { response: "y" };
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }

  async deleteTodo(): Promise<{ response: string; error?: any } | null> {
    if (!this.objectId) return null;

    const todo = new Parse.Query("todo");

    try {
      const object = await todo.get(this.objectId);

      try {
        await object.destroy();
        return { response: "y" };
      } catch (error) {
        return {
          response: "n",
          error,
        };
      }
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }

  async updateTodo(): Promise<{ response: string; error?: any } | null> {
    if (!this.objectId) return null;

    const todo = new Parse.Query("todo");

    try {
      const object = await todo.get(this.objectId);
      object.set("text", this.text);

      try {
        await object.save();
        return { response: "y" };
      } catch (error) {
        return {
          response: "n",
          error,
        };
      }
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }

  async moveToTodo(): Promise<{ response: string; error?: any } | null> {
    if (!this.objectId) return null;

    const todo = new Parse.Query("todo");

    try {
      const object = await todo.get(this.objectId);
      object.set("todoColumn", true);
      object.set("inProgressColumn", false);
      object.set("doneColumn", false);

      try {
        await object.save();
        return { response: "y" };
      } catch (error) {
        return {
          response: "n",
          error,
        };
      }
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }

  async moveToInProgress(): Promise<{ response: string; error?: any } | null> {
    if (!this.objectId) return null;

    const todo = new Parse.Query("todo");

    try {
      const object = await todo.get(this.objectId);
      object.set("todoColumn", false);
      object.set("inProgressColumn", true);
      object.set("doneColumn", false);

      try {
        await object.save();
        return { response: "y" };
      } catch (error) {
        return {
          response: "n",
          error,
        };
      }
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }

  async moveToDone(): Promise<{ response: string; error?: any } | null> {
    if (!this.objectId) return null;

    const todo = new Parse.Query("todo");

    try {
      const object = await todo.get(this.objectId);
      object.set("todoColumn", false);
      object.set("inProgressColumn", false);
      object.set("doneColumn", true);

      try {
        await object.save();
        return { response: "y" };
      } catch (error) {
        return {
          response: "n",
          error,
        };
      }
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }

  async getTodos(): Promise<TodoItems | { response: string; error?: any }> {
    const todo = new Parse.Query("todo");
    const result = await todo.find();
    let resultArr: TodoItems = [];

    try {
      /**
       * Forming an array from returned object
       */
      for (const item of result) {
        let tempObj: TodoItem = {
          id: item.id,
          text: item.get("text"),
          todoColumn: item.get("todoColumn"),
          inProgressColumn: item.get("inProgressColumn"),
          doneColumn: item.get("doneColumn"),
          updatedAt: item.get("updatedAt"),
        };

        resultArr.push(tempObj);
      }
      /**
       * Sorting by updating date so the last updated item will always be the last in a column
       */
      // TODO: Sort with db query
      resultArr.sort((a, b) => {
        if (a.updatedAt > b.updatedAt) return 1;
        if (a.updatedAt < b.updatedAt) return -1;
        return 0;
      });
      return resultArr;
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }
}
