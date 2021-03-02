export class Dispatcher {
  public callbacks: Record<string, Set<Function>> = {};
  public data: Record<string, any> = {};
  public runCallbacks = (namespace) => {
    (this.callbacks[namespace] || []).forEach((callback) => {
      try {
        const value = this.data[namespace];
        callback(value);
      } catch (e) {
        callback(undefined);
      }
    });
  };
  public onUpdate = (namespace: string, value) => {
    this.data[namespace] = value;
    this.runCallbacks(namespace);
  };
}
