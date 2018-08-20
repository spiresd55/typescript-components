import {IComponent} from "IComponent";
import {ComponentRegistry} from "ComponentRegistry";

export abstract class Component extends HTMLElement implements IComponent{
  selector: string = "";
  template: string = "";
  abstract render(): void;

  constructor() {
    super();
    this.initializeComponent();
  }

  initializeComponent () {
    console.log("Initializing component");
    //let shadowRoot = this.attachShadow({mode: 'open'});
    console.log("HERE IS THE TEMPLATE VALUE");
    console.log(this.template);
    //shadowRoot.innerHTML = this.template;
    //customElements.define(this.selector, this);
    console.log(this);
    //ComponentRegistry.addComponent(this);
    //this.render();
  }

  connectedCallback() {
    console.log("CONNECTED CALLBACK FUNCTION CALLED");
  }
}
