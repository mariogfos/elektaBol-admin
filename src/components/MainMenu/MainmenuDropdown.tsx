import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./mainmenu.module.css";
import { IconArrowDown, IconArrowUp } from "../layout/icons/IconsBiblioteca";
import { usePathname } from "next/navigation";

interface MainmenuDropdownProps {
  label: string;
  icon: React.ReactNode;
  items: { href: string; label: string }[];
  collapsed?: boolean;
}

const MainmenuDropdown: React.FC<MainmenuDropdownProps> = ({
  label,
  icon,
  items,
  collapsed,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRouteActive, setIsRouteActive] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Manejo del click fuera del dropdown para cerrarlo
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (collapsed) {
          setIsOpen(false); // Cierra el dropdown si está colapsado
        } else {
          if (!isRouteActive) {
            setIsOpen(false); // Si la ruta no está activa, cierra el dropdown
          }
        }
      }
    };

    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [isRouteActive, collapsed]);

  // Verifica si la ruta está activa para gestionar el estado del dropdown
  useEffect(() => {
    const isActive = items.some((item) => pathname === item.href);
    setIsRouteActive(isActive);
    if (!isActive) {
      setIsOpen(false); // Cierra el dropdown si la ruta no está activa
    }
  }, [pathname, items]);

  // Maneja el clic en los enlaces para cerrar el dropdown si está colapsado
  const handleLinkClick = () => {
    if (collapsed) {
      setIsOpen(false); // Cierra el dropdown si está colapsado
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`${styles.menuDropdown} ${isOpen ? `${styles.isOpen}` : ""} ${
        collapsed ? `${styles.collapsed}` : ""
      } ${isRouteActive ? `${styles.isRouteActive}` : ""}`}
    >
      <div onClick={toggleDropdown}>
        <div>
          {icon}
          {!collapsed && <p>{label}</p>}
        </div>
        {!collapsed && (!isOpen ? <IconArrowDown /> : <IconArrowUp />)}
      </div>

      {isOpen && (
        <div>
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`${pathname === item.href ? `${styles.active}` : ""}`}
              onClick={handleLinkClick} // Cierra el dropdown al hacer clic
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainmenuDropdown;
