import { ErrorMessage } from 'formik';
import React, { useState, useEffect } from 'react';
import uuid from 'react-uuid';

type Color = {
  id: string;
  dark: string;
  light: string;
  name: string;
};

type ColorSinglePickerProps = {
  colors: Color[];
  name: string;
  formik: any; // replace with proper type definition
};

function ColorSinglePicker({ colors, name, formik }: ColorSinglePickerProps) {
  const [selected, setSelected] = useState(() => {
    const initialValue = formik.values.color;
    return { ...initialValue };
  });

  useEffect(() => {
    setSelected(formik.values.color);
  }, [formik.values.color]);

  return (
    <>
      <div className="color-picker-container">
        {colors.map((color: Color) => (
          <button
            key={color.id}
            type="button"
            onClick={() => {
              setSelected(color);
              formik.setFieldValue(name, color);
            }}
            disabled={selected.dark === color.dark && selected.light === color.light}
            className={`color-picker-color ${selected?.dark === color?.dark && selected?.light === color?.light ? 'selected' : ''}`}
            style={{ borderLeft: `5px solid ${color?.dark} `, backgroundColor: color?.light }}
            title={color.name}
          ></button>
        ))}
      </div>
      <ErrorMessage component="div"
