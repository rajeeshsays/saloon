import { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    | "ghost"
    | "accent"
    | "danger"
    | "success"
    | "info"
    | "muted";

  children: ReactNode;

  style?: CSSProperties;
};

export  type InputProps =
  React.InputHTMLAttributes<HTMLInputElement> & {
    style?: CSSProperties;
  };

export  type SelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    children: ReactNode;
    style?: CSSProperties;
  };
  export type LabelProps = {
  children: ReactNode;
};

export type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};
export type ToolbarButton = {
  label: string;
  icon?: ReactNode;
  variant?: string;
  onClick?: () => void;
  style?: CSSProperties;
};