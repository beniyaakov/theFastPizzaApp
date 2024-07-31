import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

type MenuType = {
  id: number;
  imageUrl: string;
  ingredients: string[];
  name: string;
  soldOut: boolean;
  unitPrice: number;
};

function Menu() {
  const menu = useLoaderData() as MenuType[];

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => {
        return <MenuItem pizza={pizza} key={pizza.id} />;
      })}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
