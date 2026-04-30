type AnswerOptionsProps = {
  options: string[];
  selectedOption: number | null;
  correctOption: number;
  answered: boolean;
  onSelect: (index: number) => void;
};

export function AnswerOptions({ options, selectedOption, correctOption, answered, onSelect }: AnswerOptionsProps) {
  return (
    <div className="mt-4 grid gap-2">
      {options.map((option, index) => {
        const isCorrect = index === correctOption;
        const isSelected = selectedOption === index;

        let className = "border-white/15 bg-white/5 hover:bg-white/10";
        if (answered && isCorrect) {
          className = "border-emerald-300/50 bg-emerald-500/20";
        } else if (answered && isSelected && !isCorrect) {
          className = "border-rose-300/50 bg-rose-500/20";
        }

        return (
          <button
            key={option}
            type="button"
            disabled={answered}
            onClick={() => onSelect(index)}
            className={`rounded-lg border px-3 py-2 text-left text-sm text-white transition disabled:cursor-not-allowed ${className}`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
