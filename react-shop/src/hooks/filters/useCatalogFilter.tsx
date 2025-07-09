import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

// Services
import { apiService } from "@/services/apiService";

// Interfaces and Types
import { ICategory, IGender } from "@/types/apiTypes";

export function useCatalogFilter() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [genders, setGenders] = useState<IGender[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.getAll("category");
  const selectedGenders = searchParams.getAll("gender");
  const inStockOnly = searchParams.get("inStock") === "true";

  const priceSliderValue: [number, number] = useMemo(() => {
    return [Number(searchParams.get("priceFrom")) || priceRange[0], Number(searchParams.get("priceTo")) || priceRange[1]];
  }, [searchParams, priceRange]);

  useEffect(() => {
    apiService.getCategories().then(setCategories);
    apiService.getGenders().then(setGenders);

    const fetchMinMaxPrice = async () => {
      const [minResp, maxResp] = await Promise.all([
        apiService.getProductsWithPagination("?sort=price:asc", { page: 1, pageSize: 1 }),
        apiService.getProductsWithPagination("?sort=price:desc", { page: 1, pageSize: 1 }),
      ]);

      const minPrice = minResp.data?.[0]?.price || 0;
      const maxPrice = maxResp.data?.[0]?.price || 10000;
      setPriceRange([minPrice, maxPrice]);
    };

    fetchMinMaxPrice();
  }, []);

  const updateMultiParam = useCallback(
    (key: string, values: string[]) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete(key);
      values.forEach((v) => newParams.append(key, v));
      newParams.set("page", "1");
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const toggleCheckbox = useCallback(
    (key: string, value: string, current: string[]) => {
      const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
      updateMultiParam(key, next);
    },
    [updateMultiParam],
  );

  const updateSlider = useCallback(
    (updates: Record<string, string | number | boolean | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === false) {
          newParams.delete(key);
        } else {
          newParams.set(key, String(value));
        }
      });
      newParams.set("page", "1");
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  const updateSingleParam = useCallback(
    (key: string, value: string | boolean | number | null) => {
      const newParams = new URLSearchParams(searchParams.toString());
      if (value === null || value === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
      newParams.set("page", "1");
      setSearchParams(newParams);
    },
    [searchParams, setSearchParams],
  );

  return {
    categories,
    genders,
    selectedCategories,
    selectedGenders,
    inStockOnly,
    priceRange,
    priceSliderValue,
    toggleCheckbox,
    updateSingleParam,
    updateSlider,
  };
}
