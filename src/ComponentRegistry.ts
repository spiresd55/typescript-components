import {IComponent} from "./IComponent";

export class ComponentRegistry {
    private components: IComponent[] = [];

    private componentMap: Map<string, any>; //TODO: ADD TYPE TO THIS
    constructor() {
      this.componentMap = new Map<string, any>();
    }

    //TODO: ADD A TYPE TO THIS
    public addComponent(componentName: string, component: any) {
      console.log("ADDING COMPONENT");
      console.log(component);
      //this.components.push(component);
      //customElements.define(componentName, component);
      let comp = new component();
      //const shadowRoot = comp.attachShadow({mode: 'open'});
      //console.log("SHADOW TEMPLATE");
      //console.log(comp.template);
      //shadowRoot.innerHTML = comp.template;
      this.componentMap.set(componentName, comp);
    }

    public removeComponent(component: IComponent) {
      //TODO: Implement this method
    }

    public initialize() {
      /*this.components.forEach((component) => {
        console.log("HERE IS A COMPONENT");
        console.log(component);
        component.initializeComponent();
      });*/

      for(let key of Array.from(this.componentMap.keys())) {
        //this.componentMap.get(key).initializeComponent();
      }
    }
}
