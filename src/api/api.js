import Parse from "parse/dist/parse.min.js";

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export class Api {
  constructor({ id = null, text = null } = {}) {
    this.objectId = id;
    this.text = text;
  }

  async addTodo() {
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

  async deleteTodo() {
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

  async updateTodo() {
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

  async moveToTodo() {
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

  async moveToInProgress() {
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

  async moveToDone() {
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

  async getTodos() {
    const todo = new Parse.Query("todo");
    const result = await todo.find();
    const resultArr = [];

    try {
      /**
       * Forming an array from returned object
       */
      for (const item of result) {
        let tempObj = {
          id: item.id,
          text: item.get("text"),
          todoColumn: item.get("todoColumn"),
          inProgressColumn: item.get("inProgressColumn"),
          doneColumn: item.get("doneColumn"),
        };

        resultArr.push(tempObj);
      }
      return resultArr;
    } catch (error) {
      return {
        response: "n",
        error,
      };
    }
  }
}
