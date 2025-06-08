"use client";
import type { Product } from "@/libs/data-layer/products/useProducts";

import FaContent from "@/content/fa.json";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  IconButton,
  Slider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const FilterDrawer = styled(Drawer)(({ theme }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: theme.palette.background.default,
    padding: "16px 18px",
    width: 320,
  },
}));

const FilterHeader = styled(Stack)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const FilterSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2.5, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface Props {
  isOpen: boolean;
  onClose: () => void;
  pureData: Product[];
  setData: (data: Product[]) => void;
}

interface FilterSectionHeaderProps {
  title: string;
  hasValue: boolean;
  onClear: () => void;
}

interface WeightFilterProps {
  weight: number;
  setWeight: (value: number) => void;
  maxWeight: number;
}

interface CheckboxFilterProps {
  title: string;
  options: string[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}

interface FilterFooterProps {
  onClose: () => void;
  resetFilters: () => void;
}

const SectionHeader = ({
  title,
  hasValue,
  onClear,
}: FilterSectionHeaderProps) => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body1" color="text.secondary">
      {title}
    </Typography>
    {hasValue && (
      <Button size="small" sx={{ height: "24px" }} onClick={onClear}>
        {FaContent.dashboard.order.filters.clear}
      </Button>
    )}
  </Stack>
);

const WeightFilter = ({ weight, setWeight, maxWeight }: WeightFilterProps) => {
  const handleSliderChange = (_: Event, value: number | number[]) => {
    if (typeof value === "number") {
      setWeight(value);
    }
  };

  return (
    <FilterSection>
      <SectionHeader
        hasValue={weight !== 0}
        title={FaContent.dashboard.order.filters.weight}
        onClear={() => setWeight(0)}
      />
      <Slider
        marks
        aria-label="Small"
        max={maxWeight}
        min={0}
        step={0.1}
        sx={{ mt: 2, mx: 2, width: "90%" }}
        value={weight}
        valueLabelDisplay="auto"
        onChange={handleSliderChange}
      />
    </FilterSection>
  );
};

const CheckboxFilter = ({
  title,
  options,
  selectedValues,
  setSelectedValues,
}: CheckboxFilterProps) => {
  const handleCheckboxChange = (option: string) => {
    setSelectedValues(
      selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option],
    );
  };

  return (
    <FilterSection>
      <SectionHeader
        hasValue={selectedValues.length > 0}
        title={title}
        onClear={() => setSelectedValues([])}
      />
      <Stack sx={{ mt: 1 }}>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            label={option}
            control={
              <Checkbox
                checked={selectedValues.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
            }
          />
        ))}
      </Stack>
    </FilterSection>
  );
};

const FilterFooter = ({ onClose, resetFilters }: FilterFooterProps) => (
  <Stack spacing={2} direction="row">
    <Button fullWidth variant="contained" onClick={onClose}>
      {FaContent.dashboard.order.filters.close}
    </Button>
    <Button fullWidth variant="outlined" onClick={resetFilters}>
      {FaContent.dashboard.order.filters.clearAll}
    </Button>
  </Stack>
);

const SidebarFilters: React.FC<Props> = ({
  isOpen,
  onClose,
  setData,
  pureData,
}) => {
  const [weight, setWeight] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const { brands, maxWeight } = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set(pureData.map((p) => p.brand).filter(Boolean)),
    );
    const weights = pureData.map((p) => p.gram).filter(Boolean);
    return {
      brands: uniqueBrands,
      maxWeight: weights.length ? Math.max(...weights) : 0,
    };
  }, [pureData]);

  const productTypes = useMemo(() => {
    if (pureData.length === 0) return [];
    return ["آبشده", "سکه"];
  }, [pureData]);

  const handleProductFilter = useMemo(
    () => () => {
      let filteredData = [...pureData];

      if (weight > 0) {
        filteredData = filteredData.filter((p) => p.gram <= weight);
      }
      if (selectedBrands.length > 0) {
        filteredData = filteredData.filter((p) =>
          selectedBrands.includes(p.brand),
        );
      }
      if (selectedTypes.length > 0) {
        filteredData = filteredData.filter((p) =>
          selectedTypes.includes(p.type),
        );
      }

      setData(filteredData);
    },
    [weight, selectedBrands, selectedTypes, pureData, setData],
  );

  const resetAllFilters = () => {
    setWeight(0);
    setSelectedBrands([]);
    setSelectedTypes([]);
  };

  useEffect(() => {
    handleProductFilter();
  }, [weight, selectedBrands, selectedTypes, handleProductFilter]);

  if (pureData.length === 0) {
    return (
      <FilterDrawer
        anchor="right"
        onClose={onClose}
        open={isOpen}
        slotProps={{ paper: { elevation: 0 } }}
      >
        <FilterHeader
          alignItems="center"
          direction="row"
          justifyContent="space-between"
        >
          <Typography variant="h3">
            {FaContent.dashboard.order.filters.title}
          </Typography>
          <IconButton onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </FilterHeader>
        <Box sx={{ p: 2 }}>
          <Typography color="text.secondary">
            No products available for filtering
          </Typography>
        </Box>
        <FilterFooter resetFilters={resetAllFilters} onClose={onClose} />
      </FilterDrawer>
    );
  }

  return (
    <FilterDrawer
      anchor="right"
      onClose={onClose}
      open={isOpen}
      slotProps={{ paper: { elevation: 0 } }}
    >
      <FilterHeader
        alignItems="center"
        direction="row"
        justifyContent="space-between"
      >
        <Typography variant="h3">
          {FaContent.dashboard.order.filters.title}
        </Typography>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </FilterHeader>

      <Box sx={{ flex: 1 }}>
        <WeightFilter
          maxWeight={maxWeight}
          setWeight={setWeight}
          weight={weight}
        />

        <CheckboxFilter
          selectedValues={selectedBrands}
          setSelectedValues={setSelectedBrands}
          title={FaContent.dashboard.order.filters.brand}
          options={brands}
        />

        <CheckboxFilter
          selectedValues={selectedTypes}
          setSelectedValues={setSelectedTypes}
          title={FaContent.dashboard.order.filters.type}
          options={productTypes}
        />
      </Box>

      <FilterFooter resetFilters={resetAllFilters} onClose={onClose} />
    </FilterDrawer>
  );
};

export default SidebarFilters;
