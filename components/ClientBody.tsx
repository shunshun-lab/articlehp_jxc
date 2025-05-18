"use client";

import { useEffect, useState } from "react";

interface ClientBodyProps {
  children: React.ReactNode;
  className: string;
}

export default function ClientBody({ 
  children,
  className,
}: ClientBodyProps) {
  const [bodyStyle, setBodyStyle] = useState<React.CSSProperties>({});
  
  useEffect(() => {
    // クライアント側でのみ適用されるスタイル
    setBodyStyle({
      overscrollBehaviorX: "auto",
    });
  }, []);

  return (
    <body className={className} style={bodyStyle}>
      {children}
    </body>
  );
} 