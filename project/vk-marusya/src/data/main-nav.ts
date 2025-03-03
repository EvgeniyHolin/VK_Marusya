import type NavLink from "@/types/NavLinkType";

const mainNavItems: NavLink[] = [
  {
    id: 1,
    title: 'Главная',
    path: '/',
    name: 'home'
  },
  {
    id: 2,
    title: 'Жанры',
    path: '/movie',
    name: 'genres'
  }
];

export default mainNavItems;
