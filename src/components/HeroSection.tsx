// import { useState, useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Leaf, Bug, ShoppingCart, MapPin, Upload, Image, X } from "lucide-react";
// import heroFarmer from "@/assets/hero-farmer.jpg";

// const HeroSection = () => {
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [uploadedImage, setUploadedImage] = useState<{
//     file: File;
//     preview: string;
//     name: string;
//     size: number;
//   } | null>(null);
//   const [showRecommendation, setShowRecommendation] = useState(false);
//   const [showPesticide, setShowPesticide] = useState(false);
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const locationCrops = {
//     "uttar-pradesh": ["Wheat", "Rice", "Sugarcane", "Maize"],
//     "punjab": ["Maize", "Cotton", "Wheat", "Rice"],
//     "maharashtra": ["Sugarcane", "Soybean", "Cotton", "Onion"]
//   };

//   const marketPrices = [
//     { crop: "Wheat", price: "₹2,200", unit: "/quintal", change: "+2.5%" },
//     { crop: "Rice", price: "₹2,800", unit: "/quintal", change: "+1.8%" },
//     { crop: "Cotton", price: "₹6,000", unit: "/quintal", change: "-0.5%" },
//     { crop: "Sugarcane", price: "₹350", unit: "/quintal", change: "+3.2%" },
//     { crop: "Soybean", price: "₹4,500", unit: "/quintal", change: "+1.2%" }
//   ];

//   const handleLocationSelect = (location: string) => {
//     setSelectedLocation(location);
//     setShowRecommendation(true);
//   };

//   const handleImageUpload = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setUploadedImage({
//           file: file,
//           preview: e.target?.result as string,
//           name: file.name,
//           size: file.size
//         });
        
//         // Simulate analysis
//         setIsAnalyzing(true);
//         setTimeout(() => {
//           setIsAnalyzing(false);
//           setShowPesticide(true);
//         }, 2000);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       alert('Please select a valid image file');
//     }
//   };

//   const removeImage = () => {
//     setUploadedImage(null);
//     setShowPesticide(false);
//     setIsAnalyzing(false);
//     if (fileInputRef.current) {
//       fileInputRef.current.value = '';
//     }
//   };

//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center">
//       {/* Hero Background */}
//       <div 
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${heroFarmer})` }}
//       >
//         <div className="absolute inset-0 bg-black/40" />
//       </div>

//       {/* Hero Content */}
//       <div className="relative z-10 container px-4 py-20">
//         <div className="text-center mb-16">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
//             Your Harvest, Our Promise
//           </h1>
//           <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
//             Empowering farmers with smart solutions for crop recommendation, pest management, and market insights.
//           </p>
//         </div>

//         {/* Feature Cards */}
//         <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
//           {/* Crop Recommendation */}
//           {/* <Dialog>
//             <DialogTrigger asChild>
//               <Card className="cursor-pointer hover:shadow-elevated transition-all duration-300 bg-white/95 backdrop-blur border-0">
//                 <CardHeader className="text-center pb-4">
//                   <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
//                     <Leaf className="h-8 w-8 text-white" />
//                   </div>
//                   <CardTitle className="text-xl text-agriculture-green">Crop Recommendation</CardTitle>
//                   <CardDescription>
//                     Get personalized crop suggestions based on your location and soil conditions.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="text-center">
//                   <Button className="w-full bg-gradient-hero border-0 hover:shadow-lg">
//                     Get Recommendations
//                   </Button>
//                 </CardContent>
//               </Card>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-2">
//                   <Leaf className="h-5 w-5 text-agriculture-green" />
//                   Crop Recommendation
//                 </DialogTitle>
//                 <DialogDescription>
//                   Select your location to get crop recommendations suitable for your region.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="location">Select Location</Label>
//                   <Select onValueChange={handleLocationSelect}>
//                     <SelectTrigger>
//                       <MapPin className="h-4 w-4 mr-2" />
//                       <SelectValue placeholder="Choose your state" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
//                       <SelectItem value="punjab">Punjab</SelectItem>
//                       <SelectItem value="maharashtra">Maharashtra</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
                
//                 {showRecommendation && selectedLocation && (
//                   <div className="mt-6 p-4 bg-agriculture-light rounded-lg">
//                     <h4 className="font-semibold text-agriculture-dark mb-3">Recommended Crops:</h4>
//                     <div className="grid grid-cols-2 gap-2">
//                       {locationCrops[selectedLocation as keyof typeof locationCrops]?.map((crop, index) => (
//                         <div key={index} className="bg-white p-2 rounded text-center text-sm font-medium text-agriculture-green">
//                           {crop}
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </DialogContent>
//           </Dialog> */}

//           {/* Pesticide Recommendation */}
//           <Dialog>
//             <DialogTrigger asChild>
//               <Card className="cursor-pointer hover:shadow-elevated transition-all duration-300 bg-white/95 backdrop-blur border-0">
//                 <CardHeader className="text-center pb-4">
//                   <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
//                     <Bug className="h-8 w-8 text-white" />
//                   </div>
//                   <CardTitle className="text-xl text-agriculture-green">Pesticide Recommendation</CardTitle>
//                   <CardDescription>
//                     Upload crop images to identify pests and get treatment recommendations.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="text-center">
//                   <Button className="w-full bg-gradient-hero border-0 hover:shadow-lg">
//                     Identify Pests
//                   </Button>
//                 </CardContent>
//               </Card>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-md">
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-2">
//                   <Bug className="h-5 w-5 text-agriculture-green" />
//                   Pesticide Recommendation
//                 </DialogTitle>
//                 <DialogDescription>
//                   Upload an image of your crop to identify pests and get treatment recommendations.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="image-upload">Upload Crop Image</Label>
                  
//                   {!uploadedImage ? (
//                     <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-agriculture-green transition-colors">
//                       <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//                       <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
//                       <p className="text-xs text-muted-foreground mb-4">PNG, JPG, JPEG up to 10MB</p>
//                       <Button 
//                         variant="outline" 
//                         size="sm"
//                         onClick={handleImageUpload}
//                         className="border-agriculture-green text-agriculture-green hover:bg-agriculture-light"
//                       >
//                         <Image className="h-4 w-4 mr-2" />
//                         Choose File
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="border border-border rounded-lg p-4">
//                       <div className="flex items-start gap-3">
//                         <div className="flex-shrink-0">
//                           <img 
//                             src={uploadedImage.preview} 
//                             alt="Uploaded crop"
//                             className="w-16 h-16 object-cover rounded-lg"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm font-medium text-foreground truncate">
//                             {uploadedImage.name}
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             {formatFileSize(uploadedImage.size)}
//                           </p>
//                           {isAnalyzing && (
//                             <div className="mt-2">
//                               <div className="flex items-center gap-2">
//                                 <div className="w-4 h-4 border-2 border-agriculture-green border-t-transparent rounded-full animate-spin"></div>
//                                 <span className="text-sm text-agriculture-green">Analyzing image...</span>
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                         <button 
//                           onClick={removeImage}
//                           className="flex-shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
                  
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     id="image-upload"
//                   />
//                 </div>
                
//                 {showPesticide && uploadedImage && !isAnalyzing && (
//                   <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
//                     <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
//                       <Bug className="h-4 w-4" />
//                       Detection Result:
//                     </h4>
//                     <div className="space-y-2">
//                       <p className="text-sm"><strong>Detected:</strong> Rice Leaf Blight</p>
//                       <p className="text-sm"><strong>Confidence:</strong> 94.2%</p>
//                       <p className="text-sm"><strong>Recommended Treatment:</strong> Copper Oxychloride 50% WP</p>
//                       <p className="text-sm"><strong>Dosage:</strong> 2-3 gm per liter of water</p>
//                       <p className="text-sm"><strong>Application:</strong> Spray during early morning or evening</p>
//                       <p className="text-sm"><strong>Frequency:</strong> Repeat after 15 days if needed</p>
//                     </div>
//                     <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
//                       <strong>⚠️ Safety Note:</strong> Always read the pesticide label and follow safety guidelines. Wear protective equipment during application.
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </DialogContent>
//           </Dialog>

          

//           {/* Marketplace */}
//           {/* <Dialog>
//             <DialogTrigger asChild>
//               <Card className="cursor-pointer hover:shadow-elevated transition-all duration-300 bg-white/95 backdrop-blur border-0">
//                 <CardHeader className="text-center pb-4">
//                   <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
//                     <ShoppingCart className="h-8 w-8 text-white" />
//                   </div>
//                   <CardTitle className="text-xl text-agriculture-green">Marketplace</CardTitle>
//                   <CardDescription>
//                     Check current market prices and trends for various crops across different regions.
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="text-center">
//                   <Button className="w-full bg-gradient-hero border-0 hover:shadow-lg">
//                     View Prices
//                   </Button>
//                 </CardContent>
//               </Card>
//             </DialogTrigger>
//             <DialogContent className="sm:max-w-2xl">
//               <DialogHeader>
//                 <DialogTitle className="flex items-center gap-2">
//                   <ShoppingCart className="h-5 w-5 text-agriculture-green" />
//                   Current Market Prices
//                 </DialogTitle>
//                 <DialogDescription>
//                   Live market prices for major crops. Prices are updated daily.
//                 </DialogDescription>
//               </DialogHeader>
//               <div className="space-y-4">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead>Crop</TableHead>
//                       <TableHead>Current Price</TableHead>
//                       <TableHead>Change</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {marketPrices.map((item, index) => (
//                       <TableRow key={index}>
//                         <TableCell className="font-medium">{item.crop}</TableCell>
//                         <TableCell>{item.price}{item.unit}</TableCell>
//                         <TableCell className={`font-medium ${
//                           item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
//                         }`}>
//                           {item.change}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//                 <p className="text-xs text-muted-foreground text-center">
//                   Prices are indicative and may vary by location and market conditions.
//                 </p>
//               </div>
//             </DialogContent>
//           </Dialog> */}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection; 

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Leaf, Bug, ShoppingCart, MapPin, Upload, Image, X } from "lucide-react";
import heroFarmer from "@/assets/hero-farmer.jpg";

const HeroSection = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [uploadedImage, setUploadedImage] = useState<{
    file: File;
    preview: string;
    name: string;
    size: number;
  } | null>(null);
  const [showRecommendation, setShowRecommendation] = useState(false);
  const [showPesticide, setShowPesticide] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const locationCrops = {
    "uttar-pradesh": ["Wheat", "Rice", "Sugarcane", "Maize"],
    "punjab": ["Maize", "Cotton", "Wheat", "Rice"],
    "maharashtra": ["Sugarcane", "Soybean", "Cotton", "Onion"]
  };

  const marketPrices = [
    { crop: "Wheat", price: "₹2,200", unit: "/quintal", change: "+2.5%" },
    { crop: "Rice", price: "₹2,800", unit: "/quintal", change: "+1.8%" },
    { crop: "Cotton", price: "₹6,000", unit: "/quintal", change: "-0.5%" },
    { crop: "Sugarcane", price: "₹350", unit: "/quintal", change: "+3.2%" },
    { crop: "Soybean", price: "₹4,500", unit: "/quintal", change: "+1.2%" }
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowRecommendation(true);
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage({
          file: file,
          preview: e.target?.result as string,
          name: file.name,
          size: file.size
        });
        
        // Simulate analysis
        setIsAnalyzing(true);
        setTimeout(() => {
          setIsAnalyzing(false);
          setShowPesticide(true);
        }, 2000);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file');
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setShowPesticide(false);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroFarmer})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Your Harvest, Our Promise
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Empowering farmers with smart solutions for crop recommendation, pest management, and market insights.
          </p>
        </div>

        {/* Feature Cards - Centered Single Card */}
        <div className="flex justify-center max-w-6xl mx-auto">
          {/* Pesticide Recommendation */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer hover:shadow-elevated transition-all duration-300 bg-white/95 backdrop-blur border-0 w-full max-w-md">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mb-4">
                    <Bug className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-agriculture-green">Crop Disease Analyser</CardTitle>
                  <CardDescription>
                    Upload crop images to identify Disease and get treatment recommendations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-hero border-0 hover:shadow-lg">
                    Identify Pests
                  </Button>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Bug className="h-5 w-5 text-agriculture-green" />
                  Pesticide Recommendation
                </DialogTitle>
                <DialogDescription>
                  Upload an image of your crop to identify diseases and get treatment recommendations.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="image-upload">Upload Crop Image</Label>
                  
                  {!uploadedImage ? (
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-agriculture-green transition-colors">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground mb-4">PNG, JPG, JPEG up to 10MB</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleImageUpload}
                        className="border-agriculture-green text-agriculture-green hover:bg-agriculture-light"
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
                            alt="Uploaded crop"
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
                                <div className="w-4 h-4 border-2 border-agriculture-green border-t-transparent rounded-full animate-spin"></div>
                                <span className="text-sm text-agriculture-green">Analyzing image...</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <button 
                          onClick={removeImage}
                          className="flex-shrink-0 p-1 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="image-upload"
                  />
                </div>
                
                {showPesticide && uploadedImage && !isAnalyzing && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <Bug className="h-4 w-4" />
                      Detection Result:
                    </h4>
                    <div className="space-y-2">
                      <p className="text-sm"><strong>Detected:</strong> Rice Leaf Blight</p>
                      <p className="text-sm"><strong>Confidence:</strong> 94.2%</p>
                      <p className="text-sm"><strong>Recommended Treatment:</strong> Copper Oxychloride 50% WP</p>
                      <p className="text-sm"><strong>Dosage:</strong> 2-3 gm per liter of water</p>
                      <p className="text-sm"><strong>Application:</strong> Spray during early morning or evening</p>
                      <p className="text-sm"><strong>Frequency:</strong> Repeat after 15 days if needed</p>
                    </div>
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                      <strong>⚠️ Safety Note:</strong> Always read the pesticide label and follow safety guidelines. Wear protective equipment during application.
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;