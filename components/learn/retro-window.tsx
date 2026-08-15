import type { ReactNode } from "react";

type RetroWindowProps = {
  children: ReactNode;
  title: string;
  className?: string;
  contentClassName?: string;
};

export function RetroWindow({
  children,
  title,
  className = "",
  contentClassName = "",
}: RetroWindowProps) {
  return (
    <div className={`learn-window ${className}`}>
      <div className="learn-window__titlebar">
        <span className="learn-window__title">
          <span className="learn-window__computer" aria-hidden="true">
            <span />
          </span>
          {title}
        </span>
        <span className="learn-window__controls" aria-hidden="true">
          <span className="learn-window__control learn-window__minimize">
            —
          </span>
          <span className="learn-window__control learn-window__maximize">
            □
          </span>
          <span className="learn-window__control learn-window__close">×</span>
        </span>
      </div>
      <div className={`learn-window__content ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
}
