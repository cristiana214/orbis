import { Form } from '@/components/ui/Form';
import { context } from '@/constants';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/router';
import { useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';

interface PostInput {
  content: string;
}

export const AddComment = ({
  callback,
  postId,
}: {
  callback: (post: any) => void;
  postId: string;
}) => {
  const form = useForm<PostInput>({
    defaultValues: {
      content: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const user = useAppStore((state) => state.user);
  const id = useId();

  const orbis = useOrbis();

  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    setLoading(true);

    const res = await orbis.createPost({
      body: data.content,
      reply_to: postId,
      master: postId,
      context,
    });

    setLoading(true);

    if (res.status === 300) {
      toast.error('Error creating post');
      return;
    }

    setLoading(false);

    if (res.status === 200) {
      callback({
        creator: user.did,
        creator_details: {
          did: user.did,
          profile: user.profile,
          metadata: user.metadata,
        },
        temporary_id: id,
        stream_id: 'none',
        content: {
          body: data.content,
          reply_to: postId,
          master: postId,
          context,
        },
        master: postId,
      });

      form.reset({
        content: '',
      });
    }
  };

  return (
    <div className="mb-5 px-4 md:px-0">
      <Form form={form} onSubmit={onSubmit}>
        <Textarea
          label="Comment"
          placeholder="Add to the discussion"
          className="s-input !rounded-3xl"
          {...form.register('content')}
        />
        <Button
          loading={loading}
          primary
          type="submit"
          disabled={!form.formState.isDirty}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};
