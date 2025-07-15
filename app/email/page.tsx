"use client";
import React, { useState } from "react";
import Arcade from "@arcadeai/arcadejs";

const client = new Arcade({
  apiKey: process.env.NEXT_PUBLIC_ARCADE_API_KEY,
});

const userId = "carlossan@gmail.com";

export default function Email() {
  const [value, setValue] = useState<string>("");

  const handleClick = async () => {
    try {
      const authResponse = await client.tools.authorize({
        tool_name: "Google.ListEmails",
        user_id: userId,
      });

      // ⬇️ Redirect the user to the consent screen
      // if (authResponse.url) {
      //   window.location.href = authResponse.url;
      //   return; // Wait for redirect
      // }

      // Open OAuth URL in a popup window
      const authWindow = window.open(
        authResponse.url,
        "_blank",
        "width=500,height=600"
      );

      // Wait for user to complete OAuth flow
      await client.auth.waitForCompletion(authResponse);

      // Close the popup after auth completes
      if (authWindow) {
        authWindow.close();
      }
      // Now execute the tool
      const emailsResponse = await client.tools.execute({
        tool_name: "Google.ListEmails",
        user_id: userId,
      });

      const output = emailsResponse.output?.value;
      setValue(
        typeof output === "string" ? output : JSON.stringify(output, null, 2)
      );
    } catch (error) {
      console.error("Auth or execution failed:", error);
      setValue("Error during auth or tool execution.");
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Connect Gmail and Fetch Emails
      </button>
      <pre className="mt-4 whitespace-pre-wrap">{value}</pre>
    </div>
  );
}
