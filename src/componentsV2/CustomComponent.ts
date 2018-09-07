import {IComponent} from "./IComponent";
import {ComponentRegistry} from "../ComponentRegistry";

export abstract class Component extends HTMLElement implements IComponent{
  selector: string = "";
  template: string = "";
  model: any = {};
  element: any = null;
  listeners: any[] = [];
  componentRegistry: ComponentRegistry;

  abstract render(): void;

  constructor() {
    super();
    this.componentRegistry = ComponentRegistry.getInstance();
  }

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
    //console.log("Here are the event listeners");
    //console.log((this as any).componentId);
    //console.log(this.listeners);
    //console.log(this.componentRegistry.getEvents((this as any).componentId));

    //TODO: REMOVE THIS AS ANY
    let events = this.componentRegistry.getEvents((this as any).componentId);

    console.log("Here are the events");
    console.log((this as any).componentId);
    console.log(events);
    //Registering event listeners
    events.forEach((event: any) => {
      event.apply(this);
    });
    //console.log((this as any).testFunction);
    //console.log((this as any).testFunction.name);
    //console.log((this as any).testFunction());
  }
}
