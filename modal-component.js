import { LitElement, html, css } from "./libs/lit.js";

class CreateModal extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      overflow: hidden;
    }
    .button {
      display: flex;
      justify-content: center;
    }

    div {
      padding: 5px;
    }

    @keyframes enter {
      0% {
        opacity: 0.3;
        transform: translateY(-10px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .overlay {
      border: none;
      padding: 0.4rem;
      border-radius: 10px;
      background: rgb(82, 159, 241, 0.9);
      box-shadow: 5px -5px 10px #1c3b5d, -5px 5px 10px #6eedff;
      width: 100%;
      animation: enter 0.5s ease-in both;
      z-index: 2;
    }
    
    .title{
        display:flex;
        justify-content: center;
        color: rgb(0,0,15)
    }

    .block {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      backdrop-filter: blur(3px);
      z-index: 1;
    }

    form {
        color: 
      margin-top: 0.3rem;
      display: flex;
      flex-direction: column;
      font-size: 0.85rem;
      font-family: Arial;
      font-weight: 300;
    }

    form input,
    select {
      margin-bottom: 5px;
      border-radius: 10px;
      border: none;
      outline: 0;
      padding: 0.35rem;
      cursor:pointer;
    }
    
    .buttons{
        display: flex;
        justify-content: space-around;
    }
    
    .close{
        border:none;
        padding: 0.5rem;
        border-radius: 6px;
        background: linear-gradient(45deg, #e80e0e, #c30c0c);
        box-shadow:  2px -2px 0px #570505,
             -2px 2px 0px #ff1515;
        cursor: pointer;
    }
    
    .save{
        border:none;
        padding: 0.5rem;
        border-radius: 6px;
        background: linear-gradient(45deg, #37c005, #2ea105);
        box-shadow:  2px -2px 0px #144802,
                     -2px 2px 0px #52ff08;
        cursor: pointer;
    }
    
    .save:hover{
        transform: translate3d(0.5px, -0.5px, 0);
        box-shadow:  -2px 2px 0px #144802,
                     2px -2px 0px #52ff08;
    }
    
    .close:hover{
        transform: translate3d(0.5px, -0.5px, 0);
        box-shadow:  -2px 2px 0px #570505,
             2px -2px 0px #ff1515;
    }
    
    
  `;

  static properties = {
    open: { type: Boolean, state: false },
    class: { type: String },
  };

  constructor() {
    super();
    this.open = false;
    this.class = "";
  }

  toggleOpen() {
    this.open = !this.open;
    this.class === "block" ? (this.class = "") : (this.class = "block");
  }

  render() {
    return html`
      <add-button @click=${this.toggleOpen} class="button"></add-button>
      <div class=${this.class}></div>
      <dialog class="overlay" .open=${this.open}>
      <p class=title>Add a task</p>
      <form>
        <label>Task title</label>
        <input required name=title type=text>
        <label>Urgency</label>
        <select required name=rating><select>
        <label>Due date</label>
        <input required name=due type=date>
        <label>Type</label>
        <select required name=rating><select>
            
        
        <div class=buttons>
        <button @click=${this.toggleOpen} class="close button">Cancel</button>
        <button class="save button" type=submit>Save</button>
  </div>
        
      </form></dialog>
    `;
  }
}

customElements.define("modal-form", CreateModal);
