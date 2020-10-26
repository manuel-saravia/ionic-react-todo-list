import React, { FunctionComponent } from "react";
import { IonButton, IonGrid, IonRow, } from "@ionic/react";

import "../custom.css";
import { Task } from "../models/tasks";


interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  task: Task;
}

export const NewTaskForm: FunctionComponent<Props> = ({ onChange, onAdd, task }) => (
  <form onSubmit={onAdd}>
    <IonGrid className="gridPadding">
      <IonRow className="centerInput">
        <input className="subMaxWidth inputBorder" placeholder="Enter new to-do here:" onChange={onChange} value={task.name}/>
      </IonRow> <br/>
      <IonRow className="centerButton">
        <IonButton className="subMaxWidth" fill="outline" type="submit"> Confirm </IonButton>
      </IonRow>
    </IonGrid>
  </form>
);
