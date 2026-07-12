// src/hooks/useFormattedDate.ts
import { DateTime } from "luxon";

const formatDate = (localDate: string, localTime?: string) => {
  // Parse the localDate and localTime to create a full ISO date string
  const localDateTime = localTime ? `${localDate}T${localTime}` : localDate;

  // Convert to Luxon DateTime, adjusting for Mexico time zone
  const dateTime = DateTime.fromISO(localDateTime, {
    zone: "America/Mexico_City",
  });

  // Format the date into the desired string
  return dateTime.toFormat("dd/MMM/yyyy • h:mm a");
};

export default formatDate;
