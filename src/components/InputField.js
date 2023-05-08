import React from 'react';
import { Input, InputNumber, Radio } from 'antd';

export default function InputField({
  type,
  name,
  placeholder,
  value,
  disabled,
  defaultValue,
  style,
  className,
  ...rest
}) {
  const options = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  const renderInput = () => {
    switch (type) {
      case 'NUMBER':
        return (
          <Input
            placeholder={placeholder || 'Enter Number'}
            pattern='[0-9]*'
            autoComplete='off'
            disabled={disabled}
            defaultValue={defaultValue}
            value={value}
            style={{ width: '100%' }}
            {...rest}
          />
        );
      case 'textarea':
        return (
          <Input.TextArea
            placeholder={placeholder}
            disabled={disabled}
            defaultValue={defaultValue}
            autoComplete='off'
            {...rest}
          />
        );
      case 'BOOLEAN':
        return (
          <Radio.Group
            options={options}
            defaultValue={defaultValue}
            value={value}
            {...rest}
          />
        );
      case 'TEXT':
        return (
          <Input
            autoComplete='off'
            disabled={disabled}
            placeholder={placeholder || 'Enter Text'}
            {...rest}
          />
        );
      default:
        return (
          <Input placeholder={placeholder} disabled={disabled} {...rest} />
        );
    }
  };
  return renderInput();
}
