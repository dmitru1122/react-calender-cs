import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { Select, SelectItem, Button } from 'carbon-components-react';
import { Container, Row, Col } from 'reactstrap';
import './FormRequest.scss';
import PropTypes from 'prop-types';

const selectItemList = [
  { text: 'Annual Leave - Full', value: 'Annual Leave - Full' },
  { text: 'Annual Leave - Morning', value: 'Annual Leave - Morning' },
  { text: 'Annual Leave - Afternoon', value: 'Annual Leave - Afternoon' },
  { text: 'Sick Leave', value: 'Sick Leave' },
  { text: 'Dependant Leave', value: 'Dependant Leave' },
  { text: 'Compassionate Leave', value: 'Compassionate Leave' },
  { text: 'Jury Duty', value: 'Jury Duty' },
  { text: 'Public Holiday', value: 'Public Holiday' },
  { text: 'Purchased Leave', value: 'Purchased Leave' },
  { text: 'Unpaid Leave', value: 'Unpaid Leave' },
  { text: 'Training', value: 'Training' },
  { text: 'Other', value: 'Other' },
];

const FormRequest = (props) => {
  const { title, initialData, action } = props;
  const [formData, setFormData] = useState({ initialData });
  const [isValid, setIsValid] = useState(false);
  const onSubmit = (values, form) => {
    action(values, form);
  };

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  return (
    <Container className='form'>
      {title && <h2 className='form__title'>{title}</h2>}
      <Form
        onSubmit={onSubmit}
        initialValues={formData}
        validate={(values) => {
          if (values.purpose) {
            setIsValid(true);
          } else {
            setIsValid(false);
          }
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit} data-testid='form'>
            <Row>
              <Col className='col-md-12'>
                <Field name='purpose'>
                  {({ input, meta }) => (
                    <div className='form__field'>
                      <Select
                        {...input}
                        required
                        id='select-1'
                        data-testid='purpose-select'
                        invalidText='This is an invalid error message.'
                        invalid={meta.error && meta.touched}
                        labelText='Select purpose of the request'>
                        <SelectItem
                          text={values.purpose || 'Annual Leave - Full'}
                          value={values.purpose || ''}
                          disabled
                        />
                        {selectItemList.map((item) => (
                          <SelectItem text={item.text} key={item.text} value={item.value} />
                        ))}
                      </Select>
                    </div>
                  )}
                </Field>
              </Col>
            </Row>
            <Row className='justify-content-center'>
              <Col className='d-flex form__field'>
                <Button
                  kind={!isValid ? 'danger--tertiary' : 'tertiary'}
                  type='submit'
                  className={`form__submit-btn ${!isValid && 'button--disabled bx--btn--danger--tertiary'}`}>
                  {!isValid ? 'Disabled' : 'Submit'}
                </Button>
              </Col>
              <Col className='d-flex form__field'>
                <Button
                  kind={submitting || pristine ? 'danger--tertiary' : 'tertiary'}
                  disabled={submitting || pristine}
                  className={`form__reset-btn ${
                    (submitting || pristine) && 'button--disabled bx--btn--danger--tertiary'
                  }`}
                  onClick={form.reset}
                  type='button'>
                  Reset
                </Button>
              </Col>
            </Row>
          </form>
        )}
      />
    </Container>
  );
};

FormRequest.propTypes = {
  title: PropTypes.string,
  initialData: PropTypes.shape({
    id: PropTypes.string,
    purpose: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    gender: PropTypes.string,
  }),
  action: PropTypes.func,
};
FormRequest.defaultProps = {
  title: null,
  initialData: { id: '', purpose: '', firstName: '', lastName: '', gender: '' },
  action: null,
};

export default FormRequest;
