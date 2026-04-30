type ParameterSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  unit?: string;
};

export function ParameterSlider({ label, value, min, max, step = 1, onChange, unit = "" }: ParameterSliderProps) {
  return (
    <label className="block">
      <div className="mb-2 flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(Number(event.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-white/15"
      />
    </label>
  );
}
