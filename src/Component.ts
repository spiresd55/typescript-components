import {IComponent} from "IComponent";
import {ComponentInitializer} from "ComponentInitializer";

export abstract class Component extends HTMLElement implements IComponent{
  abstract selector: string;
  abstract template: string;
  abstract render(): void;

  constructor() {
    super();
    this.initializeComponent();
  }

  initializeComponent () {
    console.log("Initializing component");
    let shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = this.template;
    //customElements.define(this.selector, this);
    console.log(this);
    ComponentInitializer.addComponent(this);
    this.render();
  }
}
