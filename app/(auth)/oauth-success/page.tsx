import { handleOauthCallback } from "@/services";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function OAuthSuccessPage () {
  const router = useRouter();

  useEffect(() => {
    handleOauthCallback()
      .then(() => {
        router.replace("/dashboard");
      })
      .catch((err) => { 
        router.replace("/login?error=oauth_failed");
        console.log("OAuth failed", err);
      });
  }, [router]);
  return (
    <div>
      <h1>Logging You In....</h1>
    </div>
  );
};


