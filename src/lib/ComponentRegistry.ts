import {IComponent} from "./IComponent";
import {IComponentInstanceInfo} from "./ComponentInstanceInfo";
import "reflect-metadata";

export class ComponentRegistry {
    private componentMap: Map<string, any>; //TODO: ADD TYPE TO THIS
    private componentInstanceInfoMap: Map<string,
    IComponentInstanceInfo>;

    private static instance: ComponentRegistry;

    constructor() {
      this.componentMap = new Map<string, any>();
      this.componentInstanceInfoMap = new Map<string,
      IComponentInstanceInfo>();
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
      let componentInstance =
      this.componentInstanceInfoMap.get(componentId);

      if(!componentInstance) {
        componentInstance = {events: [], watchedAttributes: []};
      }

      componentInstance.events.push(event);
      this.componentInstanceInfoMap
      .set(componentId, componentInstance);
    }

    public addWatchedAttribute(componentId: string, attribute: string) {
      //Get current watchedAttributes collection
      let componentInstance =
      this.componentInstanceInfoMap.get(componentId);

      if(!componentInstance) {
        componentInstance = {events: [], watchedAttributes: []};
      }

      componentInstance.watchedAttributes.push(attribute);
      this.componentInstanceInfoMap
      .set(componentId, componentInstance);
    }

    public getEvents(componentId: string) {
      return this.componentInstanceInfoMap.get(componentId)
      .events;
    }

    public getAttributes(componentId: string) {
      return this.componentInstanceInfoMap.get(componentId)
      .watchedAttributes;
    }

    public removeComponent(component: IComponent) {
      //TODO: Implement this method
    }

    public initialize() {}
}
