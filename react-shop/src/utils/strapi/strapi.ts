export function getStrapiMedia(url: string | null) {
  if (!url) return "";
  return url.startsWith("/") ? `http://localhost:1337${url}` : url;
}

export const buildStrapiQuery = (searchParams: URLSearchParams) => {
  const query = new URLSearchParams();

  query.set("populate[images]", "true");
  query.set("populate[category]", "true");
  query.set("populate[gender]", "true");

  const categories = searchParams.getAll("category");
  const genders = searchParams.getAll("gender");
  const inStock = searchParams.get("inStock") === "true";
  const priceFrom = searchParams.get("priceFrom");
  const priceTo = searchParams.get("priceTo");

  if (categories.length > 0) {
    categories.forEach((slug, index) => {
      query.set(`filters[category][slug][$in][${index}]`, slug);
    });
  }

  if (genders.length > 0) {
    genders.forEach((slug, index) => {
      query.set(`filters[gender][slug][$in][${index}]`, slug);
    });
  }

  if (inStock) {
    query.set("filters[inStock][$gt]", "0");
  }

  if (priceFrom) {
    query.set("filters[price][$gte]", priceFrom);
  }

  if (priceTo) {
    query.set("filters[price][$lte]", priceTo);
  }

  return "?" + query.toString();
};
