import React from 'react';
import { Input, InputNumber, Radio, Select } from 'antd';

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
          <InputNumber
            placeholder={placeholder || 'Enter Number'}
            controls={false}
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
      case 'SELECT':
        return (
          <Select
            placeholder={placeholder || 'Select'}
            disabled={disabled}
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
