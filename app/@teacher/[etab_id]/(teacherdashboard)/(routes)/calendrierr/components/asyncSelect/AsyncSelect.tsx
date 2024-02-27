// 'use client'
// @ts-nocheck
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
import { AsyncPaginate } from 'react-select-async-paginate';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

const AsyncSelect = ({
  setState,
  isMulti = false,
  disabled = false,
  loadPageOptions,
  options,
  required,
  handleChange,
  defaultValue,
  border = true,
  placeholder,
  Prefix,
  onlyId = true,
  name,
  height,
  className,
  value,
  label,
  classNamePrefix,
  formik,
  form,
  topMenu = false,
  error = false,
}: any) => {
  //

  // const theme = useSelector((state) => state?.theme?.mode);
  const theme = 'light';
  const colourStyles = {
    multiValueLabel: (styles: any) => {
      return {
        ...styles,
        marginRight: '3px',
        color: '#333',
        fontSize: '1rem',
      };
    },
    multiValue: (styles: any) => {
      return {
        ...styles,
        fontSize: '1rem',
        padding: '4px',
        backgroundColor: '#E7E8EA',
        borderRadius: '8px',
        background: '#f0f6f8',
      };
    },

    multiValueRemove: (styles) => {
      return {
        ...styles,
        cursor: 'pointer',
      };
    },
    clearIndicator: (styles) => {
      return {
        ...styles,
        '&:hover': {
          color: 'unset',
        },
        cursor: 'pointer',
        svg: {
          fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        },
      };
    },
    input: (styles, { isFocused, isSeleced, ...rest }) => {
      return {
        ...styles,
        color: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
        fontSize: '1rem',
      };
    },
    control: (styles, { isFocused, isSelected, ...rest }) => {
      return {
        ...styles,
        cursor: 'pointer',
        backgroundColor: `${theme === 'dark' ? '#161A22 !important' : 'white !important'}`,
        boxShadow: 'none !important',
        outline: 'none',
        border: '0px',
        borderColor: `${theme === 'dark' ? '#8B949E !important' : '#cbd5e1 !important'}`,
        borderRadius: '10px !important',
        ...(height ? { minHeight: `${height} !important` } : { minHeight: '50px !important' }),
        fontSize: '1rem',
      };
    },
    menuList: (styles) => ({
      ...styles,
      background: `${theme === 'dark' ? '#0d1117 !important' : 'white !important'}`,
      borderRadius: '10px !important',
      fontSize: '1rem',
    }),
    option: (styles, { isFocused, isSelected }) => {
      return isSelected
        ? {
            ...styles,
            background: '#99C6D3',
            fontSize: '1rem',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
            color: '#727272 ',
          }
        : isFocused
        ? {
            ...styles,
            background: '#F0F6F8',
            fontSize: '1rem',
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
            fontSize: '1rem',
            height: '30px',
            display: 'flex',
            alignItems: 'center',
          };
    },

    menu: (base) => ({
      ...base,
      zIndex: 1000,
      fontSize: '1rem',
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
      fontSize: '1rem',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: `${theme === 'dark' ? '#8b949e !important' : '#333 !important'}`,
      },
      fontSize: '1rem',
    }),
    loadingIndicator: (styles) => {
      return {
        ...styles,
        filter: `${theme === 'dark' ? 'invert(50%)' : 'invert(0%)'}`,
        fontSize: '1rem',
        display: 'none',
      };
    },
  };

  const defaultAdditional = {
    page: 1,
  };

  return (
    <div className={`select-async ${className ? className : ''}`}>
      {label && (
        <p className="children-select-name">
          {label}
          {required && <span style={{ color: 'red' }}>*</span>}
        </p>
      )}
      <div
        className={`${
          formik
            ? formik?.errors[name]
            : form?.getFieldError()[name]
            ? 'select-container-error'
            : ''
        } ${border ? 'select-container' : 'select-container-borderless'}`}
      >
        {Prefix && <Prefix />}
        {loadPageOptions ? (
          <AsyncPaginate
            isDisabled={disabled}
            isMulti={isMulti}
            defaultValue={defaultValue || formik?.initialValues[name] || form?.initialValues}
            placeholder={placeholder}
            styles={colourStyles}
            onChange={(value: any) => {
              if (setState) setState(value.value);
              if (handleChange) handleChange(value);
              if (name && formik)
                formik.setFieldValue(
                  name,
                  isMulti
                    ? onlyId
                      ? value?.map((el: { value: string; label: string }) => el?.value)
                      : value
                    : onlyId
                    ? value.value
                    : value
                );
              if (name && form)
                form.setFieldValue(
                  name,
                  isMulti
                    ? onlyId
                      ? value?.map((el: { value: string; label: string }) => el?.value)
                      : value
                    : onlyId
                    ? value.value
                    : value
                );
            }}
            additional={defaultAdditional}
            options={options}
            loadOptions={loadPageOptions}
          />
        ) : (
          <Select
            styles={colourStyles}
            className={className ? className : ''}
            classNamePrefix={classNamePrefix}
            defaultValue={defaultValue || value}
            isDisabled={disabled}
            isClearable={true}
            isRtl={false}
            isSearchable={true}
            placeholder="Sélectionner la matière"
            name={name}
            value={value}
            options={options}
            onChange={(value: any) => {
              if (setState) setState(value.value);
              if (handleChange) handleChange(value);
              if (name && formik) {
                formik.setFieldValue(
                  name,
                  isMulti
                    ? onlyId
                      ? value?.map((el: { value: string; label: string }) => el?.value)
                      : value
                    : onlyId
                    ? value.value
                    : value
                );
              }
              if (name && form)
                form.setFieldValue(
                  name,
                  isMulti
                    ? onlyId
                      ? value?.map((el: { value: string; label: string }) => el?.value)
                      : value
                    : onlyId
                    ? value.value
                    : value
                );
            }}
          />
        )}
      </div>
      {error && <ErrorMessage component="div" name={name} className="error" />}
    </div>
  );
};

export default AsyncSelect;
