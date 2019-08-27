import { CommonUtils } from '../../../core/utils/common-utils';
import { ActivatedRoute } from '@angular/router';
import { getISOYear, getISOWeek, getMonth, getDate } from 'date-fns';

export interface ParametersResolverModel {
  params: any[];
  tempValue?: any;
  item?: any;
  componentValue?: any;
  initValue?: any;
  cacheValue?: any;
  cascadeValue?: any;
  returnValue?: any;
  router?: ActivatedRoute;
  addedRows?: any[],
  editedRows?: any[],
  validation?: any[]  
}

export interface IParameter {
  buildParameter(): any;
}

export class ParameterResolver {
  public static resolve(model: ParametersResolverModel) {
    const result: any = {};
    if (Array.isArray(model.params)) {
      for (const param of model.params) {
        const paramType = param.type;
        if (paramType) {
          const val = this[paramType](param, model);
          if (param.dataType) {
            result[param.name] = CommonUtils.getResultByDataType(val, param.dataType);
          } else {
            result[param.name] = val;
          }
        }
      }
    }
    return result ? result : {};
  }

  private static tempValue(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new TempValueParameter(param, model).buildParameter();
  }

  private static value(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ValueParamParameter(param, model).buildParameter();
  }

  private static GUID(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new GUIDParameter(param, model).buildParameter();
  }

  private static item(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ItemParameter(param, model).buildParameter();
  }

  private static componentValue(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ComponentValueParameter(param, model).buildParameter();
  }

  private static checkedRow(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CheckedRowParameter(param, model).buildParameter();
  }

  private static selectedRow(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new SelectedRowParameter(param, model).buildParameter();
  }

  private static checked(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CheckedParameter(param, model).buildParameter();
  }

  private static selected(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new SelectedParameter(param, model).buildParameter();
  }

  private static checkedId(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CheckedIdParameter(param, model).buildParameter();
  }

  private static cacheValue(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CacheValueParameter(param, model).buildParameter();
  }

  private static initValue(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new InitValueParameter(param, model).buildParameter();
  }

  private static cascadeValue(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new CascadeValueParameter(param, model).buildParameter();
  }

  private static returnValue(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ReturnValueParameter(param, model).buildParameter();
  }

  private static defaultWeek(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ItemParameter(param, model).buildParameter();
  }

  //   private defaultDay(param) {
  //     // tslint:disable-next-line: no-use-before-declare
  //     return new ItemParameter(param, model).buildParameter();
  //   }

  //   private defaultMonth(param) {
  //     // tslint:disable-next-line: no-use-before-declare
  //     return new ItemParameter(param, model).buildParameter();
  //   }

  private static router(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new RouterParameter(param, model).buildParameter();
  }

  public static addedRows(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new AddedRows(param, model).buildParameter();
  }

  public static editedRows(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new EditedRows(param, model).buildParameter();
  }

  public static validation(param, model) {
    // tslint:disable-next-line: no-use-before-declare
    return new ValidationParameter(param, model).buildParameter();
  }
}

class BaseParameter {
  // 构建匹配参数
  public getParameter(dataType, value) {
    let strQ = '';
    if (!value) {
      // return strQ;
    }
    switch (dataType) {
      case 'eq': // =
        strQ = strQ + 'eq(' + value + ')';
        break;
      case 'neq': // !=
        strQ = strQ + '!eq(' + value + ')';
        break;
      case 'ctn': // like
        strQ = strQ + "ctn('%" + value + "%')";
        break;
      case 'nctn': // not like
        strQ = strQ + "!ctn('%" + value + "%')";
        break;
      case 'in': // in  如果是input 是这样取值，其他则是多选取值
        strQ = strQ + 'in(' + value + ')';
        break;
      case 'nin': // not in  如果是input 是这样取值，其他则是多选取值
        strQ = strQ + '!in(' + value + ')';
        break;
      case 'btn': // between
        strQ = strQ + 'btn(' + value + ')';
        break;
      case 'ge': // >=
        strQ = strQ + 'ge(' + value + ')';
        break;
      case 'gt': // >
        strQ = strQ + 'gt(' + value + ')';
        break;
      case 'le': // <=
        strQ = strQ + 'le(' + value + ')';
        break;
      case 'lt': // <
        strQ = strQ + 'lt(' + value + ')';
        break;
      default:
        strQ = value;
        break;
    }

    if (!value) {
      strQ = null;
    }
    return strQ;
  }

