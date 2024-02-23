import { ErrorMessage } from 'formik';
import React, { useState } from 'react';
import uuid from 'react-uuid';

function ColorSinglePicker({ colors, name, formik }: any) {
  const [selected, setSelected] = useState(
    formik.values.color ? formik.values.color : { dark: '', light: '' }
  );
  return (
    <>
      <div className="color-picker-container">
        {colors.map((color: any) => (
          <button
            key={uuid()}
            type="button"
            onClick={() => {
              setSelected(color);
              formik.setFieldValue(name, color);
            }}
            className={`color-picker-color  ${
              selected?.dark === color?.dark && selected?.light === color?.light ? 'selected' : ''
            }`}
            style={{ borderLeft: `5px solid ${color?.dark} `, backgroundColor: color?.light }}
          ></button>
        ))}
      </div>
      <ErrorMessage component="div" name={name} className="error" />
    </>
  );
}

export default ColorSinglePicker;
