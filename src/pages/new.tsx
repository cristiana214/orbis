import { Login } from '@/components/Login';
import { Block } from '@/components/ui/Block';
import { Button } from '@/components/ui/Button';
import { Form } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { Markdown } from '@/components/ui/Markdown';
import { MarkdownEditor } from '@/components/ui/MarkdownEditor';
import { context } from '@/constants';
import { useOrbis } from '@/orbis/useOrbis';
import { useAppStore } from '@/store/useAppStore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Layout } from '../components/Layout';

interface PostInput {
  title: string;
  content: string;
}

const New = () => {
  const form = useForm<PostInput>({
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const { push } = useRouter();
  const user = useAppStore((state) => state.user);
  const [loading, setLoading] = useState<boolean>(false);

  console.log(user, 'hello');

  const orbis = useOrbis();

  const source = form.watch('content');
  const title = form.watch('title');

  const [preview, setPreview] = useState<boolean>(false);

  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    setLoading(true);

    const res = await orbis.createPost({
      title: data.title,
      body: data.content,
      context,
    });

    setLoading(false);

    if (res.status === 300) {
      toast.error('Error creating post');
      return;
    }

    if (res.status === 200) {
      push(`/${user?.metadata.address}/${res.doc}`);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="lg:flex">
          <Login />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="lg:flex">
        <div className="relative w-full pr-0 lg:w-3/4 lg:pr-5">
          <div className="mb-5 px-4 md:px-0">
            {!preview ? (
              <>
                <h1 className="mb-4">Create a post</h1>
                <Form form={form} onSubmit={onSubmit}>
                  <Input label="Title" {...form.register('title')} />
                  <MarkdownEditor
                    label="Content"
                    {...form.register('content')}
                    count={source.length}
                  />
                </Form>
              </>
            ) : (
              <>
                <h1 className="w-full break-all mb-4">{title || 'Untitled'}</h1>
                <div className="min-h-[385px]">
                  <Markdown source={source} />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full lg:w-4/12 lg:min-w-[321px]">
          <Block className="lg:fixed lg:w-[320px]">
            <Button
              onClick={() => setPreview(!preview)}
              className="mb-2 block w-full"
            >
              {preview ? 'Edit' : 'Preview'}
            </Button>
            <Button
              className="mb-2 block w-full"
              primary
              type="submit"
              onClick={form.handleSubmit(onSubmit)}
              loading={loading}
            >
              Publish
            </Button>
          </Block>
        </div>
      </div>
    </Layout>
  );
};

export default New;
