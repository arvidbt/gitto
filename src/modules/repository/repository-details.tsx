"use client";

import * as React from "react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { type RepositoryLanguage } from "@/server/api/routers/db";
import { githubLanguageColorPalette } from "@/lib/github-colors";
import { Progress } from "@/components/ui/progress-multiple";

type RepositoryDetailsProps = {
  languages: RepositoryLanguage;
  user: {
    name: string;
    username: string | undefined;
    image: string | undefined;
  };
};

export function RepositoryDetails({ languages, user }: RepositoryDetailsProps) {
  const total = Object.values(languages).reduce((sum, value) => sum + value, 0);
  const normalizedList = Object.entries(languages).map(([language, value]) => {
    return {
      language: language,
      value: (value / total) * 100,
      color: githubLanguageColorPalette[language]?.color ?? "#000000",
    };
  });

  return (
    <div className="col-span-1 flex max-h-[83vh] min-h-[83vh] flex-1 flex-col gap-6 ">
      <Card className="flex flex-col border-2 border-github-foreground bg-github-secondary">
        <CardHeader>
          <CardTitle className="flex flex-row items-center gap-4 text-github-white">
            <Avatar>
              <AvatarImage src={user.image} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 flex-col">
              <Link
                href={`https://github.com/${user.username}`}
                className="text-github-sky hover:underline"
              >
                {user.username}
              </Link>
              <h3 className="text-base text-github-accent">{user.name}</h3>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      <Card className="flex flex-col border-2 border-github-foreground bg-github-primary pb-6">
        <CardHeader>
          <CardTitle className="text-github-white">Languages</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 pb-2">
          <Progress segments={normalizedList} />
          <div className="grid grid-cols-1 gap-2 py-4">
            {normalizedList.map((language, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-xl "
                  style={{ backgroundColor: language.color }}
                />
                <p className="text-sm font-bold text-github-white">
                  {language.language}
                </p>
                <p className="text-sm font-semibold text-github-accent">
                  {language.value.toFixed(2)}
                  {"%"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
