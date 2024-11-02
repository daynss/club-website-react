import React from 'react';
import { Field } from 'react-final-form'

const isError = meta => meta.touched && meta.error;

const Error = ({value}) => <span className="form-field-error">{value}</span>;

const FormFieldHeader = ({label, error}) =>
    <div className="form-item-header">
        <label className="form-item-label">{label}</label>
        <Error value={error}/>
    </div>;

const renderInputField = ({input, label = '', type = "text", meta}) => {
    return (
        <div className="form-item">
            <FormFieldHeader label={label}
                             error={isError(meta) ? meta.error : null}/>
            <input className={isError(meta) ? "invalid-form-input" : null}
                   type={type}
                   {...input}/>
        </div>
    );
};

const renderTextAreaField = ({input, label = '', rows = "10", meta}) => {
    return (
        <div className="form-item">
            <FormFieldHeader label={label}
                             error={isError(meta) ? meta.error : null}/>
            <textarea className={isError(meta) ? "invalid-form-input" : null}
                      {...input}
                      rows={rows}/>
        </div>
    );
};

export const FormInputField = ({...props}) =>
    <Field {...props} component={renderInputField}/>;

export const FormTextArea = ({...props}) =>
    <Field component={renderTextAreaField}
           {...props}/>;

