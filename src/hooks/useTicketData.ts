import { useState, useEffect, useCallback } from "react";
import { EventType } from "../types/EventType";

// Custom Hook for fetching events by keyword or genre
const useTicketData = (keyword: string) => {
  const [data, setData] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

  const fetchEvents = useCallback(async () => {
    if (!keyword || keyword.length < 3) return; // Only fetch if keyword is at least 3 characters

    setLoading(true);
    setError(null);

    try {
      if (!API_KEY) {
        throw new Error(
          "Missing API Key. Make sure VITE_TICKETMASTER_API_KEY is defined in your .env file.",
        );
      }

      const BASE_URL = "https://app.ticketmaster.com/discovery/v2/events";
      const LAT_LONG = "25.67507,-100.31847"; // Monterrey latitude and longitude
      const RADIUS = 30; // Increase radius in kilometers to get more events

      const keywordParam = keyword
        ? `&keyword=${encodeURIComponent(keyword)}`
        : "";
      const url = `${BASE_URL}?apikey=${API_KEY}&latlong=${LAT_LONG}&radius=${RADIUS}&unit=km&countryCode=MX${keywordParam}`;

      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests - Rate limit exceeded");
        }
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setData(result._embedded?.events || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [keyword, API_KEY]);

  // Debounce the request to reduce API calls when keyword changes
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [fetchEvents]);

  return { data, loading, error, fetchEvents };
};

export default useTicketData;
