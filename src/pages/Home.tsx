import React from 'react';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFab, IonFabButton, IonButton, IonPopover, } from '@ionic/react';

import "../custom.css";
import { Task } from '../models/tasks';
import { NewTaskForm } from "../components/NewTaskForm";
import { TasksList } from "../components/TodosList";


interface State {
  newTask: Task;
  tasks: Task[];
  showInputPopover: boolean;
}

function sendAuthenticatedRequest(url: string, method: string, body?: any) {
  const token = localStorage.getItem("token");
  const headers = new Headers({
    'Authorization': `Bearer ${token}`,
    'content-type': 'application/json'
  });
  const options: RequestInit = {
      method: method,
      headers
  };

  if (!!body) {
    options.body = JSON.stringify(body);
  }
  
  return fetch(url, options);
}

export default class App extends React.Component<{}, State> {
  componentDidMount() {
    sendAuthenticatedRequest("https://api-nodejs-todolist.herokuapp.com/task", 'GET')
      .then(res => res.json())
      .then(
        (result) => {
          const tasks = result.data.map((t: any) => {
              return {
              'id': t._id,
              'description': t.description
            }
          });
          this.setState({
            tasks
          });
        },
        (error) => {
          console.log(`There was an error! Sadge. Here's the error ${error}`);
        }
      )
  }

  state = {
    newTask: {
      id: 1,
      description: ""
    },
    
    tasks: [],
    showInputPopover: false,
  };

  render() {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle> To-Do List App </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonFab horizontal="center" vertical="top" edge={true} slot="fixed">
            <IonFabButton size="small" onClick={this.showPopover}>
              +
            </IonFabButton>
          </IonFab>

          <IonPopover 
            backdropDismiss={true}
            isOpen={this.state.showInputPopover}
            onDidDismiss={this.hidePopover}
          >
            <IonToolbar>
              <h4 className="centerButton"> New To-Do: </h4>
            </IonToolbar>
            
            <NewTaskForm
              task={this.state.newTask}
              onAdd={this.addTask}
              onChange={this.handleTaskChange}
            />

            <div className="centerButton">
              <IonButton className="subMaxWidth" expand="block" onClick={this.hidePopover}> Close </IonButton>
            </div> <br/>
          </IonPopover>

          <TasksList tasks={this.state.tasks} onDelete={this.deleteTask} />
        </IonContent>
      </>
    );
  }

  private showPopover = () => {
    this.setState({
      showInputPopover: true,
    });
  }

  private hidePopover = () => {
    this.setState({
      showInputPopover: false,
    });
  }

  private addTask = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const taskData = {
      "description": this.state.newTask.description,
    }
    sendAuthenticatedRequest('https://api-nodejs-todolist.herokuapp.com/task', 'POST', taskData)
      .then(res => res.json())
      .then(res => {
        this.setState(previousState => ({
          newTask: {
            id: previousState.newTask.id + 1,
            description: ""
          },
          tasks: [...previousState.tasks, Object.assign(previousState.newTask, { id: res.data._id })]
        }));
        console.log(this.state.tasks);
      });    
  };

  private handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTask: {
        ...this.state.newTask,
        description: event.target.value
      }
    });
  };

  private deleteTask = (taskToDelete: Task) => {
    const url = `https://api-nodejs-todolist.herokuapp.com/task/${taskToDelete.id}`;
    sendAuthenticatedRequest(url, 'DELETE')
      .then(res => {
        if (!res.ok) {
          throw(res.statusText);
        }
        return res.json();
      })
      .then(() => {
        this.setState(previousState => ({
          tasks: [
            ...previousState.tasks.filter(task => task.id !== taskToDelete.id)
          ]
        }));
      })
      .catch(err => alert(err));
  };
};
