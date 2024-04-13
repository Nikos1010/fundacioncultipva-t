'use client';
import { createRef, useState, ChangeEvent } from 'react';
import ActionButton from '@/components/ActionButton/ActionButton';
import CustomForm from '@/components/Form/CustomForm';
import InputForm from '@/components/InputForm/InputForm';
import { regex } from '@/constants';
import { InterInputForm } from '@/interfaces/default';
import SelectCountries from '@/components/SelectCountries';
import PopUp from '@/components/Popup';
import Checkbox from '@mui/material/Checkbox';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import style from '@/components/InputForm/inputForm.module.css';

interface Props {
  title: string;
  setIsSubmit?: any;
}

interface inputRef extends InterInputForm {
  isValidInput: () => Boolean;
}

const MESSAGE_ERROR = {
  email: 'email_error',
  name: 'name_error',
  subject: 'subject_error'
};

function FormEmail({ title, setIsSubmit }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [contentPop, setContentPop] = useState('');
  const emailInput = createRef<inputRef>();
  const nameInput = createRef<inputRef>();
  const subjectInput = createRef<inputRef>();
  const { t } = useTranslation();

  const sendEmail = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const target = event.target;
    const formData = new FormData(target);
    const data = Object.fromEntries(formData);

    const isComplete = {
      email: emailInput.current?.isValidInput(),
      name: nameInput.current?.isValidInput(),
      subject: subjectInput.current?.isValidInput(),
      country: !!data.country
    };

    const validateInputs = Object.values(isComplete).every(value => value);
    if (!validateInputs) {
      setLoading(false);
      return;
    }

    const sendData = {
      ...data,
      subject: title
    };

    const resStatus = await fetch('/api/send', {
      method: 'POST',
      body: JSON.stringify(sendData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const res = await resStatus.json();
    setContentPop(res.data?.id ? 'correctEmail' : 'somethingError');

    setOpen(true);

    if (res.data?.id) {
      target.reset();
      if (setIsSubmit) setIsSubmit(true);
    }
    setLoading(false);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <CustomForm title={title} onSubmit={sendEmail}>
      <SelectCountries />
      <br />

      <InputForm
        name="firstName"
        title="Nombre"
        msgError={MESSAGE_ERROR.name}
        validator={regex.name}
        ref={nameInput}
      />

      <InputForm
        name="email"
        title="Correo electronico"
        type="email"
        msgError={MESSAGE_ERROR.email}
        validator={regex.email}
        ref={emailInput}
      />

      <InputForm
        name="body"
        title="Asunto"
        type="text"
        msgError={MESSAGE_ERROR.subject}
        validator={regex.subject}
        ref={subjectInput}
      />

      <label style={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={checked} onChange={handleChange} />
        {t('terms_conditions__phrase')}
        <Link href="/assets/Tratamiento_de_datos_2023.pdf" target="_blank"
              style={{ color: 'black', fontWeight: 'bold' }}>
          {t('terms_conditions')}
        </Link>
      </label>

      <ActionButton textButton="send" isButton={true} checkButton={checked} />

      <PopUp open={open} content={contentPop} />
      {loading && (
        <div className="container-loading">
          <div className="loading-spinner"></div>
        </div>
      )}
    </CustomForm>
  );
}

export default FormEmail;
