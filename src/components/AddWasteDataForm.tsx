import { X, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface AddWasteDataFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: WasteData) => void;
}

export interface WasteData {
  category?: string;
  amount?: string;
  date?: Date;
  consumerType?: string;
  source?: string;
  location?: string;
}

export function AddWasteDataForm({ isOpen, onClose, onSubmit }: AddWasteDataFormProps) {
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>();
  const [consumerType, setConsumerType] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const wasteData: WasteData = {
      category: category || undefined,
      amount: amount || undefined,
      date: date || undefined,
      consumerType: consumerType || undefined,
      source: source || undefined,
      location: location || undefined,
    };

    onSubmit(wasteData);
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Pick a date";
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Sliding Form */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 overflow-y-auto shadow-2xl"
          >
            <div className="min-h-full flex flex-col">
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-[#8BC34A] to-[#7CB342] px-5 py-4 flex items-center justify-between z-10 shadow-md">
                <div>
                  <h2 className="text-white">Add Waste Data</h2>
                  <p className="text-xs text-white/90 mt-0.5">Help us track and valorise waste</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleSubmit} className="flex-1 px-5 py-6 space-y-6">
                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700">
                    What category does it belong to?
                    <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className="bg-[#F8F9F6] border-gray-200">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="produce">🥬 Produce</SelectItem>
                      <SelectItem value="dairy">🥛 Dairy</SelectItem>
                      <SelectItem value="meat">🥩 Meat</SelectItem>
                      <SelectItem value="seafood">🐟 Seafood</SelectItem>
                      <SelectItem value="bakery">🍞 Bakery</SelectItem>
                      <SelectItem value="beverages">☕ Beverages</SelectItem>
                      <SelectItem value="others">📦 Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div className="space-y-2">
                  <Label htmlFor="amount" className="text-gray-700">
                    How much food was wasted?
                    <span className="text-xs text-gray-400 ml-2">(Estimate)</span>
                  </Label>
                  <Input
                    id="amount"
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="e.g., 5kg, 10 portions, 3 bags"
                    className="bg-[#F8F9F6] border-gray-200"
                  />
                </div>

                {/* Date and Time */}
                <div className="space-y-2">
                  <Label className="text-gray-700">
                    When did this waste occur?
                    <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left bg-[#F8F9F6] border-gray-200 hover:bg-[#F0F7F2]"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                        <span className={date ? "text-gray-900" : "text-gray-400"}>
                          {formatDate(date)}
                        </span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Consumer Type */}
                <div className="space-y-3">
                  <Label className="text-gray-700">
                    Was this waste pre-consumer or post-consumer?
                    <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                  </Label>
                  <RadioGroup value={consumerType} onValueChange={setConsumerType}>
                    <div className="flex items-center space-x-2 bg-[#F8F9F6] p-3 rounded-lg border border-gray-200">
                      <RadioGroupItem value="pre-consumer" id="pre-consumer" />
                      <Label htmlFor="pre-consumer" className="cursor-pointer flex-1">
                        <span className="text-gray-900">Pre-consumer</span>
                        <p className="text-xs text-gray-500 mt-0.5">Before sale or serving</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 bg-[#F8F9F6] p-3 rounded-lg border border-gray-200">
                      <RadioGroupItem value="post-consumer" id="post-consumer" />
                      <Label htmlFor="post-consumer" className="cursor-pointer flex-1">
                        <span className="text-gray-900">Post-consumer</span>
                        <p className="text-xs text-gray-500 mt-0.5">After sale or serving</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Source */}
                <div className="space-y-2">
                  <Label htmlFor="source" className="text-gray-700">
                    Where did the waste come from?
                    <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                  </Label>
                  <Select value={source} onValueChange={setSource}>
                    <SelectTrigger id="source" className="bg-[#F8F9F6] border-gray-200">
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="restaurant">🍽️ Restaurant</SelectItem>
                      <SelectItem value="household">🏠 Household</SelectItem>
                      <SelectItem value="supermarket">🛒 Supermarket</SelectItem>
                      <SelectItem value="school-canteen">🎓 School Canteen</SelectItem>
                      <SelectItem value="event">🎉 Event</SelectItem>
                      <SelectItem value="factory">🏭 Factory</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-gray-700">
                    Which outlet/location is this waste from?
                    <span className="text-xs text-gray-400 ml-2">(Optional)</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g., Marina Bay Sands, Orchard Road"
                      className="bg-[#F8F9F6] border-gray-200 pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Adding location helps others find waste sources on the map
                  </p>
                </div>

                {/* Bottom spacing */}
                <div className="h-6"></div>
              </form>

              {/* Submit Button - Sticky at bottom */}
              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-5 shadow-lg">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#8BC34A] to-[#7CB342] hover:from-[#7CB342] hover:to-[#6DA33A] text-white py-6 rounded-xl shadow-md"
                >
                  Submit & Get AI Suggestions
                </Button>
                <p className="text-xs text-center text-gray-500 mt-3">
                  All fields are optional — share what you can! 🌱
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
