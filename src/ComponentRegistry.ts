import {IComponent} from "./IComponent";

export class ComponentRegistry {
    private componentMap: Map<string, any>; //TODO: ADD TYPE TO THIS
    constructor() {
      this.componentMap = new Map<string, any>();
    }

    //TODO: ADD A TYPE TO THIS
    public addComponent(componentName: string, component: any) {
      let comp = new component();
      this.componentMap.set(componentName, comp);
    }

    public removeComponent(component: IComponent) {
      //TODO: Implement this method
    }

    public initialize() {}
}
