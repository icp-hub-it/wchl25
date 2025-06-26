/**
 * @description Retrieves UTM tags from the current URL.
 * @returns An object containing UTM tags as key-value pairs.
 */
export const getUtmTags = (): Record<string, string> => {
  if (typeof window === "undefined") {
    return {};
  }

  const params = new URLSearchParams(window.location.search);
  const utmTags: Record<string, string> = {};

  params.forEach((value, key) => {
    if (key.startsWith("utm_")) {
      utmTags[key] = value;
    }
  });

  return utmTags;
};

/**
 * @description Encodes an object of query parameters into a URL query string.
 * @param params
 * @returns A URL-encoded query string.
 */
export const encodeQueryParams = (
  params: Record<string, string | number | boolean>,
): string => {
  const queryString = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  });

  return queryString.toString();
};
