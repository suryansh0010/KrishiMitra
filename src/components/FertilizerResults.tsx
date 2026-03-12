import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, Factory, Beaker, Lightbulb, ArrowLeft } from "lucide-react";
import type { FertilizerRecommendation } from "@/lib/fertilizerRecommender";

interface FertilizerResultsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recommendation: FertilizerRecommendation | null;
  onBack?: () => void;
}

const levelColor = (level: "Low" | "Medium" | "High") => {
  if (level === "Low") return "text-red-600 bg-red-100";
  if (level === "Medium") return "text-amber-600 bg-amber-100";
  return "text-green-600 bg-green-100";
};

export default function FertilizerResults({
  open,
  onOpenChange,
  recommendation,
  onBack,
}: FertilizerResultsProps) {
  if (!recommendation) return null;

  const { organic, inorganic, soilAmendments, tips, nutrientLevels } =
    recommendation;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-agriculture-green" />
            Fertilizer Recommendations
          </DialogTitle>
          <DialogDescription>
            Based on your soil's nutrient levels, pH, and type.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 animate-fade-in">
          {/* Nutrient Level Badges */}
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                ["N", nutrientLevels.nitrogen],
                ["P", nutrientLevels.phosphorus],
                ["K", nutrientLevels.potassium],
              ] as const
            ).map(([label, level]) => (
              <div
                key={label}
                className="flex items-center justify-center gap-2 rounded-lg border p-2"
              >
                <span className="text-xs font-medium text-muted-foreground">
                  {label}:
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColor(level)}`}
                >
                  {level}
                </span>
              </div>
            ))}
          </div>

          {/* Organic / Inorganic Tabs */}
          <Tabs defaultValue="organic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="organic" className="flex items-center gap-1.5 text-xs">
                <Leaf className="h-3.5 w-3.5" />
                Organic ({organic.length})
              </TabsTrigger>
              <TabsTrigger value="inorganic" className="flex items-center gap-1.5 text-xs">
                <Factory className="h-3.5 w-3.5" />
                Inorganic ({inorganic.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="organic" className="mt-3 space-y-3">
              {organic.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All nutrient levels are adequate — no specific organic fertilizer needed.
                </p>
              ) : (
                organic.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 space-y-1.5"
                  >
                    <h4 className="text-sm font-semibold text-green-800 flex items-center gap-1.5">
                      <Leaf className="h-3.5 w-3.5" />
                      {f.name}
                    </h4>
                    <p className="text-xs text-green-700 leading-relaxed">
                      {f.description}
                    </p>
                    <p className="text-xs text-green-600 italic">
                      📋 {f.application}
                    </p>
                  </div>
                ))
              )}
            </TabsContent>

            <TabsContent value="inorganic" className="mt-3 space-y-3">
              {inorganic.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  All nutrient levels are adequate — no specific inorganic fertilizer needed.
                </p>
              ) : (
                inorganic.map((f, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 space-y-1.5"
                  >
                    <h4 className="text-sm font-semibold text-blue-800 flex items-center gap-1.5">
                      <Factory className="h-3.5 w-3.5" />
                      {f.name}
                    </h4>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      {f.description}
                    </p>
                    <p className="text-xs text-blue-600 italic">
                      📋 {f.application}
                    </p>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>

          {/* Soil Amendments (pH-based) */}
          {soilAmendments.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Beaker className="h-4 w-4 text-purple-600" />
                pH Soil Amendments
              </h3>
              {soilAmendments.map((a, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-purple-200 bg-purple-50 p-3"
                >
                  <p className="text-xs font-semibold text-purple-800">
                    {a.name}
                  </p>
                  <p className="text-xs text-purple-700 mt-0.5">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Soil Type Tips */}
          {tips.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Lightbulb className="h-4 w-4 text-amber-500" />
                Soil Tips
              </h3>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 space-y-1.5">
                {tips.map((tip, i) => (
                  <p key={i} className="text-xs text-amber-800 flex gap-1.5">
                    <span className="flex-shrink-0">•</span>
                    <span>{tip}</span>
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Info Note */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
            <strong>ℹ️ Note:</strong> These are general recommendations based on
            soil metric analysis. For precise fertilizer scheduling, consult your
            local agricultural extension officer or Krishi Vigyan Kendra (KVK).
          </div>

          {/* Back Button */}
          {onBack && (
            <Button variant="outline" className="w-full" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Results
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
