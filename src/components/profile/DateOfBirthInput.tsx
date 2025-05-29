
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface DateOfBirthInputProps {
  value: string;
  onChange: (value: string) => void;
}

const DateOfBirthInput = ({ value, onChange }: DateOfBirthInputProps) => {
  const [date, setDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      // Check if user is at least 18 years old
      const today = new Date();
      const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
      
      if (selectedDate > eighteenYearsAgo) {
        return; // Don't allow selection of dates that make user under 18
      }
      
      setDate(selectedDate);
      onChange(format(selectedDate, 'yyyy-MM-dd'));
    }
  };

  // Calculate max date (18 years ago from today)
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);

  return (
    <div>
      <Label htmlFor="date_of_birth">Date of Birth (Must be 18 or older)</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick your date of birth</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => {
              const today = new Date();
              const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
              return date > eighteenYearsAgo || date < new Date("1900-01-01");
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
            defaultMonth={new Date(2000, 0)} // Start from year 2000 for better UX
          />
        </PopoverContent>
      </Popover>
      {date && new Date().getFullYear() - date.getFullYear() < 18 && (
        <p className="text-sm text-red-600 mt-1">You must be at least 18 years old to register.</p>
      )}
    </div>
  );
};

export default DateOfBirthInput;
