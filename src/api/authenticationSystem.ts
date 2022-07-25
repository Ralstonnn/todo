import Parse from "parse";

const PARSE_APPLICATION_ID = process.env.REACT_APP_PARSE_APPLICATION_ID;
const PARSE_HOST_URL = process.env.REACT_APP_PARSE_HOST_URL;
const PARSE_JAVASCRIPT_KEY = process.env.REACT_APP_PARSE_JAVASCRIPT_KEY;
Parse.initialize(PARSE_APPLICATION_ID || "", PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL || "";

type UserLoginData = {
  username: string;
  password: string;
};

type UserCredentials = {
  readonly id: string;
  username: string;
  name?: string;
  email?: string;
};

export class AuthSystem {
  password: string;
  username: string;

  constructor(data: UserLoginData) {
    this.username = data.username;
    this.password = data.password;
  }

  async userSignUp(): Promise<{ response: string; error?: any }> {
    const user: Parse.User = new Parse.User();
    user.set("username", this.username);
    user.set("password", this.password);

    try {
      await user.signUp();
      return { response: "y" };
    } catch (error) {
      return { response: "n", error };
    }
  }

  async userSignIn(): Promise<{
    response: string;
    error?: any;
    user?: UserCredentials;
  }> {
    try {
      let user: Parse.User = await Parse.User.logIn(
        this.username,
        this.password
      );

      return {
        response: "y",
        user: { id: user.id, username: user.get("username") },
      };
    } catch (error) {
      return { response: "n", error };
    }
  }

  printUserData(): void {
    console.log(this.username);
    console.log(this.password);
  }
}
