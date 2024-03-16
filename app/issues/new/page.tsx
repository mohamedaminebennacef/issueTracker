'use client'
import { z } from 'zod';
import axios from 'axios'
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation';

import Spinner from '@/app/components/Spinner';
import ErrorMessage from '@/app/components/ErrorMessage';
import { createIssueSchema } from '@/app/validationSchema';

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { zodResolver } from '@hookform/resolvers/zod'

import { Callout } from '@radix-ui/themes';
import { TextField, Button } from '@radix-ui/themes'
import { Text } from '@radix-ui/themes';

type IssueForm = z.infer<typeof createIssueSchema>;



const NewIssuePage = () => {
    const router = useRouter();
    const [error, setErr] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    });
    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitting(true)
            await axios.post('/api/issues', data);
            router.push('/issues');
        } catch (error) {
            setSubmitting(false)
            setErr('Please fill out the Title and Description field')
        }
    })
    return (
        <div className='max-w-xl'>
            {error && (
                <Callout.Root color="red" className='mb-5'>
                    <Callout.Text> {error}</Callout.Text>
                </Callout.Root>)
            }
            <form className='space-y-3' onSubmit={onSubmit}>
                <TextField.Root>
                    <TextField.Input placeholder="Title" {...register("title")} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting}>Submit New Issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}
export default NewIssuePage