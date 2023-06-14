import { html, LitElement, css } from "./libs/lit.js";

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
  `;

  render() {
    return html`
    <modal-form></modal-form>
      <section class="list-area tasks">
        <p class="title">Priority&#128680;</p>
        <div class="list-box priority"></div>
        <p class="title">Important&#x23F3;</p>
        <div class="list-box important"></div>
        <p class="title">Normal&#x2615;</p>
        <div class="list-box normal"></div>
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
