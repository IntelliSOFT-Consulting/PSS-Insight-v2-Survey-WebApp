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

  const handleWheel = e => {
    console.log(e);
    e.preventDefault();
  };

  const renderInput = () => {
    switch (type) {
      case 'NUMBER':
        return (
          <InputNumber
            placeholder={placeholder}
            type='number'
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
      case 'STRING':
        return (
          <Input placeholder={placeholder} disabled={disabled} {...rest} />
        );
      default:
        return (
          <Input placeholder={placeholder} disabled={disabled} {...rest} />
        );
    }
  };
  return renderInput();
}
