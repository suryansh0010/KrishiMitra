import { useState, useRef } from "react";
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
import { Label } from "@/components/ui/label";
import { Leaf, Upload, Image, X, FlaskConical, Droplets } from "lucide-react";
import { toast } from "sonner";

interface NpkResult {
  n_value: number;
  p_value: number;
  k_value: number;
  ph_value: number;
  soil_type: string;
  success: boolean;
}

const API_URL =
  "https://fertilizer-recommendation-2-mcto.onrender.com/predict_npk";

const SoilAnalyser = () => {
  const [uploadedImage, setUploadedImage] = useState<{
    file: File;
    preview: string;
    name: string;
    size: number;
  } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<NpkResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [inputDialogOpen, setInputDialogOpen] = useState(false);
  const [resultDialogOpen, setResultDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file (PNG, JPG, JPEG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImage({
        file,
        preview: e.target?.result as string,
        name: file.name,
        size: file.size,
      });
    };
    reader.readAsDataURL(file);

    // Call the API
    await analyzeImage(file);
  };

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    setResult(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("images", file);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data: NpkResult = await response.json();

      if (data.success) {
        setResult(data);
        // Close input dialog, open results dialog
        setInputDialogOpen(false);
        setResultDialogOpen(true);
      } else {
        throw new Error("Analysis failed. Please try a different image.");
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(message);
      toast.error("Analysis failed", {
        description:
          "The server may be starting up. Please try again in a minute.",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setError(null);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetAll = () => {
    removeImage();
    setResult(null);
    setResultDialogOpen(false);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getPhColor = (ph: number) => {
    if (ph < 5.5) return "text-red-600 bg-red-100";
    if (ph < 6.5) return "text-orange-600 bg-orange-100";
    if (ph <= 7.5) return "text-green-600 bg-green-100";
    if (ph <= 8.5) return "text-blue-600 bg-blue-100";
    return "text-purple-600 bg-purple-100";
  };

  const getPhLabel = (ph: number) => {
    if (ph < 5.5) return "Strongly Acidic";
    if (ph < 6.5) return "Slightly Acidic";
    if (ph <= 7.5) return "Neutral";
    if (ph <= 8.5) return "Slightly Alkaline";
    return "Strongly Alkaline";
  };

  return (
    <>
      {/* ── Input Dialog (Upload) ── */}
      <Dialog open={inputDialogOpen} onOpenChange={setInputDialogOpen}>
        <DialogTrigger asChild>
          <Card className="cursor-pointer hover:shadow-elevated transition-all duration-300 bg-white/95 backdrop-blur border-0 w-full max-w-md">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                <FlaskConical className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-xl text-agriculture-green">
                Soil NPK Analyser
              </CardTitle>
              <CardDescription>
                Upload soil images to predict NPK values, pH level, and soil
                type for better crop planning.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full bg-gradient-hero border-0 hover:shadow-lg">
                Analyse Soil
              </Button>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-agriculture-green" />
              Soil NPK Analyser
            </DialogTitle>
            <DialogDescription>
              Upload a soil image to predict Nitrogen, Phosphorus, Potassium, pH,
              and soil type.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="soil-image-upload">Upload Soil Image</Label>

              {!uploadedImage ? (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-agriculture-green transition-colors cursor-pointer"
                  onClick={handleImageUpload}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    PNG, JPG, JPEG up to 10MB
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-agriculture-green text-agriculture-green hover:bg-agriculture-light"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageUpload();
                    }}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Choose File
                  </Button>
                </div>
              ) : (
                <div className="border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <img
                        src={uploadedImage.preview}
                        alt="Uploaded soil"
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {uploadedImage.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(uploadedImage.size)}
                      </p>
                      {isAnalyzing && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-agriculture-green border-t-transparent rounded-full animate-spin" />
                            <span className="text-sm text-agriculture-green">
                              Analysing soil...
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    {!isAnalyzing && (
                      <button
                        onClick={removeImage}
                        className="flex-shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="soil-image-upload"
              />
            </div>

            {/* Error State */}
            {error && !isAnalyzing && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700 mb-2">{error}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-300 text-red-600 hover:bg-red-100"
                  onClick={() =>
                    uploadedImage && analyzeImage(uploadedImage.file)
                  }
                >
                  Retry Analysis
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* ── Results Dialog ── */}
      <Dialog open={resultDialogOpen} onOpenChange={(open) => {
        setResultDialogOpen(open);
        if (!open) resetAll();
      }}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5 text-agriculture-green" />
              Soil Analysis Results
            </DialogTitle>
            <DialogDescription>
              Predicted soil metrics from your uploaded image.
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="space-y-4 animate-fade-in">
              {/* Soil Type Badge */}
              <div className="flex items-center justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-agriculture-light text-agriculture-dark font-semibold text-sm">
                  <Leaf className="h-4 w-4" />
                  {result.soil_type}
                </div>
              </div>

              {/* NPK Values */}
              <div className="grid grid-cols-3 gap-3">
                {/* Nitrogen */}
                <div className="relative rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100 border border-emerald-200 p-4 text-center overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500" />
                  <p className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-1">
                    Nitrogen
                  </p>
                  <p className="text-2xl font-bold text-emerald-700">
                    {result.n_value.toFixed(1)}
                  </p>
                  <p className="text-xs text-emerald-500 mt-0.5">N</p>
                </div>

                {/* Phosphorus */}
                <div className="relative rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 p-4 text-center overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
                  <p className="text-xs font-medium text-amber-600 uppercase tracking-wider mb-1">
                    Phosphorus
                  </p>
                  <p className="text-2xl font-bold text-amber-700">
                    {result.p_value.toFixed(1)}
                  </p>
                  <p className="text-xs text-amber-500 mt-0.5">P</p>
                </div>

                {/* Potassium */}
                <div className="relative rounded-xl bg-gradient-to-br from-violet-50 to-violet-100 border border-violet-200 p-4 text-center overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-violet-500" />
                  <p className="text-xs font-medium text-violet-600 uppercase tracking-wider mb-1">
                    Potassium
                  </p>
                  <p className="text-2xl font-bold text-violet-700">
                    {result.k_value.toFixed(1)}
                  </p>
                  <p className="text-xs text-violet-500 mt-0.5">K</p>
                </div>
              </div>

              {/* pH Value */}
              <div className="rounded-xl border p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <Droplets className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      pH Level
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {getPhLabel(result.ph_value)}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-lg font-bold px-3 py-1 rounded-full ${getPhColor(result.ph_value)}`}
                >
                  {result.ph_value.toFixed(1)}
                </span>
              </div>

              {/* Info Note */}
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-700">
                <strong>ℹ️ Note:</strong> These values are AI-predicted
                estimates based on soil image analysis. For precision farming
                decisions, validate with a laboratory soil test.
              </div>

              {/* Analyse Another Button */}
              <Button
                variant="outline"
                className="w-full"
                onClick={resetAll}
              >
                Analyse Another Sample
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SoilAnalyser;
