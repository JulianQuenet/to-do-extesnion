//@ts-check
import { html, LitElement, css } from "./libs/lit.js";
import { State } from "./scripts.js";

class CreateTasks extends LitElement {
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
    
    .task-box{
      margin-top: 3px;
      padding: 0.3rem;
      display:flex;
      align-items: center;
      background-color: rgb(233, 215, 215, 0.65);
      border-radius: 10px;
      justify-content: space-between;
    }
    
    .text{
      display:flex;
      color: black;
      align-items: center;
    }
    
    .name{
      display:flex;
      align-items: center;
      flex-wrap:wrap;
      margin-left:2px;
      margin-right:2px;
      font-size: 0.7rem;
    }
    
    .due{
      font-size: 0.6rem;

    }
    
    
    .status{
      font-size: 0.8rem;
    }
    
    
  `;

  static properties = {
    state: { type: Set},
    priority: { type: Array },
    important: { type: Array },
    normal: { type: Array },
    completed: { type: Array },
  };

  constructor() {
    super();
    this.state = new Set()
    this.priority = [];
    this.important = [];
    this.normal = [];
    this.completed = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.getState();
  }

  getState() {
    this.intervalId = setInterval(() => {
      this.priority = (this.getUrgency("priority"));
      this.important = this.getUrgency("important");
      this.normal = this.getUrgency("normal");
    }, 300);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopState();
  }

  stopState() {
    clearInterval(this.intervalId);
  }

  getUrgency(string) {
    let ref = Object.entries(State).filter((task) => {
      return task[1].urgency === `${string}` 
    }).map((task)=>{
      const typeEmoji = document.createElement('div');
       typeEmoji.innerHTML = task[1].type;
      return html `<div class=task-box>
        <div class=text>
        ${typeEmoji}
          <div class=name>${task[1].title}</div>
        </div>
        <div class=due>${task[1].due}</div>
        <div class=status>Completed:</div>
      </div>`
    })
    return ref;
  }

  
  /**
   * 
   * @returns {any}
   */
  render() {
    return html` <modal-form></modal-form>
      <section class="list-area tasks">
        <p class="title">Priority&#128680;</p>
        <div class="list-box priority">${this.priority}</div>
        <p class="title">Important&#x23F3;</p>
        <div class="list-box important">${this.important}</div>
        <p class="title">Normal&#x2615;</p>
        <div class="list-box normal">${this.normal}</div>
      </section>

      <section class="list-area tasks-completed">
        <div class="empty">
          <p class="title">Completed&#127942;</p>
          <img class="bin" src="./images/bin.png" alt="bin" />
        </div>
        <div class="list-box completed"></div>
      </section>

      <section class="list-area delete">
        <p class="info">Drag over to delete</p>
        <div class="list-box tasks-delete">
          <img
            width="50"
            height="50"
            src="./images/delete.png"
            alt="trash can"
          />
        </div>
      </section>`;
  }
}

customElements.define("tasks-add", CreateTasks);

const refState = {
  "98u98u98u": {
    completed: false,
    due: "No due date",
    id: "63108931-ccd2-45c8-9aad-3898d81591f9",
    title: "ghghhg",
    type: "",
    urgency: "priority",
  },
  "98u98u9ghgh8u": {
    completed: false,
    due: "No due date",
    id: "63108931-ccd2-45c8-9aad-3898d81591f9",
    title: "ghghhg",
    type: "",
    urgency: "important",
  },
  "98u98uddff98u": {
    completed: false,
    due: "No due date",
    id: "63108931-ccd2-45c8-9aad-3898d81591f9",
    title: "ghghhg",
    type: "",
    urgency: "normal",
  },
};

const ref = Object.entries(refState).filter((task) => {
  return task[1].urgency === "normal";
}).map((task) => {
  return task[0];
});

console.log(ref);
