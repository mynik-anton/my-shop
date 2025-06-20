import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { apiService } from "@/services/apiService";
import { Checkbox, FormControlLabel, Slider, Box } from "@mui/material";
import { ICategory, IGender } from "@/types/apiTypes";
import styles from "../Catalog.module.scss";
import { Title } from "@/components/ui/Title/Title";
import { PRODUCTS_PER_PAGE } from "../Catalog";

export default function CatalogFilter() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [genders, setGenders] = useState<IGender[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    apiService.getCategories().then(setCategories);
    apiService.getGenders().then(setGenders);
  }, []);

  // Текущие значения фильтров
  const selectedCategories = searchParams.getAll("category_id").map(Number);
  const selectedGenders = searchParams.getAll("gender_id").map(Number);
  const inStockOnly = searchParams.get("stock") === "1";
  const priceGte = Number(searchParams.get("price_gte") || 0);
  const priceLte = Number(searchParams.get("price_lte") || 10000);

  // Обновление параметров
  const updateParams = (key: string, value: string | number | boolean | string[]) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (Array.isArray(value)) {
      console.log("value", value);
      newParams.delete(key);
      value.forEach((v) => newParams.append(key, String(v)));
    } else if (value === false || value === undefined) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }

    newParams.set("_page", "1");
    newParams.set("_per_page", PRODUCTS_PER_PAGE.toString());
    setSearchParams(newParams);
  };

  const toggleCheckbox = (key: string, id: number, current: number[]) => {
    const next = current.includes(id) ? current.filter((i) => i !== id) : [...current, id];
    updateParams(key, next.map(String));
  };

  return (
    <Box className={styles.catalog__filters}>
      <Title level="h4" className={"title-h3 " + styles.catalog__filters__title}>
        Фильтры
      </Title>
      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Категории</Box>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat.id}
            control={<Checkbox checked={selectedCategories.includes(cat.id)} onChange={() => toggleCheckbox("category_id", cat.id, selectedCategories)} />}
            label={cat.name}
          />
        ))}
      </Box>

      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Пол</Box>
        {genders.map((g) => (
          <FormControlLabel key={g.id} control={<Checkbox checked={selectedGenders.includes(g.id)} onChange={() => toggleCheckbox("gender_id", g.id, selectedGenders)} />} label={g.name} />
        ))}
      </Box>

      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Наличие</Box>
        <FormControlLabel control={<Checkbox checked={inStockOnly} onChange={() => updateParams("stock", !inStockOnly ? 1 : false)} />} label="Есть в наличии" />
      </Box>

      <Box className={styles.catalog__filters__item}>
        <Box className={"title-h6 " + styles.catalog__filters__item__title}>Цена</Box>
        <Slider
          value={[priceGte, priceLte]}
          onChangeCommitted={(e, newVal) => {
            const [min, max] = newVal as [number, number];
            updateParams("price_gte", min);
            updateParams("price_lte", max);
          }}
          valueLabelDisplay="auto"
          min={0}
          max={10000}
        />
      </Box>
    </Box>
  );
}
