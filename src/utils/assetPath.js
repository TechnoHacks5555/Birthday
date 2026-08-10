export function resolveAssetPath(path) {
  if (!path || typeof path !== "string") {
    return path;
  }

  // Keep URLs and data URIs unchanged.
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(path) || path.startsWith("data:")) {
    return path;
  }

  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
