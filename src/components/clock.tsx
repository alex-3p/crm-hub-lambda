"use client";

import * as React from "react";
import { format } from "date-fns";
import { es } from 'date-fns/locale';

export function Clock() {
  const [time, setTime] = React.useState<Date | null>(null);

  React.useEffect(() => {
    // Set initial time on client-side mount to avoid hydration mismatch
    setTime(new Date());

    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const formattedTime = time ? format(time, "HH:mm:ss") : "00:00:00";
  const formattedDate = time ? format(time, "eeee, d 'de' MMMM", { locale: es }) : "...";
  
  // Capitalize first letter of the date
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <div className="hidden md:flex flex-col items-end text-right">
      <div className="text-sm font-medium text-foreground tabular-nums">
        {formattedTime}
      </div>
      <div className="text-xs text-muted-foreground">
        {capitalizedDate}
      </div>
    </div>
  );
}
