//@ts-check
import { LitElement, html, css } from "../libs/lit.js";
import { RATING, TYPES, createTaskObject, addTaskToState, State, getNode, AppState } from "../scripts.js";


class CreateModal extends LitElement {
  //CSS below-------------------------------------------------------------------------------------
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
      margin-top: 0.3rem;
      display: flex;
      flex-direction: column;
      font-size: 0.85rem;
      font-family: Arial;
      font-weight: 300;
    }
    
    span{
      color: rgb(105,105,125);
    }

    input, select {
      margin-bottom: 5px;
      border-radius: 10px;
      border: none;
      outline: 0;
      padding: 0.35rem;
      cursor:pointer;
    }
    
     input:hover, select:hover{
      background-color: rgb(215,215,245);
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
    
    
    #msg{
      color:red;
    }
    
  `;
  //End of CSS-------------------------------------------------------------------------------------------

  static properties = {
    open: { type: Boolean, state: false },//Used to apply logic to open/close the modal
    class: { type: String },//Class used to blur out background i.e. ('.block')
    message: {type: String},//Message shown if invalid form input
  };

  constructor() {
    super();
    this.open = false;
    this.class = "";
    this.message = ""
  }
  
  toggleOpen() {//Opens and closes the modal, and changes the adding state
    AppState.adding = !AppState.adding
    this.open = !this.open;
    this.class === "block" ? (this.class = "") : (this.class = "block");
  }
  
  closeHandler() {//closes the form with the help of toggleOpen()
    const form = getNode(this.shadowRoot, "#add-form")
    if(!(form instanceof HTMLFormElement)){
      throw new Error("No form was found")
    }
    form.reset()
    this.toggleOpen();
  }
  
  submitHandler(e){//Used to create a task object out of the form data and update the State
    e.preventDefault()
    const data = new FormData(e.target)
    const formatData = Object.fromEntries(data)
    if(formatData.title === ""){
      this.message = "Required"
      setTimeout(() => {
        this.message = ''; // Reset the value to an empty string
      }, 1000);
      return
    }
    const formatTaskData = createTaskObject(formatData)
    addTaskToState(State, formatTaskData)
    this.toggleOpen()
    e.target.reset() 
    AppState.adding = false
  }
  
  /**
   * 
   * @returns {any}
   */
  render() {//HTML below-----------------------------------------------------------------------------------
    return html`
      <add-button @click=${this.toggleOpen} class="button"></add-button>
      <div class=${this.class}></div>
      <dialog class="overlay" .open=${this.open}>
      <p class=title>Add a task</p>
      <form id="add-form" @submit=${this.submitHandler}>
        <label>Task title <span id=msg>${this.message}</span></label>
        <input name=title type=text >
        <label>Urgency</label>
        <select required name=urgency>${Object.entries(RATING).map(//Creates options for the form 
          ([key, value]) => html` <option value="${key}">${value}</option> `
        )}<select>
        <label>Due date <span>(Optional)</span></label>
        <input name=due type=date>
        <label>Task type</label>
        <select name=type >${Object.entries(TYPES).map(// Also creates options for the form
          ([key, value]) => html` <option value="${key}">${value}</option> `
        )}<select>
            
        
        <div class=buttons>
        <button @click=${this.closeHandler} class="close button">Cancel</button>
        <button class="save button" type=submit form="add-form">Save</button>
  </div>
        
      </form></dialog>
    `;
    //End of HTML--------------------------------------------------------------------------------------------
  }
}

customElements.define("modal-form", CreateModal);
