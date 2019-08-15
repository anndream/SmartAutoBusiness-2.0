import { BsnRelativesMessageModel } from './../../../core/relations/bsn-relatives';
import { BSN_TRIGGER_TYPE } from './../../../core/relations/bsn-status';
import { CN_DATA_GRID_METHOD } from '@core/relations/bsn-methods';
import { CommonUtils } from '@core/utils/common-utils';
export class GridTrigger {
    constructor(
        private _triggerMsg: BsnRelativesMessageModel,
        private _componentInstance
    ) {

    }
    public resolve() {
        switch (this._triggerMsg.trigger.triggerType) {
            case BSN_TRIGGER_TYPE.STATE:
                this.handleStateType();
                break;
            case BSN_TRIGGER_TYPE.BEHAVIOR:
                this.handleBehaviorType();
                break;
            case BSN_TRIGGER_TYPE.ACTION:
                this.handleActionType();
                break;
            case BSN_TRIGGER_TYPE.OPERATION:
                this.handleOperationType();
                break;
            case BSN_TRIGGER_TYPE.LINK:
                this.handleLinkType();
                break;
        }
    }

    handleStateType() {
        // 前置条件判断

        // 执行组件具体方法
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]]();
    }

    handleBehaviorType() {
        // 前置条件判断

        // 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }

    handleOperationType() {
        // 前置条件判断

        // 执行操作, 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }

    handleActionType() {
        // 前置条件判断

        // 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]]();
    }

    handleLinkType() {
        // 前置条件判断

        // 执行跳转功能, 该功能不由组件实现
        this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }
}

export class FormTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}

export class TreeTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}

export class AsyncTreeTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}

export class TreeGridTrigger {
    constructor(private _triggerMsg: any, private _componentInstance) { }
    public resolve() {

    }
}


export class TriggerResolver {
    constructor(private _triggerMsg: any, private _componentInstance: any) {

    }

    public resolve() {
        switch (this._triggerMsg.trigger.triggerType) {
            case BSN_TRIGGER_TYPE.STATE:
                this.handleStateType();
                break;
            case BSN_TRIGGER_TYPE.BEHAVIOR:
                this.handleBehaviorType();
                break;
            case BSN_TRIGGER_TYPE.ACTION:
                this.handleActionType();
                break;
            case BSN_TRIGGER_TYPE.OPERATION:
                this.handleOperationType();
                break;
            case BSN_TRIGGER_TYPE.LINK:
                this.handleLinkType();
                break;
        }
    }

    handleStateType() {
        // 前置条件判断
        // 执行组件具体方法
        if (this._triggerMsg.options) {
            const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
            this._componentInstance[method](this._triggerMsg.options);
        } else {
            const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
            this._componentInstance[method]();
        }

    }

