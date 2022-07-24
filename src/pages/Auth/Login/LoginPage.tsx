import React, { useState } from "react";
import { BaseAuthForm, User } from "../AuthForm";
import { AuthSystem } from "../../../api/authenticationSystem"
import "./style.scss";

export function LoginPage(): JSX.Element {
  const [user, setUser] = useState<User>({username: '', password: ''})

  const submitCallback = (e: React.FormEvent): void => {
    e.preventDefault()
    new AuthSystem(user).userSignIn()
  }

  return (
    <div className="login-page-component-container flex flex-a-center flex-j-center ">
      <BaseAuthForm
        usernameInpValue={user.username} 
        usernameInpOnChange={(value: string) => setUser({
          username: value, 
          password: user.password
        })}
        passwordInpValue={user.password}
        passwordInpOnChange={(value: string) => setUser({
          username: user.username, 
          password: value
        })}
        formSubmitHandler={submitCallback}
        submitButtonText="Login"
      />
    </div>
  )
}
