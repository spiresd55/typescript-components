import {IComponent} from "./IComponent";

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
    public addComponent(componentName: string, component: any) {
      let comp = new component();
      this.componentMap.set(componentName, comp);
    }

    public addEvent(componentId: string, event: any) { //TODO: replace with types
      //this.eventMap.set(component, event);
      console.log("ADDING EVENT");
      console.log(componentId);
      if(!this.eventMap.get(componentId)) {
        let eventCollection = []; //TODO: REFACTOR THIS CODE
        eventCollection.push(event);
        console.log("component undefined")
        console.log(eventCollection);
        this.eventMap.set(componentId, eventCollection);
      } else {
        let eventCollection = this.eventMap.get(componentId);
        eventCollection.push(event);
        console.log("component defined")
        console.log(eventCollection);
        this.eventMap.set(componentId, eventCollection);
      }
    }

    public getEvents(componentId: string) {
      console.log("Getting events");
      console.log(componentId);
      console.log(this.eventMap);
      return this.eventMap.get(componentId);
    }

    public removeComponent(component: IComponent) {
      //TODO: Implement this method
    }

    public initialize() {}
}
