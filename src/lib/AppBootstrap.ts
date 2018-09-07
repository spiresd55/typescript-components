import {ComponentRegistry} from "./ComponentRegistry";
import {Logger} from "../util/Logger";

export class AppBootstrap {
  private static instance: AppBootstrap;
  public componentRegistry: ComponentRegistry;

  constructor() {}

  static getInstance() {
    if(!AppBootstrap.instance) {
      AppBootstrap.instance = new AppBootstrap();
    }
    return AppBootstrap.instance;
  }

  public initialize() {
    Logger.debug("Typescript Components App is initializing");
    this.componentRegistry = ComponentRegistry.getInstance();
  }
}
