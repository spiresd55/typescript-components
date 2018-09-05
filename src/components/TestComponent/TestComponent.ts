//import {Component} from "../../Component";
import {
CustomComponent,
KnockoutAttribute,
ComponentAttribute } from "../../ComponentDecorator";
//import ko from 'ko';

import * as ko from "knockout";
//import * as ko from 'ko';

//TODO: Try Binding events to knockout
@CustomComponent({
  selector: 'test-component',
  template: `<div><p>Test Component is here <span data-bind="text: test"></span>
    <span data-bind="text: data"></span>
  </p>
  <hr />
  <child-component testFunction="function() {console.log('test function called')}"></child-component>
  </div>
  `,
  model: {
    test: ko.observable('test'),
    data: ko.observable('0000')
  }
})
//@WatchAttribute('random', 'handleRandom')
export class TestComponent extends HTMLElement {
  @ComponentAttribute
  random: string;

  @KnockoutAttribute
  data: any;

  template:string = 'test template';

  static get observedAttributes() {return ['random', 'data']; }
  constructor() {
    super();
  }

  connectedCallback() {
    //Run This Component afterwards
    this.data = 12345678;
    console.log("Here is the model")
    console.log((this as any).model);
  }

  // HOW TO HANDLE ATTRIBUTE CHANGE CALLBACKS
  attributeChangedCallback(attr: any, oldValue: any, newValue: any) {
    if(attr == 'random') {
      console.log("Random Value Changed");
    }
    if(attr == 'data') {
      console.log("Data Value Changed");
    }
  }

  testFunction() {
    console.log("TEST FUNCTION CALLED");
  }
}
