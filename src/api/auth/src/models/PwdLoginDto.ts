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
 * @interface PwdLoginDto
 */
export interface PwdLoginDto {
    /**
     * 登录验证码
     * @type {string}
     * @memberof PwdLoginDto
     */
    captchaCode?: string;
    /**
     * 验证码UUID
     * @type {string}
     * @memberof PwdLoginDto
     */
    captchaUuid?: string;
    /**
     * 手机号
     * @type {string}
     * @memberof PwdLoginDto
     */
    mobile?: string;
    /**
     * 密码
     * @type {string}
     * @memberof PwdLoginDto
     */
    password?: string;
}

export function PwdLoginDtoFromJSON(json: any): PwdLoginDto {
    return {
        'captchaCode': !exists(json, 'captchaCode') ? undefined : json['captchaCode'],
        'captchaUuid': !exists(json, 'captchaUuid') ? undefined : json['captchaUuid'],
        'mobile': !exists(json, 'mobile') ? undefined : json['mobile'],
        'password': !exists(json, 'password') ? undefined : json['password'],
    };
}

export function PwdLoginDtoToJSON(value?: PwdLoginDto): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'captchaCode': value.captchaCode,
        'captchaUuid': value.captchaUuid,
        'mobile': value.mobile,
        'password': value.password,
    };
}



export type PwdLoginDtoFormKeys = keyof PwdLoginDto;
export type PwdLoginDtoNewType = {[P in PwdLoginDtoFormKeys]: PwdLoginDto[P]};
export type PwdLoginDtoFormType = FormType<PwdLoginDtoNewType>;

export function PwdLoginDtoFormDefault(): IFormField<PwdLoginDto> {
    return {
        captchaCode: { value: void 0 },
        captchaUuid: { value: void 0 },
        mobile: { value: void 0 },
        password: { value: void 0 },
    } as any;
}

export function createPwdLoginDtoFormStore<T>(field?: IFormField<T>): FormType<PwdLoginDtoNewType & T> {
    const fields: IFormField<T & PwdLoginDto> = _.merge<any , any>(PwdLoginDtoFormDefault(), field);
    return new FormStore(
        _.mapValues<IFormField<T & PwdLoginDto>, Field<any>>(fields, (item: any) => {

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

