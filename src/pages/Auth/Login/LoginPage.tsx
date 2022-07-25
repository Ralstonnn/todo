import React, { useState } from "react";
import { BaseAuthForm, User } from "../AuthForm";
import { AuthSystem } from "../../../api/authenticationSystem"
import "./style.scss";
import { useNavigate } from "react-router-dom";

export function LoginPage({ setIsLoggedIn } : { setIsLoggedIn: any }): JSX.Element {
  let navigate = useNavigate()

  const [user, setUser] = useState<User>({username: '', password: ''})

  const submitCallback = (e: React.FormEvent): void => {
    e.preventDefault()
    new AuthSystem(user).userSignIn().then(resp => {
      if (resp.response === 'y') {
        if (resp.user?.id) {
          localStorage.setItem('userId', resp.user.id) 
          localStorage.setItem('username', resp.user.username) 
          setIsLoggedIn(true)
        }
        else alert('User ID is undefined')
      }
    })
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
      >
        <div 
          className="registration-link"
          onClick={() => navigate('/registration')}
        >
          Registration
        </div>  
      </BaseAuthForm>
    </div>
  )
}
