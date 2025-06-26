import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiService } from "@/services/apiService";
import { Checkbox, FormControlLabel, Slider, Box } from "@mui/material";
import { ICategory, IGender } from "@/types/apiTypes";
import styles from "../Catalog.module.scss";
import { Title } from "@/components/ui/Title/Title";

export default function CatalogFilter() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [genders, setGenders] = useState<IGender[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const selectedCategories = searchParams.getAll("category");
  const selectedGenders = searchParams.getAll("gender");
  const inStockOnly = searchParams.get("inStock") === "true";
  const priceFrom = Number(searchParams.get("priceFrom") || priceRange[0]);
  const priceTo = Number(searchParams.get("priceTo") || priceRange[1]);

  const [priceSliderValue, setPriceSliderValue] = useState<[number, number]>([priceFrom, priceTo]);

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
      setPriceSliderValue([Number(searchParams.get("priceFrom")) || minPrice, Number(searchParams.get("priceTo")) || maxPrice]);
    };

    fetchMinMaxPrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPriceSliderValue([priceFrom, priceTo]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceFrom, priceTo]);

  const updateMultiParam = (key: string, values: string[]) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.delete(key);
    values.forEach((v) => newParams.append(key, v));
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const toggleCheckbox = (key: string, value: string, current: string[]) => {
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updateMultiParam(key, next);
  };

  const updateSlider = (updates: Record<string, string | number | boolean | null>) => {
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
  };

  const updateSingleParam = (key: string, value: string | boolean | number | null) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === null || value === false) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  return (
    <Box className={styles.catalog__filters}>
      <Title level="h4" className={"title-h3 " + styles.catalog__filters__title}>
        Фильтры
      </Title>

      {/* Категории */}
      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Категории</Box>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat.id}
            control={<Checkbox checked={selectedCategories.includes(cat.slug)} onChange={() => toggleCheckbox("category", cat.slug, selectedCategories)} />}
            label={cat.name}
          />
        ))}
      </Box>

      {/* Пол */}
      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Пол</Box>
        {genders.map((g) => (
          <FormControlLabel key={g.id} control={<Checkbox checked={selectedGenders.includes(g.slug)} onChange={() => toggleCheckbox("gender", g.slug, selectedGenders)} />} label={g.name} />
        ))}
      </Box>

      {/* Наличие */}
      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Наличие</Box>
        <FormControlLabel control={<Checkbox checked={inStockOnly} onChange={() => updateSingleParam("inStock", !inStockOnly)} />} label="Есть в наличии" />
      </Box>

      {/* Цена */}
      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Цена</Box>
        <Slider
          value={priceSliderValue}
          onChange={(e, val) => setPriceSliderValue(val as [number, number])}
          onChangeCommitted={(e, val) => {
            const [min, max] = val as [number, number];
            updateSlider({
              priceFrom: min,
              priceTo: max,
            });
          }}
          valueLabelDisplay="auto"
          min={priceRange[0]}
          max={priceRange[1]}
        />
      </Box>
    </Box>
  );
}
