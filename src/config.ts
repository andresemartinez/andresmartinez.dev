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
      name: "Github",
      href: "https://github.com/andresemartinez",
    },
  ],
};
