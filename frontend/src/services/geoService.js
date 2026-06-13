/**
 * Performs reverse geocoding to resolve city, state, and ZIP code from coordinates.
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<string>} The resolved address description (City, State ZIP).
 */
export async function reverseGeocode(latitude, longitude) {
  const r = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
  );
  if (!r.ok) {
    throw new Error("Could not resolve location");
  }
  const d = await r.json();
  const city  = d.address?.city || d.address?.town || d.address?.village || "";
  const state = d.address?.state_code || d.address?.state || "";
  const zip   = d.address?.postcode || "";
  const val   = zip
    ? `${city ? city + ", " : ""}${state} ${zip}`.trim()
    : `${city}${state ? ", " + state : ""}`.trim();
  return val;
}
