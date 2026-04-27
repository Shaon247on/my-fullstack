"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/providers/AuthProvider";
import { postApi } from "@/lib/api/post.api";
import { Post } from "@/types/post.type";
import { PostForm } from "@/components/posts/PostForm";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const { user, isLoading: authLoading, isAuthenticated } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    try {
      setIsLoading(true);

      const res = await postApi.getSinglePost(params.id);

      const author = typeof res.data.author === "object" ? res.data.author : null;

      if (author?._id !== user?._id) {
        toast.error("You are not authorized to edit this post");
        router.replace("/posts");
        return;
      }

      setPost(res.data);
    } catch {
      toast.error("Failed to fetch post");
      router.replace("/posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!authLoading && isAuthenticated && user) {
      fetchPost();
    }
  }, [authLoading, isAuthenticated, user, params.id]);

  if (authLoading || isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading post...</p>
      </main>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <PostForm mode="edit" post={post} />
      </div>
    </main>
  );
}