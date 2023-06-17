//@ts-check
import { html, LitElement, css } from "../libs/lit.js";
import { State } from "../scripts.js";

class CreateTasks extends LitElement {
  //CSS below -------------------------------------------------------------
  static styles = css`
    * {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
    }

    @keyframes shake {
      0% {
        transform: rotate(-20deg);
      }
      25% {
        transform: rotate(20deg);
      }
      50% {
        transform: rotate(-30deg);
      }
      75% {
        transform: rotate(30deg);
      }
      100% {
        transform: rotate(0);
      }
    }

    .list-area {
      margin-top: 10px;
    }

    .title {
      font-size: 0.8rem;
      font-weight: 400;
    }

    .list-box {
      width: 100%;
      border: solid 1px black;
      min-height: 50px;
      border-radius: 10px;
      padding: 3px;
      padding-bottom: 1rem;
      margin-bottom: 5px;
    }

    .priority {
      background-color: rgba(234, 61, 61, 0.69);
    }

    .important {
      background-color: rgba(223, 154, 36, 0.596);
    }

    .normal {
      background-color: rgba(50, 223, 47, 0.596);
    }

    .completed {
      background-color: rgba(62, 78, 62, 0.596);
    }

    .empty {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2px;
    }

    .bin {
      cursor: pointer;
    }

    .bin:hover {
      animation: shake 0.4s linear both;
    }

    .delete {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .tasks-delete {
      background-color: transparent;
      display: flex;
      justify-content: center;
    }

    .tasks-delete img {
      z-index: -99;
    }

    .info {
      font-family: "Courier New", Courier, monospace;
      font-weight: 300;
      font-size: 0.8rem;
      color: #898585;
    }

    .button {
      display: flex;
      justify-content: center;
    }

    .task-box {
      margin: 3px;
      padding: 0.3rem;
      display: flex;
      align-items: center;
      background-color: rgb(233, 215, 215, 0.65);
      border-radius: 10px;
      justify-content: space-between;
      cursor: grab;
    }

    .text {
      display: flex;
      color: black;
      align-items: center;
    }

    .name {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-left: 2px;
      margin-right: 2px;
      font-size: 0.7rem;
    }

    .due {
      font-size: 0.6rem;
    }

    .status {
      display: flex;
      align-items: center;
      font-size: 0.8rem;
    }

    .status-button {
      border: none;
      margin-left: 1px;
      background-color: darkorange;
      cursor: pointer;
      padding: 2px;
      font-size: 0.65rem;
      border-radius: 5px;
    }

    .status-button:hover {
      filter: hue-rotate(60deg);
    }

    .status-button:disabled {
      cursor: not-allowed;
    }

    .fin {
      background: linear-gradient(45deg, #37c005, #2ea105);
      filter: hue-rotate(60deg);
      padding: 2px;
      font-size: 0.65rem;
      border-radius: 5px;
      border: none;
      margin-left: 1px;
    }

    [draggable="true"] {
      position: relative;
      z-index: 1;
    }
  `; //End of CSS-------------------------------------------------------------------

  static properties = {
    priority: { type: Array },
    important: { type: Array },
    normal: { type: Array },
    completed: { type: Array },
    dragged: { type: HTMLElement },
  };

  constructor() {
    super();
    this.priority = [];
    this.important = [];
    this.normal = [];
    this.completed = [];
    this.dragged = this.dragged;
  }

  connectedCallback() {
    //Runs when application is open
    super.connectedCallback();
    this.getState();
  }

  getState() {
    // Gets the relevant info from the state with the getUrgency function
    this.intervalId = setInterval(() => {
      this.priority = this.getUrgency("priority"); // Function returns an element with relevant attributes
      this.important = this.getUrgency("important"); //Check the get urgency func for reference or the example by
      this.normal = this.getUrgency("normal"); // this.completed at the **

      this.completed = Object.entries(State) //**
        .filter((task) => {
          return task[1].completed === true;
        })
        .map((task) => {
          const typeEmoji = document.createElement("div");
          typeEmoji.innerHTML = task[1].type;

          return html`<div id=${task[0]} class="task-box">
            <div class="text">
              ${typeEmoji}
              <div class="name">${task[1].title}</div>
            </div>
            <div class="due">${task[1].due}</div>
            <div class="status">
              Completed:
              <p class="fin">Jip</p>
            </div>
          </div>`;
        });
    }, 100); // Checks for changes every 0.1second
  }

