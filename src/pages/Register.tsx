import React, { Component } from "react";
import { IonButton, IonCol, IonContent, IonGrid, IonRow, } from "@ionic/react";

import "../custom.css";
import { Redirect } from "react-router";

interface UserInfoState {
  name: string;
  email: string;
  password: string;
  age: string;
  redirectToHome: boolean;
}

export default class Login extends Component<{}, UserInfoState> {
  constructor(props: any) {
    super(props);

    this.state = {
        name: '',
        email: '',
        password: '',
        age: '',
        redirectToHome: false,
    };
  }

  handleChange = (event: any) => {
    const fieldName: string = event.target.name
    this.setState({
      [fieldName]: event.target.value,
    } as UserInfoState);
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state);
    const options: RequestInit = {
      method: 'POST',
      headers: new Headers({'content-type': 'application/json'}),
    };

    options.body = JSON.stringify(
    {
        "name": this.state.name,
        "email": this.state.email,
        "password": this.state.password,
        "age": this.state.age,
    });

    fetch("https://api-nodejs-todolist.herokuapp.com/user/register", options)
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
          <IonGrid className="gridPadding">
            <IonCol size="2">
              <IonRow className="centerInput">
                <input className="subMaxWidth inputBorder" name="name" placeholder="Name:" onChange={this.handleChange}/>
              </IonRow> <br/>
              <IonRow className="centerInput">
                <input className="subMaxWidth inputBorder" name="email" placeholder="Email:" onChange={this.handleChange}/>
              </IonRow> <br/>
              <IonRow className="centerInput">
                <input className="subMaxWidth inputBorder" name="password" placeholder="Password:" onChange={this.handleChange}/>
              </IonRow> <br/>
              <IonRow className="centerInput">
                <input className="subMaxWidth inputBorder" name="age" placeholder="Age:" onChange={this.handleChange}/>
              </IonRow> <br/>
              <IonRow className="floatButton">
                <IonButton className="subMaxWidth" fill="outline" type="submit"> Register </IonButton>
              </IonRow>
            </IonCol>
          </IonGrid>
        </form>
      </IonContent>
    )
  }
};