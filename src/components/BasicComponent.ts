//import {Component} from "../../Component";
import {
CustomComponent,
Listen,
Event,
KnockoutAttribute,
ComponentAttribute } from "../decorators/index";

import {Component} from "../lib/Component";

//import ko from 'ko';

import * as ko from "knockout";
//import * as ko from 'ko';

//TODO: Try Binding events to knockout
@CustomComponent({
  selector: 'basic-component',
  template: `<p id="test">I'm some default content!</p>`,
  model: {
    test: ko.observable('test'),
    data: ko.observable('0000')
  },
  useShadow: true
})
//@WatchAttribute('random', 'handleRandom')
export class BasicComponent extends Component {
  //@ComponentAttribute
  //random: string;

  //@KnockoutAttribute
  //data: any;

  //template:string = 'test template';

  //static get observedAttributes() {return ['random', 'data']; }
  constructor() {
    super();
    console.log("Constructor Called");
  }

  render() {
    console.log("Render Called");

    setTimeout(() => {
      this.customEvent({comment: 'here is some test data'});
    }, 5000);
  }

  @Listen({event: 'click', selector: '#test'})
  testFunction(e: any) {
    console.log("Test Function Called");
  }

  /*@Listen({event: 'click', selector: 'body', global: true})
  globalFunction(e: any) {
    console.log("Global Function Called");
  }*/

  @Event
  customEvent(data: any) {
    console.log("HERE IS THE CUSTOM EVENT");
  }

}