  taskCompleted = (e) => {
    // Gets the id of the task and updates the State on the tasks Status
    const id = e.target.closest(".task-box").id;
    State[id].completed = true;
  };

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopState();
  }

  stopState() {
    clearInterval(this.intervalId);
  }

 

  /**
   * Filters out the needed tasks with the corresponding urgency represented by the string argument
   * and only gets the tasks that have not been completed yet, if the filter returns something
   * the function maps over the result and gets the corresponding values from the tasks and
   * create an element with the retrieved data.
   * @param {String} string
   * @returns
   */
  getUrgency(string) {
    let ref = Object.entries(State)
      .filter((task) => {
        return task[1].urgency === `${string}` && task[1].completed === false;
      })
      .map((task) => {
        const typeEmoji = document.createElement("div");
        typeEmoji.innerHTML = task[1].type;

        return html`<div
          draggable=${true}
          id=${task[0]}
          class="task-box"
          @dragstart=${this.startDrag}
        >
          <div class="text">
            ${typeEmoji}
            <div class="name">${task[1].title}</div>
          </div>
          <div class="due">${task[1].due}</div>
          <div class="status">
            Completed:<button
              @click=${this.taskCompleted}
              class="status-button"
            >
              Nope
            </button>
          </div>
        </div>`;
      });
    return ref;
  }
  //All dragging events below----------------------------------------------------------------
  startDrag(e) {
    e.stopPropagation();
    this.dragged = e.target;
  }

  dragging(e) {
    e.preventDefault();
    if (e.target.className === ".task-box") return;
  }

  stopDrag(e) {
    if (e.target.className === "task-box") return;
    e.target.style.outline = "";
    const id = this.dragged.id;
    State[id].urgency = e.target.id;
  }

  enter(e) {
    if (e.target.className === "task-box") return;
    e.target.style.outline = "solid 3px lightgreen";
  }

  leave(e) {
    if (e.target.className === "task-box") return;
    e.target.style.outline = "";
  }
  

  dragDelete(e) { 
    if (e.target.className === "task-box") return;
    const id = this.dragged.id;
    delete State[id];
    e.target.style.outline = "";
  }

  enterDelete(e) {
    if (e.target.className === "task-box") return;
    e.target.style.outline = "solid 2px red";
  }

  leaveDelete(e) {
    if (e.target.className === "task-box") return;
    e.target.style.outline = "";
  }
  //End of dragging events --------------------------------------------------------------------------

  removeTasks(e) {
    //Gets all the id's of the tasks and removes it from the State
    const box = e.target.closest(".tasks-completed");
    const tasks = box.querySelectorAll("[id]");

    tasks.forEach((task) => {
      const id = task.getAttribute("id");
      delete State[id];
    });
  }

  /**
   *
   * @returns {any}
   */
  render() {
    //HTML below --------------------------------------------------------------
    return html` <modal-form></modal-form>
      <section class="list-area tasks">
        <p class="title">Priority&#128680;</p>
        <div
          id="priority"
          @dragover=${this.dragging}
          @drop=${this.stopDrag}
          @dragenter=${this.enter}
          @dragleave=${this.leave}
          class="list-box priority"
        >
          ${this.priority}
        </div>
        <p class="title">Important&#x23F3;</p>
        <div
          id="important"
          @dragover=${this.dragging}
          @drop=${this.stopDrag}
          @dragenter=${this.enter}
          @dragleave=${this.leave}
          class="list-box important"
        >
          ${this.important}
        </div>
        <p class="title">Normal&#x2615;</p>
        <div
          id="normal"
          @dragover=${this.dragging}
          @drop=${this.stopDrag}
          @dragenter=${this.enter}
          @dragleave=${this.leave}
          class="list-box normal"
        >
          ${this.normal}
        </div>
      </section>

      <section class="list-area tasks-completed">
        <div class="empty">
          <p class="title">Completed&#127942;</p>
          <img
            @click=${this.removeTasks}
            class="bin"
            src="./images/bin.png"
            alt="bin"
          />
        </div>
        <div class="list-box completed">${this.completed}</div>
      </section>

      <section class="list-area delete">
        <p class="info">Drag over to delete</p>
        <div
          @dragover=${this.dragging}
          @dragenter=${this.enterDelete}
          @dragleave=${this.leaveDelete}
          @drop=${this.dragDelete}
          class="list-box tasks-delete"
        >
          <img
            width="50"
            height="50"
            src="./images/delete.png"
            alt="trash can"
          />
        </div>
      </section>`;
  } //End of HTML------------------------------------------------------------------------------
}

customElements.define("tasks-add", CreateTasks);
