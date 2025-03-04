import { use } from "react";
import { ListContext } from "../store/list-context";

export default function MenuListItem({ item }) {
  const { handleSelectList, selectedList } = use(ListContext);

  let menuClasses = "w-full text-left px-6 py-2 hover:bg-slate-200";

  if (selectedList?.id === item.id) {
    menuClasses = menuClasses + " bg-slate-200 border-l-5 border-blue-400";
  } else {
    menuClasses = menuClasses + " border-l-5 border-slate-100";
  }

  return (
    <button className={menuClasses} onClick={() => handleSelectList(item.id)}>
      <span>{item.icon}</span>
      <span className="ml-3">{item.title}</span>
    </button>
  );
}
