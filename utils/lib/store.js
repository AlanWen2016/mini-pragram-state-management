class PubSub {
  constructor() {
    this.events = {};
  }
  /**
   * 订阅， 时间订阅
   * @param event
   * @param callback
   * @returns {*}
   */
  subscribe(event, callback) {
    let self = this;
    debugger
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }
    return self.events[event].push(callback);
  }
  /**
   * 事件发布
   * @param event
   * @param data
   * @returns {Array|*}
   */
  publish(event, data) {
    let self = this;
    if (!self.events.hasOwnProperty(event)) {
      return [];
    }
    return self.events[event].map(callback => callback(data))
  }
}
export default class Store {
    constructor(params) {
        let self = this;
        //  操作mutation方法
        self.actions = {};
        // 直接修改state对象的方法
        self.mutations = {};
        // 保存用户数据状态对象
        self.state = {};
        // 用来标识修改状态， resting, mutation
        self.status = 'resting';
        // 依赖收集，状态改变后用于修改视图层
        self.events = new PubSub();
        // 添加actions
        if(params.hasOwnProperty('actions')) {
            self.actions = params.actions;
        }
        if(params.hasOwnProperty('mutations')) {
            self.mutations = params.mutations;
        }
        /**
         * state对象的劫持
         * @type {*|{}}
         */
        debugger
        self.state = new Proxy((params.state || {}), {
            set: function(state, key, value) {
              debugger
                state[key] = value;
                console.log(`stateChange: ${key}: ${value}`);
                self.events.publish('stateChange', self.state);
                if(self.status !== 'mutation') {
                    console.warn(`You should use a mutation to set ${key}`);
                }
                self.status = 'resting';
                return true;
            }
        });

    }
    dispatch(actionKey, payload) { // key, value
        let self = this;
        if(typeof self.actions[actionKey] !== 'function') {
            console.error(`Action "${actionKey} doesn't exist.`);
            return false;
        }
        console.groupCollapsed(`ACTION: ${actionKey}`);
        self.status = 'action';
        self.actions[actionKey](self, payload);
        console.groupEnd();
        return true;
    }
    commit(mutationKey, payload) {
        let self = this;
        if(typeof self.mutations[mutationKey] !== 'function') {
            console.log(`Mutation "${mutationKey}" doesn't exist`);
            return false;
        }

        self.status = 'mutation';
        let newState = self.mutations[mutationKey](self.state, payload);
        self.state = Object.assign(self.state, newState);
        return true;
    }


}
