import type NavLink from "@/types/NavLink";

const mainNavItems:NavLink[] = [
  {
    id: 1,
    title: 'Главная',
    path: '/',
    name: 'home'
  },
  {
    id: 2,
    title: 'Жанры',
    path: '/movie/genres',
    name: 'genres'
  }
];

export default mainNavItems;
