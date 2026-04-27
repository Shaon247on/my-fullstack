"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { AxiosError } from "axios";

import { postApi } from "@/lib/api/post.api";
import { Post } from "@/types/post.type";
import { useAuth } from "@/providers/AuthProvider";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type ErrorResponse = {
  message?: string;
};

export function PostList() {
  const { user, isAuthenticated } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const res = await postApi.getAllPosts();
      setPosts(res.data);
    } catch {
      toast.error("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await postApi.deletePost(id);

      setPosts((prev) => prev.filter((post) => post._id !== id));

      toast.success("Post deleted successfully");
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data?.message || "Failed to delete post");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Loading posts...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            Browse latest published posts.
          </p>
        </div>

        {isAuthenticated && (
          <Button asChild>
            <Link href="/posts/create">
              <Plus className="mr-2 size-4" />
              Create Post
            </Link>
          </Button>
        )}
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No posts found.
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5">
          {posts.map((post, index) => {
            const author =
              typeof post.author === "object" ? post.author : null;

            const isOwner =
              typeof post.author === "object" &&
              user?._id === post.author._id;

            return (
              <Card key={index}>
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <CardTitle>
                        <Link
                          href={`/posts/${post._id}`}
                          className="hover:underline"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>

                      <p className="mt-1 text-sm text-muted-foreground">
                        By {author?.name || "Unknown Author"}
                      </p>
                    </div>

                    <Badge variant={post.isPublished ? "default" : "secondary"}>
                      {post.isPublished ? "Published" : "Draft"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="line-clamp-3 text-muted-foreground">
                    {post.content}
                  </p>

                  <div className="mt-5 flex items-center gap-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/posts/${post._id}`}>View Details</Link>
                    </Button>

                    {isOwner && (
                      <>
                        <Button asChild variant="secondary" size="sm">
                          <Link href={`/posts/${post._id}/edit`}>Edit</Link>
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(post._id)}
                        >
                          <Trash2 className="mr-2 size-4" />
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}