import React from 'react';


interface IconProps {
   icon: string;
   styles?: string;
   type?: string;
   classes?: string;
}


const Icon = ({icon, type, classes, styles}: IconProps) => {
   function getFullClass(): string {
       let fullClasses = "icon";
       fullClasses += " fa-" + icon;
       fullClasses += styles ? " fa-" + styles : " fa-solid";
       fullClasses += (type && type !== "") ? " fa-" + type : "";
       fullClasses += " " + classes;
       return fullClasses;
   }
    return (
     <span className={getFullClass()} />
   );
};


export default Icon;



