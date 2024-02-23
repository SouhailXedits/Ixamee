import { ErrorMessage, useField } from 'formik';
import { useState } from 'react';

const Input = ({ required, label = '', type = 'text', placeholder = '', className = '', ...props }: any) => {
  const [field, meta] = useField(props);
  const [show, setShow] = useState(false);
  return (
    <div className="text_field_container">
      <label htmlFor={field?.name} className="label">
        {label}
        {required && <p className="required">*</p>}
      </label>

      <span className="input_container">
        <input
          placeholder={placeholder}
          autoComplete="off"
          id={field?.name}
          type={type !== 'password' ? type : show ? 'text' : 'password'}
          {...props}
          {...field}
          className={`input ${className} ${meta?.touched && meta?.error && 'is-invalid'}`}
        />
        {type === 'password' && (
          <i
            className={`fa-solid ${show ? 'fa-eye-slash' : 'fa-eye'}  input-icon`}
            onClick={() => setShow(!show)}
          ></i>
        )}
      </span>

      <ErrorMessage component="div" name={field?.name} className="error" />
    </div>
  );
};

// Input.defaultProps = {
//   label: '',
//   type: 'text',
//   placeholder: '',
//   className: '',
// };

export default Input;
