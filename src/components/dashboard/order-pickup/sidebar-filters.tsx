"use client";
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
import { useState } from "react";

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
  data: any;
  setData: any;
}

const SectionHeader = ({
  title,
  hasValue,
  onClear,
}: {
  title: string;
  hasValue: boolean;
  onClear: () => void;
}) => (
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

const WeightFilter = ({
  weight,
  setWeight,
}: {
  weight: number;
  setWeight: (value: number) => void;
}) => (
  <FilterSection>
    <SectionHeader
      hasValue={weight !== 0}
      title={FaContent.dashboard.order.filters.weight}
      onClear={() => setWeight(0)}
    />
    <Slider
      marks
      max={2}
      min={0}
      step={0.1}
      sx={{ mt: 2, mx: 2, width: "90%" }}
      value={weight}
      onChange={(_, value) => setWeight(value)}
    />
  </FilterSection>
);

const CheckboxFilter = ({
  title,
  options,
  selectedValues,
  setSelectedValues,
}: {
  title: string;
  options: string[];
  selectedValues: string[];
  setSelectedValues: (values: string[]) => void;
}) => (
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
          control={<Checkbox checked={selectedValues.includes(option)} />}
          onChange={() => {
            if (selectedValues.includes(option)) {
              setSelectedValues(selectedValues.filter((v) => v !== option));
            } else {
              setSelectedValues([...selectedValues, option]);
            }
          }}
        />
      ))}
    </Stack>
  </FilterSection>
);

const FilterFooter = ({ onClose }: { onClose: () => void }) => (
  <Stack spacing={2} direction="row">
    <Button fullWidth variant="contained" onClick={onClose}>
      {FaContent.dashboard.order.filters.close}
    </Button>
    <Button fullWidth variant="outlined">
      {FaContent.dashboard.order.filters.clearAll}
    </Button>
  </Stack>
);

const SidebarFilters: React.FC<Props> = ({ isOpen, onClose }) => {
  const [weight, setWeight] = useState<number>(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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
        <WeightFilter setWeight={setWeight} weight={weight} />

        <CheckboxFilter
          selectedValues={selectedBrands}
          setSelectedValues={setSelectedBrands}
          title={FaContent.dashboard.order.filters.brand}
          options={FaContent.dashboard.order.filters.brandOptions}
        />

        <CheckboxFilter
          selectedValues={selectedTypes}
          setSelectedValues={setSelectedTypes}
          title={FaContent.dashboard.order.filters.type}
          options={FaContent.dashboard.order.filters.typeOptions}
        />
      </Box>

      <FilterFooter onClose={onClose} />
    </FilterDrawer>
  );
};

export default SidebarFilters;
