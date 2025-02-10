import type FooterLink from "@/types/FooterLinkType";
import IconVk from '@/assets/icons/icon-vk.svg';
import IconYouTube from '@/assets/icons/icon-youtube.svg';
import IconOk from '@/assets/icons/icon-ok.svg';
import IconTg from '@/assets/icons/icon-telegram.svg';

const footerInfo: FooterLink[] = [
  {
    id: 1,
    icon: IconVk,
    link: 'https://vk.com/'
  },
  {
    id: 2,
    icon: IconYouTube,
    link: 'https://www.youtube.com/'
  },
  {
    id: 3,
    icon: IconOk,
    link: 'https://ok.ru/'
  },
  {
    id: 4,
    icon: IconTg,
    link: 'https://web.telegram.org/'
  },
];

export default footerInfo;
