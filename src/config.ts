export type MenuItem = {
  name: string;
  href: string;
};

export type Menu = {
  items: MenuItem[];
};

export const MENU: Menu = {
  items: [
    {
      name: "Inicio",
      href: "#",
    },
    {
      name: "Blog",
      href: "/blog",
    },
    {
      name: "Github",
      href: "https://github.com/andresemartinez",
    },
  ],
};
