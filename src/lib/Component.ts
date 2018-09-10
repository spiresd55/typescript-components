import {IComponent} from "./IComponent";
import {ComponentRegistry} from "./ComponentRegistry";

export abstract class Component extends HTMLElement implements IComponent{
  selector: string = "";
  template: string = "";
  model: any = {};
  element: any = null;
  listeners: any[] = [];
  componentRegistry: ComponentRegistry;

  abstract render(): void;

  //TODO: Add Error Handling
  static get observedAttributes() {
    let componentId = (Reflect as any).getMetadata("componentId", this).id;
    let attributes = ComponentRegistry.getInstance().getAttributes(componentId);
    return attributes;
  }

  constructor() {
    super();
    this.componentRegistry = ComponentRegistry.getInstance();
  }

  connectedCallback() {
    this.element = this;
    this.registerEventListeners();
    this.render();
  }

  registerEventListeners() {
    let events =
    this.componentRegistry.getEvents((this as any).componentId);
    //Registering event listeners
    events.forEach((event: any) => {
      event.apply(this);
    });
  }
}
