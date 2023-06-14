import { LitElement, html, css } from "./libs/lit.js";


class CreateModal extends LitElement{
    
    static styles = css`
    
    *{
        box-sizing: border-box;
    }
    .button{
        display:flex;
        justify-content: center;
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
    
    
    
    .overlay{
        border: none;
        border-radius: 10px;
        background-color: rgba(54, 206, 191, 0.95);
        box-shadow: 7px -7px 13px #898585, -7px 7px 13px #ffffff;
        width: 100%;
        animation: enter 0.5s ease-in-out both;
    }
    
    
    
    
    
    `
    
    static properties = {
        open : {type: Boolean, state: false}
    }
    
    constructor(){
        super();
        this.open = false
    }
    
    toggleOpen(){
        this.open = !this.open
    }
    
    render(){
        return html`
        <add-button @click=${this.toggleOpen} class="button"></add-button>
        <dialog class="overlay" .open=${this.open}>this is a modal for reference</dialog>
        `
    }
    
}

customElements.define("modal-form", CreateModal)