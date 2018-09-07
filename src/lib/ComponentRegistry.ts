import {IComponent} from "./IComponent";
import "reflect-metadata";

export class ComponentRegistry {
    private componentMap: Map<string, any>; //TODO: ADD TYPE TO THIS
    private eventMap: Map<string, any>; //TODO: ADD TYPE TO THIS
    private static instance: ComponentRegistry;

    constructor() {
      this.componentMap = new Map<string, any>();
      this.eventMap = new Map<string, any[]>();
    }

    static getInstance() {
      if(!ComponentRegistry.instance) {
        ComponentRegistry.instance = new ComponentRegistry();
      }
      return ComponentRegistry.instance;
    }

    //TODO: ADD A TYPE TO THIS
    public addComponent(component: any) {
      //Reflects properties defined in @Component decorator
      let componentConfig =
      (Reflect as any).getMetadata("componentConfig", component);

      //Adding component
      if(!this.componentMap.get(componentConfig.selector)) {
        let comp = new component();
        this.componentMap.set(componentConfig.selector, comp);
      } else {
        throw new Error(`${componentConfig.selector} is already defined in app`);
      }
    }

    public addEvent(componentId: string, event: any) { //TODO: replace with types
      //Get current event collection
      let eventCollection = this.eventMap.get(componentId)
      ? this.eventMap.get(componentId): [];

      //Push onto the event collection
      eventCollection.push(event);
      this.eventMap.set(componentId, eventCollection);
    }

    public getEvents(componentId: string) {
      return this.eventMap.get(componentId);
    }

    public removeComponent(component: IComponent) {
      //TODO: Implement this method
    }

    public initialize() {}
}
