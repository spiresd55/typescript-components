//import {Component} from "../../Component";
import {
CustomComponent,
Listen,
ComponentAttribute } from "../decorators/index"; //TODO: REMOVE INDEX

import {Component} from "./CustomComponent";

//import ko from 'ko';

import * as ko from "knockout";
//import * as ko from 'ko';

//TODO: Try Binding events to knockout
@CustomComponent({
  selector: 'basic-component2',
  template: `<div>
    <h6>Component Header</h6>
    <basic-component id="child">
    <p>TEST CONTENT</p>
    </basic-component>
  </div>
  `,
  model: {
    test: ko.observable('test'),
    data: ko.observable('0000')
  },
  useShadow: true
})
//@WatchAttribute('random', 'handleRandom')
export class BasicComponent2 extends Component {
  @ComponentAttribute
  id: string;

  constructor() {
    super();
    console.log("Constructor Called");
    //this.testFunction.bind(this);
    //this.customEventListener.bind(this);
    //this.testFunction();
  }

  render() {
    //console.log("Render Called");
    //console.log(this.element);
    //console.log(this.shadowRoot.querySelector('basic-component'));
    //console.log(document.querySelector('body'));
    //console.log(this.element.shadowRoot);
  }

  @Listen({event: 'click', selector: 'basic-component', inShadow: true})
  testFunction(e: any) {
    console.log(e);
    console.log("Test Function Called Again");
  }

  @Listen({event: 'customEvent', selector: '#child', inShadow: true})
  customEventListener(event: any) {
    console.log("CUSTOM EVENT LISTENER")
    console.log(event);
  }
}
