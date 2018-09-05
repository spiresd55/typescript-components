//This class is the main entry point for the app
import {TestComponent} from "./components/TestComponent/TestComponent";
import {ChildTestComponent} from "./components/TestComponent/ChildTestComponent";
import {ComponentRegistry} from "./ComponentRegistry";
import {BasicComponent} from "./componentsV2/BasicComponent";
import {BasicComponent2} from "./componentsV2/BasicComponent2";

//import {LineGraph} from "./graph/line/LineGraph";

//Implement Custom Components
//customElements.define('test-component', TestComponent);
console.log("Initializing Components");
//let test = new TestComponent(); //TODO: AUTO GENERATE THIS
let componentRegistry = new ComponentRegistry();
//componentRegistry.addComponent("child-component", ChildTestComponent);
//componentRegistry.addComponent("test-component", TestComponent);
//componentRegistry.addComponent("basic-component", BasicComponent);
componentRegistry.addComponent("basic-component2", BasicComponent2);
componentRegistry.initialize();
