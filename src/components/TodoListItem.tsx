import React, { FunctionComponent } from "react";
import { IonGrid, IonCol, IonRow, IonIcon, IonList, } from "@ionic/react";

import "../custom.css";
import { Task } from "../models/tasks";


interface Props {
  task: Task;
  onDelete: (task: Task) => void;
}

export const TaskListItem: FunctionComponent<Props> = ({ task, onDelete }) => {
  const onClick = () => {
    onDelete(task);
  };

  return (
    <IonList>
      <IonGrid>
        <IonRow>
          <IonCol>
            {task.name}
          </IonCol>
          <IonCol>
            <IonIcon className="floatButton paddingRightDelete" name="close" onClick={onClick}/>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonList>
  );
};
