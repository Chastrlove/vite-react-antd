import { Input, InputProps } from 'antd';
import * as React from 'react';
import style from './Input.module.less'

interface InputStyledProps extends InputProps{

}

export const InputStyled = (props:InputStyledProps) => {
    return (
        <Input {...props} className={style.input} />
    );
}
