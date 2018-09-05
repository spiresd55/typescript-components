export default function(target: any, property: string): any {
  let val: any;
  return {
    set: function(value: any) {
      if (!this.model) {
        throw new Error("No knockout model defined");
      };
      if (!this.model[property]) {
        throw new Error(`CustomComponent requires ${property} propery in model metadata`);
      }

      this.model[property](value);
      return this.setAttribute(property, value);
    },
    get: function() {
      return this.getAttribute(property);
    },
    enumerable: true,
    configurable: true
  }
}
