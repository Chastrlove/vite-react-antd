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
 * @interface LoginDto
 */
export interface LoginDto {
    /**
     * 手机号
     * @type {string}
     * @memberof LoginDto
     */
    mobile?: string;
    /**
     * 登录验证码
     * @type {string}
     * @memberof LoginDto
     */
    smsVerifyCode?: string;
}

export function LoginDtoFromJSON(json: any): LoginDto {
    return {
        'mobile': !exists(json, 'mobile') ? undefined : json['mobile'],
        'smsVerifyCode': !exists(json, 'smsVerifyCode') ? undefined : json['smsVerifyCode'],
    };
}

export function LoginDtoToJSON(value?: LoginDto): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'mobile': value.mobile,
        'smsVerifyCode': value.smsVerifyCode,
    };
}



export type LoginDtoFormKeys = keyof LoginDto;
export type LoginDtoNewType = {[P in LoginDtoFormKeys]: LoginDto[P]};
export type LoginDtoFormType = FormType<LoginDtoNewType>;

export function LoginDtoFormDefault(): IFormField<LoginDto> {
    return {
        mobile: { value: void 0 },
        smsVerifyCode: { value: void 0 },
    } as any;
}

export function createLoginDtoFormStore<T>(field?: IFormField<T>): FormType<LoginDtoNewType & T> {
    const fields: IFormField<T & LoginDto> = _.merge<any , any>(LoginDtoFormDefault(), field);
    return new FormStore(
        _.mapValues<IFormField<T & LoginDto>, Field<any>>(fields, (item: any) => {

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

