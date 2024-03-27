"use client";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, Flex, Select, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setErr] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);
  const {register,control,handleSubmit,formState: { errors },} = useForm<IssueFormData>({resolver: zodResolver(issueSchema)});
  
  const onSubmit = handleSubmit(async (data) => {
    alert("hey")
    console.log(issue?.title)
    try {
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/"+issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setErr("Please fill out the Title and Description field");
    }
});

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text> {error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-2" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title}  placeholder="Title" {...register("title")}/>
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name="description" control={control} defaultValue={issue?.description} render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Flex direction="column" gap="2" align="start">
          <Select.Root  size="2" defaultValue="OPEN">
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Label>Status</Select.Label>
                <Select.Item value="OPEN">Open</Select.Item>
                <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                <Select.Item value="CLOSED">Closed</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
        </Flex>
      </form>
    </div>
  );
};
export default IssueForm;
