import {IComponent} from "./IComponent";

export class ComponentInitializer {
    private components: IComponent[] = [];
    constructor() {}

    public static addComponent(component: IComponent) {
      console.log("ADDING COMPONENT");
      console.log(component);
      this.components.push(component);
    }

    public static removeComponent(component: IComponent) {
      //TODO: Implement this method
    }

    public static initialize() {
      this.components.forEach((component) => {
        console.log("HERE IS A COMPONENT");
        console.log(component);
      });
    }
}
