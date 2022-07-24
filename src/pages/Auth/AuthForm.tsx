import React from "react";
import './style.scss'

type Props = {
  usernameInpValue: string
  usernameInpOnChange: any
  passwordInpValue: string
  passwordInpOnChange: any
  formSubmitHandler: (e: React.FormEvent) => void
  submitButtonText: string
  children?: React.ReactNode
}

type User = {
  username: string,
  password: string
}

function BaseAuthForm({
  usernameInpValue, 
  usernameInpOnChange, 
  passwordInpValue, 
  passwordInpOnChange, 
  formSubmitHandler,
  submitButtonText,
  children
}: Props): JSX.Element {
  return (
    <div className="base-form-component-container flex flex-a-center flex-j-center ">
      <form 
        className="base-form-component p-50 bg-prm-d border-r-10 flex 
          flex-o-vertical flex-a-center"
        onSubmit={(e: React.FormEvent) => formSubmitHandler(e)}
      >
        <input 
          className="border-r-5" 
          value={usernameInpValue}
          onChange={(e) => usernameInpOnChange(e.target.value)}
          type="text" 
          name="username" 
          id="login-page-username-inp" 
        />
        <input 
          className="border-r-5" 
          value={passwordInpValue}
          onChange={(e) => passwordInpOnChange(e.target.value)}
          type="password" 
          name="password" 
          id="login-page-username-pass" 
        />
        {children}
        <button type="submit">{submitButtonText}</button>
      </form>
    </div>
  )
}

export { BaseAuthForm, type User }