import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/Subpabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      // Supabase automatically picks up the tokens from the URL hash
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("OAuth callback error:", error.message);
        navigate("/auth");
        return;
      }

      if (data.session) {
        // Session established — redirect to home
        navigate("/");
      } else {
        // No session — something went wrong, go back to auth
        navigate("/auth");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-green-700 font-medium text-lg">
          Signing you in...
        </p>
      </div>
    </div>
  );
}
