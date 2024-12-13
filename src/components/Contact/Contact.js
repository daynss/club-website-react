import React, {useState} from "react";
import { Form, Field } from 'react-final-form'
import { FormInputField, FormTextArea } from "./../Form/FormInputs";
import { empty, minLength, emailFormat } from "./../Form/Validator";
import Spinner from "../BasicComponents/Spinner/Spinner";
import Divider from "../BasicComponents/Divider/Divider";
import Button from "../BasicComponents/Button/Button";

const validate = ({ email, subject, message }) => {
    const errors = {};
  
    if (empty(email)) {
      errors.email = "Required";
    } else if (emailFormat(email)) {
      errors.email = "Incorrect email format";
    }
  
    if (empty(subject)) {
      errors.subject = "Required";
    } else if (minLength(subject)) {
      errors.subject = "Must be more than 2 characters";
    }
  
    if (empty(message)) {
      errors.message = "Required";
    } else if (minLength(message)) {
      errors.message = "Must be more than 2 characters";
    }
  
    return errors;
  };


const Contact = () => {
    const [submitSucceeded, setSubmitSucceeded] = useState(false);
        
    return (
        <div className="contact">
            <div className="contact-wrapper">
            {submitSucceeded ? (
                <div className="contact-form-success" data-test="contact-form-success">
                <p>Thank you for your message!</p>
                <p>We will get in touch soon.</p>
                </div>
            ) : (
                <Form
                onSubmit={() => new Promise((resolve) => setTimeout(resolve, 2000)).then(() => setSubmitSucceeded(true))}
                validate={values => validate(values)}
                >
                    {({handleSubmit, pristine, form, submitting}) => (
                        <form className="contact-form" onSubmit={handleSubmit} data-test="contact-form">
                            <FormInputField name="email" type="email" label="Email" dataTest="contact-form-email" />
                            <FormInputField name="subject" type="text" label="Subject" dataTest="contact-form-subject" />
                            <FormTextArea name="message" label="Your message" dataTest="contact-form-textarea"/>

                            <Divider />
                            {submitting ? <Spinner /> : <Button type="submit" label="Send"/>}
                            <Divider />
                        </form>
                    )}
                </Form>
            )}
        </div>
    </div>
)};


export default Contact;
