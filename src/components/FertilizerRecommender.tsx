import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sprout } from "lucide-react";
import { toast } from "sonner";
import {
  getRecommendation,
  SOIL_TYPES,
  type SoilInput,
  type FertilizerRecommendation,
} from "@/lib/fertilizerRecommender";
import FertilizerResults from "@/components/FertilizerResults";

const FertilizerRecommender = () => {
  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const [recommendation, setRecommendation] =
    useState<FertilizerRecommendation | null>(null);

  const [soilType, setSoilType] = useState("");
  const [nValue, setNValue] = useState("");
  const [pValue, setPValue] = useState("");
  const [kValue, setKValue] = useState("");
  const [phValue, setPhValue] = useState("");

  const resetForm = () => {
    setSoilType("");
    setNValue("");
    setPValue("");
    setKValue("");
    setPhValue("");
  };

  const handleSubmit = () => {
    if (!soilType || !nValue || !pValue || !kValue || !phValue) {
      toast.error("Please fill in all fields.");
      return;
    }

    const n = parseFloat(nValue);
    const p = parseFloat(pValue);
    const k = parseFloat(kValue);
    const ph = parseFloat(phValue);

    if ([n, p, k, ph].some(isNaN)) {
      toast.error("Please enter valid numeric values.");
      return;
    }

    if (ph < 0 || ph > 14) {
      toast.error("pH must be between 0 and 14.");
      return;
    }

    const input: SoilInput = {
      n_value: n,
      p_value: p,
      k_value: k,
      ph_value: ph,
      soil_type: soilType,
    };

    const result = getRecommendation(input);
    setRecommendation(result);
    setInputDialogOpen(false);
    setResultDialogOpen(true);
  };

  return (
    <>
      {/* ── Input Dialog (Manual Entry) ── */}
      <Dialog open={inputDialogOpen} onOpenChange={setInputDialogOpen}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-elevated transition-all duration-300 bg-white/95 backdrop-blur border-0 w-full max-w-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-agriculture-green rounded-full flex items-center justify-center mb-4">
                <Sprout className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-agriculture-green">
                Fertilizer Recommender
              </CardTitle>
              <CardDescription>
                Enter soil metrics to get personalized organic & inorganic
                fertilizer recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-gradient-to-r from-amber-500 to-agriculture-green border-0 hover:shadow-lg text-white">
                Get Recommendations
              </Button>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-agriculture-green" />
              Fertilizer Recommender
            </DialogTitle>
            <DialogDescription>
              Enter your soil test results to get fertilizer suggestions.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Soil Type */}
            <div className="space-y-2">
              <Label>Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {SOIL_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* NPK Inputs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">
                  Nitrogen (N)
                </Label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={nValue}
                  onChange={(e) => setNValue(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">
                  Phosphorus (P)
                </Label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={pValue}
                  onChange={(e) => setPValue(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">
                  Potassium (K)
                </Label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={kValue}
                  onChange={(e) => setKValue(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>

            {/* pH Input */}
            <div className="space-y-2">
              <Label>pH Level (0 - 14)</Label>
              <Input
                type="number"
                placeholder="7.0"
                value={phValue}
                onChange={(e) => setPhValue(e.target.value)}
                min="0"
                max="14"
                step="0.1"
              />
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-gradient-to-r from-amber-500 to-agriculture-green border-0 text-white"
              onClick={handleSubmit}
            >
              <Sprout className="h-4 w-4 mr-2" />
              Get Recommendations
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Fertilizer Results Dialog ── */}
      <FertilizerResults
        open={resultDialogOpen}
        onOpenChange={(open) => {
          setResultDialogOpen(open);
          if (!open) {
            resetForm();
            setRecommendation(null);
          }
        }}
        recommendation={recommendation}
      />
    </>
  );
};

export default FertilizerRecommender;
