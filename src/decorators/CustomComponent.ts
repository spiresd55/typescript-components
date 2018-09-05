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

export default function(config: CustomComponentConfig) {
  return function (cls: any) {
    validateSelector(config.selector);

    if(!config.template) {
      throw new Error("You need to pass a template for the element");
    }

    const template = document.createElement('template');
    if(config.style) {
      config.template = `<style>${config.style}</style> ${config.template}`;
    }
    template.innerHTML = config.template;
    //cls.prototype.listeners = [];
    const connectedCallback = cls.prototype.connectedCallback || function () {};
    cls.prototype.connectedCallback = function() {
        console.log('HERE IS CONNECTED CALLBACK');
        console.log(this);
        //this.element
        const clone = document.importNode(template.content, true);
        if (config.useShadow) {
            console.log('test1');
            let root = this.attachShadow({mode: 'open'});
            root.appendChild(clone);
            cls.prototype.shadow = root;
        } else {
            this.appendChild(clone);
            if(config.model) {
                ko.applyBindings(config.model, this);
                cls.prototype.model = config.model;
            }
        }
        connectedCallback.call(this);
    };

    //Register the custom element
    window.customElements.define(config.selector, cls)
  }
}
