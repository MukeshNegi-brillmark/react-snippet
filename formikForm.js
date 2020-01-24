// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Basic = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field type="email" name="email" />
          <ErrorMessage name="email" component="div" />
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default Basic;


------------------------------------------------------------------------------------------------------------------------------
//Formik validation
------------------------------------------------------------------------------------------------------------------------------

//field level validation
import React from 'react';
import { Formik, Form, Field } from 'formik';

function validateEmail(value) {
  let error;
  if (!value) {
    error = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address';
  }
  return error;
}

function validateUsername(value) {
  let error;
  if (value === 'admin') {
    error = 'Nice try!';
  }
  return error;
}

export const FieldLevelValidationExample = () => (
  <div>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        username: '',
        email: '',
      }}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched, isValidating }) => (
        <Form>
          <Field name="email" validate={validateEmail} />
          {errors.email && touched.email && <div>{errors.email}</div>}

          <Field name="username" validate={validateUsername} />
          {errors.username && touched.username && <div>{errors.username}</div>}

          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

----------------------------------------------------------------------------------------------------------------------------------
//Radio and checkbox, select, multiselect
----------------------------------------------------------------------------------------------------------------------------------

import { Formik, Field } from "formik"

//checkbox
const App = () => (
  <div className="app">
    <Formik initialValues={{ isEnabled: true }}>
        return (
          <div>
            <Field type="checkbox" name="isEnabled" value="test" />
          </div>
        )
    </Formik>
  </div>
)

----------------------------
//Radio

import { Form, withFormik, Field } from "formik";

function App({ values }) {
  return (
    <Form>
      <Field component="div" name="myRadioGroup">
        <input
          type="radio"
          id="radioOne"
          defaultChecked={values.myRadioGroup === "one"}
          name="myRadioGroup"
          value="one"
        />
        <label htmlFor="radioOne">One</label>

        <input
          type="radio"
          id="radioTwo"
          defaultChecked={values.myRadioGroup === "two"}
          name="myRadioGroup"
          value="two"
        />
        <label htmlFor="radioTwo">Two</label>
      </Field>
      <button type="submit">Submit</button>
    </Form>
  );
}

const FormikApp = withFormik({
  mapPropsToValues({ myRadioGroup }) {
    return {
      myRadioGroup: myRadioGroup || "two"
    };
  },
  handleSubmit(values) {
    console.log(values);
  }
})(App);

-------------------------------------------
//select


<select
  name="color"
  value={values.color}
  onChange={handleChange}
  onBlur={handleBlur}
  style={{ display: 'block' }}
>
  <option value="" label="Select a color" />
  <option value="red" label="red" />
  <option value="blue" label="blue" />
  <option value="green" label="green" />
</select>
----------------------------------
// multi select example

import { FieldProps } from "formik";
import Select from "react-select";
import { OptionsType, ValueType } from "react-select/lib/types";

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps extends FieldProps {
  options: OptionsType<Option>;
  isMulti?: boolean;
}

export const CustomSelect = ({
  field,
  form,
  options,
  isMulti = false,
}: CustomSelectProps) => {
  const onChange = (option: ValueType<Option | Option[]>) => {
    form.setFieldValue(
      field.name,
      isMulti
        ? (option as Option[]).map((item: Option) => item.value)
        : (option as Option).value
    );
  };
  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value === field.value);
    } else {
      return isMulti ? [] : ("" as any);
    }
  };
  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
    />
  );
};