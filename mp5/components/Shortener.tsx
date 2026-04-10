"use client";

import { Textarea } from "@mui/joy";
import { Button } from "@mui/material";
import { useState } from "react";

import type { ShortenResult } from "@/types";

export default function Shortener({
  createShortUrl,
}: {
  createShortUrl: (url: string, alias: string) => Promise<ShortenResult>;
}) {
  const [url, setUrl] = useState("");
  const [alias, setAlias] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  return (
    <div className="mt-8 flex w-full items-center justify-center px-4">
      <form
        className="w-full max-w-3xl rounded-xl bg-gray-100 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          createShortUrl(url, alias)
            .then((res) => {
              if (res.ok) {
                setMessage("URL shortened successfully");
              } else {
                setMessage(res.error);
              }
            })
            .catch(() => setMessage("Something went wrong"));
        }}
      >
        <Textarea
          name="url"
          required
          sx={{
            padding: "0.5rem",
            height: "40px",
            width: "100%",
            borderRadius: 0,
          }}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter your URL"
        />
        <div className="flex w-full">
          <span className="mt-6 mr-2 h-full flex-1 text-xl whitespace-nowrap">
          https://mp5-iota.vercel.app/
          </span>
          <Textarea
            name="alias"
            required
            sx={{
              padding: "0.5rem",
              height: "40px",
              width: "100%",
              borderRadius: 0,
              marginTop: "1rem",
            }}
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Enter the alias you want to use"
          />
        </div>

        <div className="mt-5 flex w-full flex-col items-center justify-center">
          <Button type="submit" variant="contained" sx={{ width: "80px" }}>
            Shorten
          </Button>
          {message && (
            <p
              className={
                message === "URL shortened successfully"
                  ? "mt-2 text-green-600"
                  : "mt-2 text-red-500"
              }
            >
              {message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
