import React, { useEffect, useState } from 'react';

interface SelectProps {
  className?: string;
  name: string;
  formik?: any;
  placeholder?: string;
  options: { value: string; label: string }[];
}

function Select({ className, name, formik, placeholder, options }: SelectProps) {
  const handleChange = (e: any) => {
    if (formik) formik.setFieldValue(name, e.target.value);
    console.log(e.target.value);
  };

  const [colourStyles, setColourStyles] = useState({});

  useEffect(() => {
    setColourStyles({
      multiValueLabel: (styles: any) => ({
        ...styles,
        marginRight: '3px',
        color: '#333',
        fontSize: '2rem',
      }),
      multiValue: (styles: any) => ({
        ...styles,
        fontSize: '2rem',
        padding: '4px',
        backgroundColor: '#E7E8EA',
        borderRadius: '8px',
        background: '#f0f6f8',
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        cursor: 'pointer',
      }),
      clearIndicator: (styles) => ({
        ...styles,
        '&:hover': {
          color: 'unset',
        },
        cursor: 'pointer',
        svg: {
          fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        },
      }),
      input: (styles, { isFocused, isSelected, ...rest }) => ({
        ...styles,
        color: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        fontSize: '2rem',
      }),
      control: (styles, { isFocused, isSelected, ...rest }) => ({
        ...styles,
        cursor: 'pointer',
        backgroundColor: `${theme === 'dark' ? '#161A22 !important' : 'white !important'}`,
        boxShadow: 'none !important',
        outline: 'none',
        border: '0px',
        borderColor: `${theme === 'dark' ? '#8B949E !important' : '#cbd5e1 !important'}`,
        borderRadius: '10px !important',
        ...(height ? { minHeight: `${height} !important` } : { minHeight: '50px !important' }),
        fontSize: '2rem',
      }),
      menuList: (styles) => ({
        ...styles,
        background: `${theme === 'dark' ? '#0d1117 !important' : 'white !important'}`,
        borderRadius: '10px !important',
        fontSize: '2rem',
      }),
      option: (styles, { isFocused, isSelected }) =>
        isSelected
          ? {
              ...styles,
              background: '#99C6D3',
              fontSize: '2rem',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              color: '#727272 ',
            }
          : isFocused
          ? {
              ...styles,
              background: '#F0F6F8',
              fontSize: '2rem',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              color: '#727272 ',
            }
          : {
              ...styles,
              color: `${theme === 'dark' ? '#8b949e !important' : '#727272 !important'}`,
              zIndex: 1,
              cursor: 'pointer',
              fontSize: '2rem',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
            },
      menu: (base) => ({
        ...base,
        zIndex: 1000,
        fontSize: '2rem',
        background: 'white',
        borderRadius: '8px',
        ...(Prefix
          ? {
              marginLeft: '-5%',
              width: '105%',
            }
          : {}),
        ...(topMenu
          ? {
              position: 'absolute',
              top: '-700%',
            }
          : {}),
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: 'none',
        fontSize: '2rem',
      }),
      dropdownIndicator: (provided) => ({
        ...provided,
        svg: {
          fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        },
        fontSize: '2rem',
      }),
      loadingIndicator: (styles) => ({
        ...styles,
        filter: `${theme === 'dark' ? 'invert(50%)' : 'invert(0%)'}`,
        fontSize: '2rem',
        display: 'none',
      }),
    });
  }, []);

  return (
    <div className={`select-conatiner ${className ? className : ''}`}>
      <select
        className={`select ${className ? className + '-select' : ''}`}
        name={name}
        placeholder={placeholder}
        onChange={(e) => handleChange(e)}
      >
        {options?.map((el) => (
          <option key={el.value} value={el.value}>
            {el.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
