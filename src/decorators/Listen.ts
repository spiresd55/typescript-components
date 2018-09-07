import {ComponentRegistry} from "../lib/ComponentRegistry";
import {IdGenerator} from "../util/IdGenerator";

//TODO: Handle condition when selector is not found
export const Listen = function(eventConfig: any) {
  let componentRegistry = ComponentRegistry.getInstance();
  return function(target: any,name: string ,descriptor: any) {
    if(!target.componentId) {
      target.componentId = IdGenerator.generateRandomId();
    }

    let originalFunc = descriptor.value;
    descriptor.value = function() {
      if(!eventConfig.inShadow) {
        document.querySelector(eventConfig.selector)
        .addEventListener(eventConfig.event, originalFunc, true);
      } else if(eventConfig.inShadow && this.shadowRoot) {
          this.shadowRoot.querySelector(eventConfig.selector)
          .addEventListener(eventConfig.event, originalFunc, true);
      } else {
        throw new Error("InShadow property requires the custom element to be a shadowdom");
      }
    }
    componentRegistry.addEvent(target.componentId, descriptor.value);
  }
}
