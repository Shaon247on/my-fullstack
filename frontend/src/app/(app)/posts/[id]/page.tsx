import { PostDetails } from "@/components/posts/PostDetails";

type PostDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PostDetailsPage({ params }: PostDetailsPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-muted/40 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <PostDetails id={id} />
      </div>
    </main>
  );
}