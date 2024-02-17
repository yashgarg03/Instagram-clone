import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea, useToast } from "../ui";
import FileUploader from "../shared/FileUploader";
import { PostValidation } from "@/lib/validation";
import { Models } from "appwrite";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";
import { useUserContext } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "../shared/Loader";

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};
const PostForm = ({ post, action }: PostFormProps) => {
  const { mutateAsync: createPost, isLoading: isLoadingCreate } =
    useCreatePost();
  
    const { mutateAsync: updatePost, isLoading: isLoadingUpdate } =
    useUpdatePost();
    
  const { user } = useUserContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  // 1. Define your form.
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post?.caption : "",
      file: [],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(",") : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    if(post && action == 'Update'){
      const updatedPost = await updatePost({
        ...values,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl
      })

      if(!updatedPost) {
        return toast({
          title: "Update failed, please try again!",
        });
      }
      return navigate(`/posts/${post?.$id}`);
    }
    const newPost = await createPost({
      ...values,
      userId: user.id,
    });

    if (!newPost) {
      return toast({
        title: "Post creation failed, please try again",
      });
    }

    navigate('/');
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_lable">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scroll" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_lable">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_lable">Add loaction</FormLabel>
              <FormControl>
                <Input className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_lable">
                Add tags (seperated by comma ",")
              </FormLabel>
              <FormControl>
                <Input
                  className="shad-input"
                  placeholder="Art, Celebrations, Mood"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
          <Button type="button" className="shad-button_dark_4">
            cancel
          </Button>
          <Button
            type="submit"
            className="shad-button_primary whitespace-nowrap"
            disabled={isLoadingCreate || isLoadingUpdate}
          >
            {isLoadingCreate || isLoadingUpdate && <Loader/>}
            {action} post
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
