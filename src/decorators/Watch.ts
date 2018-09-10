import "reflect-metadata";
import {DecorationHelper} from "./DecorationHelper";
import {ComponentRegistry} from "../lib/ComponentRegistry";

export const Watch = function(target: any, property: any): void {
  let componentRegistry = ComponentRegistry.getInstance();
  DecorationHelper.ensureComponentId(target);
  componentRegistry.addWatchedAttribute(target.componentId, property);
}
