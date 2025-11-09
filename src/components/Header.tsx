import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, Sprout, Globe } from "lucide-react";
import { supabase } from "../lib/Subpabase"; // ✅ import Supabase client
import { User } from "@supabase/supabase-js";

const Header = () => { 
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const navigation = [
    { name: "Home", href: "#home" }, 
    { name: "Education", href: "#education" },
  ];

  // ✅ Check Supabase session on mount + listen for auth changes
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user ?? null);
    };

    checkUser();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  // ✅ Logout function (optional)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-hero">
            <Sprout className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-primary">KrishiMitra</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {!user ? (
            // ✅ Show Get Started only if user not logged in
            <a 
              href="/auth" 
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gradient-hero rounded-lg shadow hover:shadow-md transition-all border-0"
            >
              Get Started
            </a>
          ) : (
            // ✅ Show Logout / Dashboard if user logged in
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
              {/* <a 
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-hero rounded-lg shadow hover:shadow-md transition-all border-0"
              >
                Dashboard
              </a> */}
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px]">
            <div className="flex flex-col space-y-6 mt-6">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-hero">
                  <Sprout className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-primary">KrishiMitra</span>
              </div>
              
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>

              <div className="flex flex-col space-y-3 pt-4 border-t">
                <Select defaultValue="en">
                  <SelectTrigger>
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                </Select>

                {!user ? (
                  <>
                    {/* ✅ Show login/signup if not logged in */}
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <a href="/auth">Login</a>
                    </Button>
                    <Button size="sm" className="w-full bg-gradient-hero border-0" asChild>
                      <a href="/auth">Signup</a>
                    </Button>
                  </>
                ) : (
                  <>
                    {/* ✅ Show Logout if logged in */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    {/* <Button size="sm" className="w-full bg-gradient-hero border-0" asChild>
                      <a href="/dashboard">Dashboard</a>
                    </Button> */}
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