    handleBehaviorType() {
        // 前置条件判断

        // 该功能不由组件实现
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method](this._triggerMsg.options);
    }

    handleOperationType() {
        console.log('trigger----', this._triggerMsg);
        // 前置条件 state

        // 执行判断 condition
        if (!this.conditionValidator(this._triggerMsg.options.condition)) {
            return false;
        }

        // 获取 ajaxConfig



        // 该功能不由组件实现

        // 执行操作, 该功能不由组件实现
        if (this._triggerMsg.options.ajaxConfig) {
            const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
            this._componentInstance[method](this._triggerMsg.options.ajaxConfig);
        }

        // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);
    }

    handleActionType() {
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method]();
        // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]]();
    }

    handleLinkType() {
        // 前置条件判断

        // 执行跳转功能, 该功能不由组件实现
        const method = this._componentInstance.COMPONENT_METHODS[this._triggerMsg.trigger.trigger];
        this._componentInstance[method](this._triggerMsg.options);
        // this._componentInstance[CN_DATA_GRID_METHOD[this._triggerMsg.trigger.trigger]](this._triggerMsg.options);

    }


    private beforeOperationValidator(beforeCfg) {

    }

    private conditionValidator(condCfg): boolean {
        if (!condCfg) {
            return true;
        }
        const result = [];
        for (const cfg of condCfg.state) {
            switch (cfg.type) {
                case 'component':
                    const componentResult = this.checkComponentProperty(cfg);
                    result.push(componentResult);
                    break;
            }
        }
        return result.findIndex(res => !res) < 0;
    }

    private checkComponentProperty(expCfg) {
        // 判断取值的类型
        const allCheckResult = [];
        switch (expCfg.type) {
            case 'component':
                const componentValue = this._componentInstance[this._componentInstance.COMPONENT_PROPERTY[expCfg.valueName]];
                for (const exp of expCfg.expression) {
                    switch (exp.type) {
                        case 'property':
                            const valueCompareObj = this.buildMatchObject(componentValue, exp);
                            const valueMatchResult = this.matchResolve(valueCompareObj, exp.match);
                            allCheckResult.push(valueMatchResult);
                            break;
                        case 'element':
                            const elementResult = [];
                            for (const element of componentValue) {
                                const elementCompareObj = this.buildMatchObject(element, exp);
                                elementResult.push(this.matchResolve(elementCompareObj, exp.match));
                            }
                            const elementMatchResult = elementResult.findIndex(res => !res) < 0;
                            allCheckResult.push(elementMatchResult);
                    }
                }
                break;
        }
        return allCheckResult.findIndex(res => !res) < 0;
    }

    private buildMatchObject(componentValue, expCfg) {
        const value = componentValue[expCfg.name];
        const matchValue = expCfg.matchValue;
        const matchValueFrom = expCfg.matchValueFrom;
        const matchValueTo = expCfg.matchValueTo;
        return {
            'value': value,
            'matchValue': matchValue,
            'matchValueFrom': matchValueFrom,
            'matchValueTo': matchValueTo
        }
    }


    private matchResolve(compareValue, expression) {
        switch (expression) {
            case 'eq': // =
                return compareValue.value === compareValue.matchValue;
            case 'neq': // !=
                return compareValue.value !== compareValue.matchValue;
            case 'ctn': // like
                return compareValue.matchValue.indexOf(compareValue.value) > 0;
            case 'nctn': // not like
                return compareValue.matchValue.indexOf(compareValue.value) <= 0;
            case 'in': // in  如果是input 是这样取值，其他则是多选取值
                let in_result = true;
                if (Array.isArray(compareValue.matchValue) && compareValue.matchValue.length > 0) {
                    in_result = compareValue.matchValue.findIndex(compareValue.value) > 0;
                }
                return in_result;
            case 'nin': // not in  如果是input 是这样取值，其他则是多选取值
                let nin_result = true;
                if (Array.isArray(compareValue.matchValue) && compareValue.matchValue.length > 0) {
                    nin_result = compareValue.matchValue.findIndex(compareValue.value) <= 0;
                }
                return nin_result;
            case 'btn': // between
                return (compareValue.matchValueFrom <= compareValue.value)
                    && (compareValue.matchValueTo >= compareValue.value);
            case 'ge': // >=
                return compareValue.value >= compareValue.matchValue;
            case 'gt': // >
                return compareValue.value > compareValue.matchValue;
            case 'le': // <=
                return compareValue.value <= compareValue.matchValue;
            case 'lt': // <
                return compareValue.value < compareValue.matchValue;
            default:
            case 'regexp': // 正在表达式匹配
                const regexp = new RegExp(compareValue.matchValue);
                return regexp.test(compareValue.value);

        }
    }


    // public resolver() {
    //     return this[this._componentInstance.triggerName](this._triggerMsg)
    // }

    // private gridTrigger() {
    //     return new GridTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private formTrigger() {
    //     return new FormTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private treeTrigger() {
    //     return new TreeTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private asyncTreeTrigger() {
    //     return new AsyncTreeTrigger(this._triggerMsg, this._componentInstance);
    // }

    // private TreeGridTrigger() {
    //     return new TreeGridTrigger(this._triggerMsg, this._componentInstance);
    // }
}

