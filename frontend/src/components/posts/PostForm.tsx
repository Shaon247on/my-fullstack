"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { postSchema, PostFormValues } from "@/lib/validations/post.validation";
import { postApi } from "@/lib/api/post.api";
import { Post } from "@/types/post.type";

type ErrorResponse = {
  message?: string;
};

type PostFormProps = {
  post?: Post;
  mode?: "create" | "edit";
};

export function PostForm({ post, mode = "create" }: PostFormProps) {
  const router = useRouter();

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      isPublished: post?.isPublished ?? true,
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: PostFormValues) => {
    try {
      if (mode === "edit" && post?._id) {
        await postApi.updatePost(values, post._id);
        toast.success("Post updated successfully");
      } else {
        await postApi.createPost(values);
        toast.success("Post created successfully");
      }

      router.push("/posts");
      router.refresh();
    } catch (error) {
      const err = error as AxiosError<ErrorResponse>;
      toast.error(err.response?.data?.message || "Post operation failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full"
    >
      <Card>
        <CardHeader>
          <CardTitle>{mode === "edit" ? "Edit Post" : "Create Post"}</CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="space-y-6"
          >
            <FieldGroup>
              <Controller
                name="title"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Title</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Enter post title"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="content"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Content</FieldLabel>

                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Write your post content"
                      rows={8}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="isPublished"
                control={form.control}
                render={({ field }) => (
                  <Field orientation="horizontal">
                    <div className="space-y-1">
                      <FieldLabel htmlFor={field.name}>Publish post</FieldLabel>
                      <FieldDescription>
                        Turn this off if you want to keep the post as draft.
                      </FieldDescription>
                    </div>

                    <Switch
                      id={field.name}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </Field>
                )}
              />
            </FieldGroup>

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              {form.formState.isSubmitting
                ? mode === "edit"
                  ? "Updating..."
                  : "Creating..."
                : mode === "edit"
                  ? "Update Post"
                  : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
