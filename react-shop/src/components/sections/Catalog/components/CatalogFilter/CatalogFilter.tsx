import { Box, Checkbox, FormControlLabel, Slider } from "@mui/material";
import { Title } from "@/components/ui/Title/Title";
import styles from "./CatalogFilter.module.scss";
import { useCatalogFilter } from "@/hooks/filters/useCatalogFilter";
import { useEffect, useState } from "react";

export default function CatalogFilter() {
  const { categories, genders, selectedCategories, selectedGenders, inStockOnly, priceRange, priceSliderValue, toggleCheckbox, updateSingleParam, updateSlider } = useCatalogFilter();

  const [localPrice, setLocalPrice] = useState<[number, number]>(priceSliderValue);

  useEffect(() => {
    setLocalPrice(priceSliderValue);
  }, [priceSliderValue]);

  return (
    <Box className={styles.filters}>
      <Title level="h4" className={"title-h3 " + styles.filters__title}>
        Фильтры
      </Title>

      {/* Категории */}
      <Box className={styles.filters__item}>
        <Box className={"title-h6 " + styles.filters__item__title}>Категории</Box>
        {categories.map((cat) => (
          <FormControlLabel
            key={cat.id}
            control={<Checkbox checked={selectedCategories.includes(cat.slug)} onChange={() => toggleCheckbox("category", cat.slug, selectedCategories)} />}
            label={cat.name}
          />
        ))}
      </Box>

      {/* Пол */}
      <Box className={styles.filters__item}>
        <Box className={"title-h6 " + styles.filters__item__title}>Пол</Box>
        {genders.map((g) => (
          <FormControlLabel key={g.id} control={<Checkbox checked={selectedGenders.includes(g.slug)} onChange={() => toggleCheckbox("gender", g.slug, selectedGenders)} />} label={g.name} />
        ))}
      </Box>

      {/* Наличие */}
      <Box className={styles.filters__item}>
        <Box className={"title-h6 " + styles.filters__item__title}>Наличие</Box>
        <FormControlLabel control={<Checkbox checked={inStockOnly} onChange={() => updateSingleParam("inStock", !inStockOnly)} />} label="Есть в наличии" />
      </Box>

      {/* Цена */}
      <Box className={styles.filters__item}>
        <Box className={"title-h6 " + styles.filters__item__title}>Цена</Box>
        <Slider
          value={localPrice}
          onChange={(_e, val) => setLocalPrice(val as [number, number])}
          onChangeCommitted={(_e, val) => {
            const [min, max] = val as [number, number];
            updateSlider({ priceFrom: min, priceTo: max });
          }}
          valueLabelDisplay="auto"
          min={priceRange[0]}
          max={priceRange[1]}
        />
      </Box>
    </Box>
  );
}
