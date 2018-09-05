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
  selector: 'child-component',
  template: `<p>Child Component is here <span data-bind="text: test"></span>
    <span data-bind="text: data"></span>
  </p>
  `,
  model: {
    test: ko.observable('test'),
    data: ko.observable('0000')
  }
})
export class ChildTestComponent extends HTMLElement {
  @ComponentAttribute
  random: string;

  @KnockoutAttribute
  data: any;

  @ComponentAttribute
  testFunction: any;

  static get observedAttributes() {return ['random', 'data']; }
  constructor() {
    super();
  }

  connectedCallback() {
    //Run This Component afterwards
    this.data = 12345678910;
    console.log(this.testFunction);
    //this.testFunction();
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
}
