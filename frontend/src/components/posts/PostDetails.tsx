"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { postApi } from "@/lib/api/post.api";
import { Post } from "@/types/post.type";
import { useAuth } from "@/providers/AuthProvider";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ErrorResponse = {
  message?: string;
};

export function PostDetails({ id }: { id: string }) {
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPost = async () => {
    try {
      setIsLoading(true);
      const res = await postApi.getSinglePost(id);
      setPost(res.data);
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data?.message || "Failed to fetch post");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-muted-foreground">
          Post not found.
        </CardContent>
      </Card>
    );
  }

  const author = typeof post.author === "object" ? post.author : null;
  const isOwner = author?._id === user?._id;

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="text-3xl">{post.title}</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              By {author?.name || "Unknown Author"}
            </p>
          </div>

          <Badge variant={post.isPublished ? "default" : "secondary"}>
            {post.isPublished ? "Published" : "Draft"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="whitespace-pre-line leading-7 text-muted-foreground">
          {post.content}
        </p>

        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/posts">Back to Posts</Link>
          </Button>

          {isOwner && (
            <Button asChild>
              <Link href={`/posts/${post._id}/edit`}>Edit Post</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
