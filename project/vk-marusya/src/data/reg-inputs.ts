import type InputType from "@/types/InputType";
import IconMail from '@/assets/icons/icon-mail.svg';
import IconKey from '@/assets/icons/icon-key.svg';
import IconPerson from '@/assets/icons/icon-person.svg';

const regInputs: InputType[] = [
  {
    id: 1,
    name: 'email',
    type: 'text',
    placeholder: 'Электронная почта',
    icon: IconMail
  },
  {
    id: 2,
    name: 'name',
    type: 'text',
    placeholder: 'Имя',
    icon: IconPerson
  },
  {
    id: 3,
    name: 'surname',
    type: 'text',
    placeholder: 'Фамилия',
    icon: IconPerson
  },
  {
    id: 4,
    name: 'password',
    type: 'password',
    placeholder: 'Пароль',
    icon: IconKey
  },
  {
    id: 5,
    name: 'repeatPassword',
    type: 'password',
    placeholder: 'Подтвердите пароль',
    icon: IconKey
  }
];

export default regInputs;