  // 获取默认时间(多语言存在问题)
  public getDefaultDate(dataType) {
    let dValue;
    switch (dataType) {
      case 'defaultWeek':
        dValue = `${getISOYear(Date.now())}-${getISOWeek(Date.now())}`;
        break;
      case 'defaultDay':
        dValue = `${getISOYear(Date.now())}-${getMonth(Date.now()) + 1}-${getDate(Date.now())}`;
        break;
      case 'defaultMonth':
        dValue = `${getISOYear(Date.now())}-${getMonth(Date.now()) + 1}`;
        break;
      case 'defaultYear':
        dValue = `${getISOYear(Date.now())}`;
        break;
    }
    return dValue;
  }
}

/**
 * 构建临时变量参数
 */
class TempValueParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.tempValue && this._model.tempValue[this._param.valueName]) {
      if (this._param.dataType) {
        this._result = this.getParameter(
          this._param.dataType,
          this._model.tempValue[this._param.valueName]);
      } else {
        this._result = this._model.tempValue[this._param.valueName];
      }
    } else {
      if (this._param.value === null || this._param.value === '' || this._param.value === 0) {
        if (this._param.dataType) {
          this._result = this.getParameter(this._param.dataType, this._param.value);
        } else {
          this._result = this._param.value;
        }
      } else if (this._param.defaultDate) {
        const dataType = this._param.defaultDate;
        const dValue = this.getDefaultDate(dataType);
        if (this._param.dataType) {
          this._result = this.getParameter(this._param.dataType, dValue);
        } else {
          this._result = dValue;
        }
      }
    }
    return this._result;
  }
}

/**
 * 构建固定值参数
 */
class ValueParamParameter extends BaseParameter implements IParameter {
  private _result: any = {};
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._param.value === 'null') {
      this._param.value = null;
    }
    // result[param['name']] = param.value;
    if (this._param.dataType) {
      this._result = this.getParameter(this._param.dataType, this._param.value);
    } else {
      this._result = this._param.value;
    }
    return this._result;
  }
}

/**
 * 构建数据项参数
 */
class ItemParameter extends BaseParameter implements IParameter {
  private _result: any = {};
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      // 判断组件取值是否为null
      if (this._model.item[this._param.valueName] === null || this._model.item[this._param.valueName] === undefined) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result = this.getParameter(this._param.dataType, this._param.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result = this.getDefaultDate(dataType);
          } else {
            this._result = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result = this.getParameter(
            this._param.dataType,
            this._model.item[this._param.valueName],
          );
        } else {
          this._result = this._model.item[this._param.valueName];
        }
      }
    }

    return this._result;
  }
}

/**
 * 构建数据项参数
 */
class ValidationParameter extends BaseParameter implements IParameter {
  private _result: any = {};
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.validation) {
      // 判断组件取值是否为null
      if (this._model.validation[this._param.valueName] === null || this._model.validation[this._param.valueName] === undefined) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result = this.getParameter(this._param.dataType, this._param.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result = this.getDefaultDate(dataType);
          } else {
            this._result = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result = this.getParameter(
            this._param.dataType,
            this._model.validation[this._param.valueName],
          );
        } else {
          this._result = this._model.validation[this._param.valueName];
        }
      }
    }

    return this._result;
  }
}

class AddedRows extends BaseParameter implements IParameter {
  private _result: any = {};
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.addedRows) {
      // 判断组件取值是否为null
      if (this._model.addedRows[this._param.valueName] === null || this._model.addedRows[this._param.valueName] === undefined) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result = this.getParameter(this._param.dataType, this._param.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result = this.getDefaultDate(dataType);
          } else {
            this._result = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result = this.getParameter(
            this._param.dataType,
            this._model.addedRows[this._param.valueName],
          );
        } else {
          this._result = this._model.addedRows[this._param.valueName];
        }
      }
    }

    return this._result;
  }
}

class EditedRows extends BaseParameter implements IParameter {
  private _result: any = {};
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.editedRows) {
      // 判断组件取值是否为null
      if (this._model.editedRows[this._param.valueName] === null || this._model.editedRows[this._param.valueName] === undefined) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result = this.getParameter(this._param.dataType, this._param.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result = this.getDefaultDate(dataType);
          } else {
            this._result = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result = this.getParameter(
            this._param.dataType,
            this._model.editedRows[this._param.valueName],
          );
        } else {
          this._result = this._model.editedRows[this._param.valueName];
        }
      }
    }

    return this._result;
  }
}

/**
 * 构建组件值参数
 */
class ComponentValueParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    const cmpVal = this._model['componentValue'];
    // 判断组件取值是否为null
    if (
      cmpVal[this._param.valueName] === null ||
      cmpVal[this._param.valueName] === undefined
    ) {
      if (this._param.value !== undefined) {
        if (this._param.dataType) {
          this._result = this.getParameter(this._param.dataType, this._param.value);
        } else if (this._param.defaultDate) {
          const dataType = this._param.defaultDate;
          this._result = this.getDefaultDate(dataType);
        } else {
          this._result = this._param.value;
        }
      }

    } else {
      if (this._param.dataType) {
        this._result = this.getParameter(
          this._param.dataType,
          cmpVal[this._param.valueName],
        );
      } else {
        this._result = cmpVal[this._param.valueName];
      }

    }

    return this._result;
  }
}

/**
 * 构建唯一标识参数
 */
class GUIDParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._param.dataType) {
      this._result = this.getParameter(this._param.dataType, CommonUtils.uuID(32));
    } else {
      this._result = CommonUtils.uuID(32);
    }
    return this._result;
  }
}

/**
 * 构建勾选项参数
 */
class CheckedParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      this._result = this.getParameter(this._param.dataType, this._model.item[this._param.valueName]);
    } else {
      this._result = this._model.item[this._param.valueName];
    }
    return this._result;
  }
}

/**
 * 构建选中项参数
 */
class SelectedParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      //  result[param['name']] = model.item[param['valueName']];
      if (this._param.dataType) {
        this._result = this.getParameter(
          this._param.dataType,
          this._model.this._item[this._param.valueName],
        );
      } else {
        this._result = this._model.item[this._param.valueName];
      }
    }
    return this._result;
  }
}

/**
 * 构建勾选ID项
 */
class CheckedIdParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      // result[param['name']] = model.item;
      if (this._param.dataType) {
        this._result = this.getParameter(this._param.dataType, this._model.item);
      } else {
        this._result = this._model.item;
      }
    }
    return this._result;
  }
}

/**
 * 构建勾选表格行数据参数
 */
class CheckedRowParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      if (this._param.dataType) {
        this._result = this.getParameter(
          this._param.dataType,
          this._model.item[this._param.valueName],
        );
      } else {
        this._result = this._model.item[this._param.valueName];
      }
    }
    return this._result;
  }
}

/**
 * 构建选中行数据参数
 */
class SelectedRowParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.item) {
      this._result = this._model.item[this._param.valueName];
    }
    return this._result;
  }
}

/**
 * 构建初始化参数
 */
class InitValueParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.initValue) {
      if (
        this._model.initValue[this._param.valueName] === null ||
        this._model.initValue[this._param.valueName] === undefined
      ) {
        if (this._param.value !== undefined) {
          if (this._param.dataType) {
            this._result = this.getParameter(this._param.dataType, this._model.initValue.value);
          } else if (this._param.defaultDate) {
            const dataType = this._param.defaultDate;
            this._result = this.getDefaultDate(dataType);
          } else {
            this._result = this._param.value;
          }
        }
      } else {
        if (this._param.dataType) {
          this._result = this.getParameter(
            this._param.dataType,
            this._model.initValue[this._param.valueName],
          );
        } else {
          this._result = this._model.initValue[this._param.valueName];
        }
      }
    }
    return this._result;
  }
}

/**
 * 构建缓存参数
 */
class CacheValueParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.cacheValue) {
      const cache = this._model.cacheValue.getNone('userInfo');
      if (this._param.dataType) {
        this._result = this.getParameter(this._param.dataType, cache[this._param.valueName]);
      } else {
        this._result = cache[this._param.valueName];
      }
    }
    return this._result;
  }
}

/**
 * 构建及联参数
 */
class CascadeValueParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.cascadeValue) {
      if (this._param.dataType) {
        this._result = this.getParameter(
          this._param.dataType,
          this._model.cascadeValue[this._param.valueName],
        );
      } else {
        this._result = this._model.cascadeValue[this._param.valueName];
      }
    }
    return this._result;
  }
}

/**
 * 构建返回值参数
 */
class ReturnValueParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.returnValue) {
      this._result = this._model.returnValue[this._param.valueName];
    }
    return this._result;
  }
}

/**
 * 构建路由参数
 */
class RouterParameter extends BaseParameter implements IParameter {
  private _result: any;
  constructor(private _param, private _model) {
    super();
  }
  public buildParameter() {
    if (this._model.router) {
      if (this._param.dataType) {
        this._model.router.params.subscribe(r => {
          this._result = this.getParameter(this._param.dataType, r.name);
        });
      } else {
        this._model.router.params.subscribe(r => {
          this._result = r.name;
        });
      }
    }
    return this._result;
  }
}


