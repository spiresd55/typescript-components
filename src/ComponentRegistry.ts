import {IComponent} from "./IComponent";

export class ComponentRegistry {
    private componentMap: Map<string, any>; //TODO: ADD TYPE TO THIS
    private eventMap: WeakMap<any, any>; //TODO: ADD TYPE TO THIS
    private static instance: ComponentRegistry;

    constructor() {
      this.componentMap = new Map<string, any>();
      this.eventMap = new WeakMap<any, any[]>();
    }

    static getInstance() {
      if(!ComponentRegistry.instance) {
        ComponentRegistry.instance = new ComponentRegistry();
      }
      return ComponentRegistry.instance;
    }

    //TODO: ADD A TYPE TO THIS
    public addComponent(componentName: string, component: any) {
      let comp = new component();
      this.componentMap.set(componentName, comp);
    }

    public addEvent(component: any, event: any) { //TODO: replace with types
      //this.eventMap.set(component, event);
      if(!this.eventMap.get(component)) {
        let eventCollection = []; //TODO: REFACTOR THIS CODE
        eventCollection.push(event);
        this.eventMap.set(component, eventCollection);
      } else {
        let eventCollection = this.eventMap.get(component);
        eventCollection.push(event);
        this.eventMap.set(component, eventCollection);
      }
    }

    public removeComponent(component: IComponent) {
      //TODO: Implement this method
    }

    public initialize() {}
}
