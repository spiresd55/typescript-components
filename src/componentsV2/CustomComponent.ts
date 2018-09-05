import {IComponent} from "./IComponent";


export abstract class Component extends HTMLElement implements IComponent{
  selector: string = "";
  template: string = "";
  model: any = {};
  element: any = null;
  listeners: any[] = [];

  abstract render(): void;

  connectedCallback() {
    console.log("CONNECTED CALLBACK FUNCTION CALLED");
    console.log(this);
    //console.log(this);
    this.element = this;
    this.registerEventListeners();
    this.render();
    console.log("Calling render");
  }

  registerEventListeners() {
    console.log("Here are the event listeners");
    console.log(this.listeners);
    //console.log((this as any).testFunction);
    //console.log((this as any).testFunction.name);
    //console.log((this as any).testFunction());
  }
}
