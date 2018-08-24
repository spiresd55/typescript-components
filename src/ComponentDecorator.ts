import * as ko from "knockout";

interface CustomComponentConfig {
  selector: string;
  template: string;
  style?: string;
  useShadow?: boolean;
  model?: any;
}

const validateSelector = (selector: string) => {
    if (selector.indexOf('-') <= 0) {
        throw new Error('You need at least 1 dash in the custom element name!');
    }
};

export const ComponentAttribute = (target: any, key: string) => {
  console.log("Here is the target");
  console.log(target);
  console.log("Here is the key");
  console.log(key);
  let getMethodName = 'get' + key.charAt(0).toUpperCase() + key.slice(1);
  let setMethodName = 'set' + key.charAt(0).toUpperCase() + key.slice(1);

  target[getMethodName] = () => {
    console.log("Calling Get");
    console.log(target);
    console.log(this);
    return target.getAttribute(key);
  }

  target[setMethodName] = (val: any) => {
    console.log("Calling Set");
    return target.setAttribute(key);
  }
}

export const CustomComponent = (config: CustomComponentConfig) => (cls: any) => {
  validateSelector(config.selector);

  if(!config.template) {
    throw new Error("You need to pass a template for the element");
  }

  const template = document.createElement('template');
  if(config.style) {
    config.template = `<style>${config.style}</style> ${config.template}`;
  }
  template.innerHTML = config.template;

  const connectedCallback = cls.prototype.connectedCallback || function () {};
  cls.prototype.connectedCallback = function() {
      const clone = document.importNode(template.content, true);
      if (config.useShadow) {
          this.attachShadow({mode: 'open'}).appendChild(clone);
      } else {
          this.appendChild(clone);
          if(config.model) {
              ko.applyBindings(config.model, this);
              this.model = config.model;
          }
      }
      connectedCallback.call(this);
  };

  //TODO: Create a way to attach to shadowdom

  //Register the custom element
  window.customElements.define(config.selector, cls);
}
