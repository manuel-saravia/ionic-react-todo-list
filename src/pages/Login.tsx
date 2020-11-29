import React, { Component } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonRow, } from "@ionic/react";

import "../custom.css";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

interface LoginState {
  email: string;
  password: string;
  redirectToHome: boolean;
}

export default class Login extends Component<{}, LoginState> {
  constructor(props: any) {
    super(props);

    this.state = {
      email: '',
      password: '',
      redirectToHome: false,
    };
    console.log("ANIANSKDNAK")
  }

  handleChange = (event: any) => {
    const fieldName: string = event.target.name
    this.setState({
      [fieldName]: event.target.value,
    } as LoginState);
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const options: RequestInit = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
    };

    options.body = JSON.stringify(
    {
      "email": this.state.email,
      "password": this.state.password
    });

    fetch("https://api-nodejs-todolist.herokuapp.com/user/login", options)
      .then(res => {
        if (!res.ok) {
          throw(res.statusText);
        }
        return res.json();
      })
      .then(res => {
        localStorage.setItem("token", res.token);
        this.setState({
          redirectToHome: true,
        })
      })
      .catch(err => alert(err));
  }

  render() {
    const redirectToReferrer = this.state.redirectToHome;
    if (redirectToReferrer) {
        return <Redirect to="/home" />
    }

    return (
      <IonContent>
        <form onSubmit={this.handleSubmit}>
          <IonGrid className="gridCenter" fixed={true}>
            <IonCol size="2">
              <IonRow className="centerInput">
                <input className="subMaxWidth inputBorder" name="email" placeholder="Email:" onChange={this.handleChange}/>
              </IonRow> <br/>
              <IonRow className="centerInput">
                <input className="subMaxWidth inputBorder" name="password" placeholder="Password:" onChange={this.handleChange}/>
              </IonRow> <br/>
              <IonRow className="alignCenter">
                <Link to="/register"> Register </Link>
                <IonButton className="floatButton" fill="outline" type="submit"> Log In </IonButton>
              </IonRow>
            </IonCol>
          </IonGrid>
        </form>
      </IonContent>
    )
  }
};