import React from "react";
import { defaultDrawer } from "./DefaultDrawer";
import { Print, Drawer, Element } from "./Types";
import "./style.scss";

// => LOOP DETECTOR ? (circulary refence, mayby use symbol ?)
// give absolute_path for filters ?

function Print(props: Print) {
  let value: any = props.value;
  let name: string = props.name ?? "";
  let drawer: Drawer = props.drawer ?? defaultDrawer;
  let maxDeepness: number = props.maxDeepness ?? 0;
  let deepness: number = 0; // accumulatore
  //@ts-ignore
  let path = [];
  return (
    <div className="printer">
      {selectDrawer({
        name,
        value,
        drawer,
        deepness,
        maxDeepness,
        mainDrawer: drawer,
        selectDrawer: selectDrawer,
        //@ts-ignore
        path: path,
      })}
    </div>
  );
}
// EN CAS DE COMPONENT WRAPPER. ON NE VEUT PAS AVOIR A REDEFINIR SYSTEMATIQUEMENT
// SON "SUBDRAWER" ASSOCIE (SI IL EXISTE) COMME ETANT LE NOUVEAU DRAWER.
// L'INJECTER ICI (SANS L'EXECUTER) SI LE COMPONENT WRAPPER DOIT ETRE AFFICHE.
// ET LAISSER LE COMPONENT WRAPPER DECIDER DE SI IL CONTINUE L'AFFICHAGE DE
// SES PROPRES ENFANTS AVEC LEDIT SUBDRAWER
// OU LE LAISSER EN REDEFINIR UN NOUVEAU.
// LE LAISSER FINALEMENT EXECUTER LES ENFANTS
export function selectDrawer(props: Element): JSX.Element | null {
  for (const key in props.drawer) {
    console.log(`${key}: ${props.drawer[key]}`);
  }

  for (let i = 0, l = props.drawer.length; i < l; i++) {
    let { filter, component, subDrawer } = props.drawer[i];
    if (!filter || filter(props)) {
      let result: JSX.Element | null = null;

      //@ts-ignore
      //props.path.push(`${props.name} `);

      props.selectDrawer = (newProps) =>
        selectDrawer({
          ...props,
          drawer: subDrawer,
          deepness: props.deepness + 1,
          ...newProps,
        });

      if (subDrawer) {
        result = selectDrawer({
          ...props,
          drawer: subDrawer,
          selectDrawer: selectDrawer,
          deepness: props.deepness + 1,
          //@ts-ignore
          path: [...props.path, `PRINT_SUB:${props.name}`],
        });
      }

      if (component) result = component(props);

      if (result) {
        return result;
      }
    }
  }
  return null;
}
export { Drawer };
export default Print;
