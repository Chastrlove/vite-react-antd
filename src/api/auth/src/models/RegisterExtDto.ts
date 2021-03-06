// tslint:disable
/**
 * 前端服务
 * 服务API
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import { momentInit as moment } from 'utils/DateFormat';
import { FormStore, IFormField, FormType } from 'common/FormStore';
import { Field } from 'common/Field';
import { isRequired } from "utils/Validate";
import * as _ from 'lodash';
/**
 * 
 * @export
 * @interface RegisterExtDto
 */
export interface RegisterExtDto {
    /**
     * 优势
     * @type {Array<string>}
     * @memberof RegisterExtDto
     */
    advantage?: Array<string>;
    /**
     * 资产偏好
     * @type {Array<string>}
     * @memberof RegisterExtDto
     */
    assetPreference?: Array<string>;
    /**
     * 业务区域
     * @type {Array<string>}
     * @memberof RegisterExtDto
     */
    businessArea?: Array<string>;
    /**
     * 业务模式
     * @type {Array<string>}
     * @memberof RegisterExtDto
     */
    mode?: Array<string>;
    /**
     * 类型
     * @type {Array<string>}
     * @memberof RegisterExtDto
     */
    type?: Array<string>;
    /**
     * 用户Id
     * @type {number}
     * @memberof RegisterExtDto
     */
    userId?: number;
}

export function RegisterExtDtoFromJSON(json: any): RegisterExtDto {
    return {
        'advantage': !exists(json, 'advantage') ? undefined : json['advantage'],
        'assetPreference': !exists(json, 'assetPreference') ? undefined : json['assetPreference'],
        'businessArea': !exists(json, 'businessArea') ? undefined : json['businessArea'],
        'mode': !exists(json, 'mode') ? undefined : json['mode'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'userId': !exists(json, 'userId') ? undefined : json['userId'],
    };
}

export function RegisterExtDtoToJSON(value?: RegisterExtDto): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'advantage': value.advantage,
        'assetPreference': value.assetPreference,
        'businessArea': value.businessArea,
        'mode': value.mode,
        'type': value.type,
        'userId': value.userId,
    };
}



export type RegisterExtDtoFormKeys = keyof RegisterExtDto;
export type RegisterExtDtoNewType = {[P in RegisterExtDtoFormKeys]: RegisterExtDto[P]};
export type RegisterExtDtoFormType = FormType<RegisterExtDtoNewType>;

export function RegisterExtDtoFormDefault(): IFormField<RegisterExtDto> {
    return {
        advantage: { value: void 0 },
        assetPreference: { value: void 0 },
        businessArea: { value: void 0 },
        mode: { value: void 0 },
        type: { value: void 0 },
        userId: { value: void 0 },
    } as any;
}

export function createRegisterExtDtoFormStore<T>(field?: IFormField<T>): FormType<RegisterExtDtoNewType & T> {
    const fields: IFormField<T & RegisterExtDto> = _.merge<any , any>(RegisterExtDtoFormDefault(), field);
    return new FormStore(
        _.mapValues<IFormField<T & RegisterExtDto>, Field<any>>(fields, (item: any) => {

          if (_.has(item, "required") && item.required) {
            return new Field(item).validators(...(item.rules || [isRequired]));
          }
          if (typeof item!!.rules !== "undefined") {
            return new Field(item).validators(...item.rules);
          }
          return new Field(item);
        })
    );
}

