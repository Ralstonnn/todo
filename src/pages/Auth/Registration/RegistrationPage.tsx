import React, { useState } from "react";
import { AuthSystem } from "../../../api/authenticationSystem";
import { BaseAuthForm, User } from "../AuthForm";
import "./style.scss";

// TODO: Create registration page
export function RegistrationPage(): JSX.Element {
  const [user, setUser] = useState<User>({username: '', password: ''})

  const submitCallback = (e: React.FormEvent): void => {
    e.preventDefault()
    new AuthSystem(user).userSignUp()
  }

  return (
    <div className="registration-page-component-container">
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
        submitButtonText="Register"
      >
      </BaseAuthForm>
    </div>
  );
}
