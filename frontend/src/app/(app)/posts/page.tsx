import { PostList } from "@/components/posts/PostList";

export const metadata = {
  title: "Posts",
};

export default function PostsPage() {
  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <PostList />
      </div>
    </main>
  );
}