"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { PostForm } from "@/components/posts/PostForm";
import { useAuth } from "@/providers/AuthProvider";

export default function CreatePostPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Checking authentication...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <PostForm />
      </div>
    </main>
  );
}