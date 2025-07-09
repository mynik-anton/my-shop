import { useEffect, useState } from "react";

// Material-UI components
import { Box, Button, Checkbox, Drawer, FormControlLabel, IconButton, Slider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FilterListIcon from "@mui/icons-material/FilterList";

// App components
import Title from "@/components/ui/Title/Title";

// Hooks
import { useCatalogFilter } from "@/hooks/filters/useCatalogFilter";

// Styles
import styles from "./CatalogMobileFilter.module.scss";

export default function CatalogMobileFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, genders, selectedCategories, selectedGenders, inStockOnly, priceRange, priceSliderValue, toggleCheckbox, updateSingleParam, updateSlider } = useCatalogFilter();

  const [localPrice, setLocalPrice] = useState<[number, number]>(priceSliderValue);

  useEffect(() => {
    setLocalPrice(priceSliderValue);
  }, [priceSliderValue]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box className={styles.filters}>
      <Button onClick={toggleDrawer} className={styles.filters__button} color="primary" startIcon={<FilterListIcon />} variant="contained">
        <span>Фильтры</span>
      </Button>

      <Drawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: "80%",
            maxWidth: "350px",
            padding: "20px",
            boxSizing: "border-box",
          },
        }}
      >
        <Box className={styles.filters__drawer}>
          <Box className={styles.filters__drawer__header}>
            <Title level="h4" className={"title-h3 " + styles.filters__drawer__title}>
              Фильтры
            </Title>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Категории */}
          <Box className={styles.filters__drawer__item}>
            <Box className={"title-h6 " + styles.filters__drawer__item__title}>Категории</Box>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat.id}
                control={<Checkbox checked={selectedCategories.includes(cat.slug)} onChange={() => toggleCheckbox("category", cat.slug, selectedCategories)} />}
                label={cat.name}
              />
            ))}
          </Box>

          {/* Пол */}
          <Box className={styles.filters__drawer__item}>
            <Box className={"title-h6 " + styles.filters__drawer__item__title}>Пол</Box>
            {genders.map((g) => (
              <FormControlLabel key={g.id} control={<Checkbox checked={selectedGenders.includes(g.slug)} onChange={() => toggleCheckbox("gender", g.slug, selectedGenders)} />} label={g.name} />
            ))}
          </Box>

          {/* Наличие */}
          <Box className={styles.filters__drawer__item}>
            <Box className={"title-h6 " + styles.filters__drawer__item__title}>Наличие</Box>
            <FormControlLabel control={<Checkbox checked={inStockOnly} onChange={() => updateSingleParam("inStock", !inStockOnly)} />} label="Есть в наличии" />
          </Box>

          {/* Цена */}
          <Box className={styles.filters__drawer__item}>
            <Box className={"title-h6 " + styles.filters__drawer__item__title}>Цена</Box>
            <Slider
              value={localPrice}
              onChange={(_e, val) => setLocalPrice(val as [number, number])}
              onChangeCommitted={(_e, val) => {
                const [min, max] = val as [number, number];
                updateSlider({ priceFrom: min, priceTo: max });
              }}
              className={styles.filters__drawer__item__slider}
              valueLabelDisplay="auto"
              min={priceRange[0]}
              max={priceRange[1]}
            />
          </Box>
          <Button className={styles.filters__drawer__submit} variant="contained" onClick={toggleDrawer}>
            Применить
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}
