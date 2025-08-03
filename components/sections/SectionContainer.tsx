import React from "react";

export const SectionContainer = ({
  children,
  id,
  className,
}: React.PropsWithChildren<{ id: string; className?: string }>) => {
  return (
    <section id={id} className={`w-full relative flex justify-center z-30 ${className ?? ""}`}>
      {children}
    </section>
  );
};
