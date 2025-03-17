import type InputType from "@/types/InputType";
import IconMail from '@/assets/icons/icon-mail.svg';
import IconKey from '@/assets/icons/icon-key.svg';

const authInputs: InputType[] = [
  {
    id: 1,
    name: 'email',
    type: 'text',
    placeholder: 'Электронная почта',
    icon: IconMail
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'Пароль',
    icon: IconKey
  }
];

export default authInputs;
