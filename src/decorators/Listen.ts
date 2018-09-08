import {ComponentRegistry} from "../lib/ComponentRegistry";
import {IdGenerator} from "../util/IdGenerator";
import {Logger} from "../util/Logger";

export const Listen = function(eventConfig: any) {
  let componentRegistry = ComponentRegistry.getInstance();
  return function(target: any,name: string ,descriptor: any) {
    //TODO: ComponentId can problably be generated in a better location
    if(!target.componentId) {
      target.componentId = IdGenerator.generateRandomId();
    }

    let originalFunc = descriptor.value;
    descriptor.value = function() {
      try {
        if(eventConfig.global) {
          document.querySelector(eventConfig.selector)
          .addEventListener(eventConfig.event, originalFunc, true);
        } else {
          let currentNode = this.shadowRoot ? this.shadowRoot: this;
          currentNode.querySelector(eventConfig.selector)
          .addEventListener(eventConfig.event, originalFunc, true);
        }
      } catch(e) {
        //TODO: ADD ACTUAL COMPONENT NAME
        Logger.warn(`@LISTEN - Selector ${eventConfig.selector}
           caused the following issue ${e}`);
      }
    }
    componentRegistry.addEvent(target.componentId, descriptor.value);
  }
}
